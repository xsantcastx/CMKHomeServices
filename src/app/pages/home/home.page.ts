import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HomeHeroComponent } from '../../features/home/home-hero/home-hero.component';
import { HomeReviewsComponent } from '../../features/home/home-reviews/home-reviews.component';
import { MetaService } from '../../services/meta.service';
import { BrandConfigService } from '../../core/services/brand-config.service';
import { ServicePackagesService } from '../../services/service-packages.service';
import type { ServicePackage } from '@config';

interface HighlightCard {
  title: string;
  copy: string;
  icon: string;
}

interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, HomeHeroComponent, HomeReviewsComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePageComponent implements OnInit {
  private metaService = inject(MetaService);
  private brandConfig = inject(BrandConfigService);
  private servicePackagesService = inject(ServicePackagesService);
  private translate = inject(TranslateService);

  get featuredServices(): ServicePackage[] {
    const services = ['premier_weekly', 'signature_biweekly', 'deep_restore'];
    const prices = [420, 320, 980]; // Keep prices from catalog
    const skus = ['CMK-PREM-WEEKLY', 'CMK-SIGNATURE-BIWEEKLY', 'CMK-DEEP-RESTORE'];
    
    return services.map((key, index) => ({
      sku: skus[index],
      name: this.translate.instant(`home.featured_services.${key}.name`),
      description: this.translate.instant(`home.featured_services.${key}.description`),
      price: prices[index],
      currency: 'USD',
      badge: this.translate.instant(`home.featured_services.${key}.badge`),
      category: key,
      attributes: {
        'frequency': this.translate.instant(`home.featured_services.${key}.frequency`),
        'duration': this.translate.instant(`home.featured_services.${key}.duration`),
        'team': this.translate.instant(`home.featured_services.${key}.team`)
      }
    } as ServicePackage));
  }

  get highlights(): HighlightCard[] {
    return [
      {
        title: this.translate.instant('home.why_choose.hashrate.title'),
        copy: this.translate.instant('home.why_choose.hashrate.description'),
        icon: 'users'
      },
      {
        title: this.translate.instant('home.why_choose.efficiency.title'),
        copy: this.translate.instant('home.why_choose.efficiency.description'),
        icon: 'leaf'
      },
      {
        title: this.translate.instant('home.why_choose.roi.title'),
        copy: this.translate.instant('home.why_choose.roi.description'),
        icon: 'calendar'
      }
    ];
  }

  get membershipPerks(): HighlightCard[] {
    return [
      {
        title: this.translate.instant('home.features.enterprise.title'),
        copy: this.translate.instant('home.features.enterprise.description'),
        icon: 'bed'
      },
      {
        title: this.translate.instant('home.features.efficiency.title'),
        copy: this.translate.instant('home.features.efficiency.description'),
        icon: 'sparkles'
      },
      {
        title: this.translate.instant('home.features.roi.title'),
        copy: this.translate.instant('home.features.roi.description'),
        icon: 'clipboard'
      }
    ];
  }

  get testimonials(): Testimonial[] {
    const items = this.translate.instant('home.testimonials.items');
    if (Array.isArray(items)) {
      return items;
    }
    // Fallback if translations aren't loaded yet
    return [];
  }

  get membershipBenefits(): string[] {
    const benefits = this.translate.instant('home.membership.benefits');
    if (Array.isArray(benefits)) {
      return benefits;
    }
    return [];
  }

  get serviceAreas(): string[] {
    const areas = this.translate.instant('home.contact_section.areas');
    if (Array.isArray(areas)) {
      return areas;
    }
    return [];
  }

  ngOnInit(): void {
    this.metaService.setPageMeta({
      title: this.brandConfig.site.seo?.defaultTitle,
      description: this.brandConfig.site.hero?.subtitle
    });
  }
}

