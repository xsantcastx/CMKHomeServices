import { Component, OnDestroy, OnInit, PLATFORM_ID, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SettingsService, HeroImage } from '../../../services/settings.service';
import { BrandConfigService } from '../../../core/services/brand-config.service';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-hero.html',
  styleUrls: ['./home-hero.scss']
})
export class HomeHeroComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private settingsService = inject(SettingsService);
  private cdr = inject(ChangeDetectorRef);
  private brandConfig = inject(BrandConfigService);

  heroImages: HeroImage[] = [];
  currentImageIndex = 0;
  private interval: any;

  readonly heroContent = this.brandConfig.site.hero;
  readonly brandName = this.brandConfig.siteName;
  readonly brandLogo = this.brandConfig.site.brand.logo;

  async ngOnInit(): Promise<void> {
    await this.loadHeroImages();

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.startImageRotation(), 0);
    }
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  async loadHeroImages(): Promise<void> {
    try {
      await this.settingsService.getSettings(true);
      this.heroImages = this.settingsService.getHeroImages();
    } catch (error) {
      console.error('Error loading hero images:', error);
      this.heroImages = [];
    }
  }

  setCurrentImage(index: number): void {
    this.currentImageIndex = index;
    this.cdr.detectChanges();

    if (this.interval) {
      clearInterval(this.interval);
      this.startImageRotation();
    }
  }

  private startImageRotation(): void {
    if (!this.heroImages.length) {
      return;
    }

    this.interval = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.heroImages.length;
      this.cdr.detectChanges();
    }, 6000);
  }
}
