import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Firestore, collection, query, where, getDocs, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { Media } from '../../models/media';
import { Tag } from '../../models/catalog';
import { TagService } from '../../services/tag.service';
import { LoadingComponentBase } from '../../core/classes/loading-component.base';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-galeria-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './galeria.page.html',
  styleUrl: './galeria.page.scss'
})
export class GaleriaPageComponent extends LoadingComponentBase implements OnInit, OnDestroy {
  categoriaActiva = 'todos';
  
  // Instagram-style properties
  allImages: Media[] = [];
  filteredImages: Media[] = [];
  displayedImages: Media[] = [];
  imagesPerPage = 15;
  currentPage = 0;
  hasMoreImages = true;
  isLoadingMore = false;
  
  // Scroll optimization
  private scrollTimeout: any;
  private lastScrollTime = 0;
  private scrollThrottle = 150; // ms
  
  // Lightbox for single image
  selectedImage: Media | null = null;
  selectedImageIndex = 0;
  
  // Hero carousel properties
  heroSlides: Media[] = [];
  currentSlideIndex = 0;
  private carouselInterval: any;
  
  availableTags: Tag[] = [];
  
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private tagService = inject(TagService);
  private metaService = inject(MetaService);

  constructor(
    private firestore: Firestore
  ) {
    super();
  }

  ngOnInit() {
    this.metaService.setPageMeta({
      title: 'GALLERY.TITLE',
      description: 'GALLERY.DESCRIPTION'
    });

    if (this.isBrowser) {
      this.loadTagsAndGallery();
    } else {
      this.isLoading = false;
    }
  }

  private async loadTagsAndGallery(): Promise<void> {
    try {
      const tags = await firstValueFrom(this.tagService.getActiveTags());
      this.availableTags = tags;
      console.log('[Gallery] Tags loaded:', tags.length);
    } catch (error) {
      console.error('[Gallery] Error loading tags:', error);
      this.availableTags = [];
    } finally {
      await this.loadGaleriaFromFirebase();
    }
  }

  private async loadGaleriaFromFirebase() {
    await this.withLoading(async () => {
      const mediaQuery = query(
        collection(this.firestore, 'media'),
        where('relatedEntityType', '==', 'gallery')
      );
      
      const snapshot = await getDocs(mediaQuery);
      const mediaItems: Media[] = snapshot.docs
        .map((doc: QueryDocumentSnapshot) => ({
          id: doc.id,
          ...doc.data() as Omit<Media, 'id'>
        }))
        .sort((a, b) => {
          const dateA = a.uploadedAt instanceof Date ? a.uploadedAt : (a.uploadedAt as any).toDate();
          const dateB = b.uploadedAt instanceof Date ? b.uploadedAt : (b.uploadedAt as any).toDate();
          return dateB.getTime() - dateA.getTime();
        });
      
      console.log('[Gallery] Loaded from Firestore:', mediaItems.length, 'images');
      
      if (mediaItems.length > 0) {
        this.setupHeroCarousel(mediaItems);
        this.allImages = mediaItems;
        this.filtrarPorCategoria(this.categoriaActiva);
      } else {
        console.log('[Gallery] No gallery images found in Firestore');
        this.allImages = [];
        this.filteredImages = [];
        this.displayedImages = [];
        this.heroSlides = [];
      }
    });
  }

  private setupHeroCarousel(mediaItems: Media[]): void {
    const slideCount = Math.min(8, Math.max(5, mediaItems.length));
    const shuffled = [...mediaItems].sort(() => 0.5 - Math.random());
    this.heroSlides = shuffled.slice(0, slideCount);
    
    if (this.isBrowser) {
      this.startCarousel();
    }
  }

  private startCarousel(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
    
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  private stopCarousel(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
      this.carouselInterval = null;
    }
  }

  nextSlide(): void {
    if (this.heroSlides.length === 0) return;
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.heroSlides.length;
  }

  prevSlide(): void {
    if (this.heroSlides.length === 0) return;
    this.currentSlideIndex = this.currentSlideIndex === 0 
      ? this.heroSlides.length - 1 
      : this.currentSlideIndex - 1;
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < this.heroSlides.length) {
      this.currentSlideIndex = index;
      this.startCarousel();
    }
  }

  getTag(slug: string): Tag | undefined {
    return this.availableTags.find(t => t.slug === slug);
  }

  getAvailableTags(): Tag[] {
    const tagSlugs = new Set<string>();
    this.allImages.forEach(image => {
      image.tags.forEach(tag => tagSlugs.add(tag));
    });

    return this.availableTags.filter(tag => tagSlugs.has(tag.slug));
  }

  filtrarPorCategoria(tagSlug: string) {
    this.categoriaActiva = tagSlug;
    
    if (tagSlug === 'todos') {
      this.filteredImages = [...this.allImages];
    } else {
      this.filteredImages = this.allImages.filter(image => 
        image.tags.includes(tagSlug)
      );
    }
    
    // Reset pagination
    this.currentPage = 0;
    this.displayedImages = [];
    this.hasMoreImages = true;
    
    // Load first page
    this.loadMoreImages();
    
    // Close lightbox if open
    if (this.selectedImage) {
      this.cerrarModal();
    }
  }

  loadMoreImages() {
    if (!this.hasMoreImages || this.isLoadingMore) return;
    
    this.isLoadingMore = true;
    
    // Use requestAnimationFrame for smoother performance
    requestAnimationFrame(() => {
      const startIndex = this.currentPage * this.imagesPerPage;
      const endIndex = startIndex + this.imagesPerPage;
      const newImages = this.filteredImages.slice(startIndex, endIndex);
      
      this.displayedImages = [...this.displayedImages, ...newImages];
      this.currentPage++;
      
      // Check if there are more images to load
      this.hasMoreImages = endIndex < this.filteredImages.length;
      this.isLoadingMore = false;
      
      console.log('[Gallery] Loaded page', this.currentPage, '- Total displayed:', this.displayedImages.length);
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.isBrowser || !this.hasMoreImages || this.isLoadingMore) return;
    
    // Throttle scroll events
    const now = Date.now();
    if (now - this.lastScrollTime < this.scrollThrottle) return;
    this.lastScrollTime = now;
    
    // Use requestAnimationFrame for smooth performance
    if (this.scrollTimeout) {
      cancelAnimationFrame(this.scrollTimeout);
    }
    
    this.scrollTimeout = requestAnimationFrame(() => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 800;
      
      if (scrollPosition >= threshold) {
        this.loadMoreImages();
      }
    });
  }

  getImageCountByTag(tagSlug: string): number {
    if (tagSlug === 'todos') {
      return this.allImages.length;
    }
    return this.allImages.filter(image => image.tags.includes(tagSlug)).length;
  }

  abrirImagen(image: Media, index: number) {
    this.selectedImage = image;
    this.selectedImageIndex = index;
    
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
    }
  }

  cerrarModal() {
    this.selectedImage = null;
    this.selectedImageIndex = 0;
    
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }

  anteriorImagen() {
    if (this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
      this.selectedImage = this.displayedImages[this.selectedImageIndex];
    }
  }

  siguienteImagen() {
    if (this.selectedImageIndex < this.displayedImages.length - 1) {
      this.selectedImageIndex++;
      this.selectedImage = this.displayedImages[this.selectedImageIndex];
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (!this.selectedImage) return;
    
    switch (event.key) {
      case 'Escape':
        this.cerrarModal();
        break;
      case 'ArrowLeft':
        this.anteriorImagen();
        break;
      case 'ArrowRight':
        this.siguienteImagen();
        break;
    }
  }

  getTotalImages(): number {
    return this.filteredImages.length;
  }

  bookThisService() {
    this.cerrarModal();
    if (this.isBrowser) {
      const contactSection = document.querySelector('#contact-section, #contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.href = '/contacto';
      }
    }
  }

  ngOnDestroy() {
    this.stopCarousel();
    if (this.scrollTimeout) {
      cancelAnimationFrame(this.scrollTimeout);
    }
  }
}
