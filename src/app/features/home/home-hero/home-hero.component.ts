import { Component, OnDestroy, OnInit, PLATFORM_ID, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SettingsService, HeroImage } from '../../../services/settings.service';
import { BrandConfigService } from '../../../core/services/brand-config.service';

interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  badge: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './home-hero.html',
  styleUrls: ['./home-hero.scss']
})
export class HomeHeroComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private settingsService = inject(SettingsService);
  private cdr = inject(ChangeDetectorRef);
  private brandConfig = inject(BrandConfigService);
  private translate = inject(TranslateService);

  heroImages: HeroImage[] = [];
  currentImageIndex = 0;
  private interval: any;

  readonly brandName = this.brandConfig.siteName;
  readonly brandLogo = this.brandConfig.site.brand.logo;

  get heroContent(): HeroContent {
    return {
      eyebrow: this.translate.instant('home.hero.eyebrow') || '',
      title: this.translate.instant('home.hero.title') || this.brandName,
      subtitle: this.translate.instant('home.hero.subtitle') || '',
      badge: this.translate.instant('home.hero.badge') || '',
      primaryCta: {
        label: this.translate.instant('home.hero.cta_primary') || 'Get Free Quote',
        href: '/contact'
      },
      secondaryCta: {
        label: this.translate.instant('home.hero.cta_secondary') || 'View Our Services',
        href: '/services'
      }
    };
  }

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
