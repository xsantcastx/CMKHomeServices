import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MetaService } from '../../services/meta.service';

interface ServiceArea {
  name: string;
  slug: string;
  description: string;
  neighborhoods?: string[];
}

@Component({
  selector: 'app-service-areas',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './service-areas.page.html',
  styleUrl: './service-areas.page.scss'
})
export class ServiceAreasPage implements OnInit {
  private metaService = inject(MetaService);
  private translate = inject(TranslateService);

  get serviceAreas(): ServiceArea[] {
    return [
      {
        name: this.translate.instant('service_areas.areas.miami.name'),
        slug: 'miami',
        description: this.translate.instant('service_areas.areas.miami.description'),
        neighborhoods: this.translate.instant('service_areas.areas.miami.neighborhoods')
      },
      {
        name: this.translate.instant('service_areas.areas.miami_beach.name'),
        slug: 'miami-beach',
        description: this.translate.instant('service_areas.areas.miami_beach.description'),
        neighborhoods: this.translate.instant('service_areas.areas.miami_beach.neighborhoods')
      },
      {
        name: this.translate.instant('service_areas.areas.coral_gables.name'),
        slug: 'coral-gables',
        description: this.translate.instant('service_areas.areas.coral_gables.description'),
        neighborhoods: this.translate.instant('service_areas.areas.coral_gables.neighborhoods')
      },
      {
        name: this.translate.instant('service_areas.areas.coconut_grove.name'),
        slug: 'coconut-grove',
        description: this.translate.instant('service_areas.areas.coconut_grove.description'),
        neighborhoods: this.translate.instant('service_areas.areas.coconut_grove.neighborhoods')
      },
      {
        name: this.translate.instant('service_areas.areas.aventura.name'),
        slug: 'aventura',
        description: this.translate.instant('service_areas.areas.aventura.description'),
        neighborhoods: this.translate.instant('service_areas.areas.aventura.neighborhoods')
      },
      {
        name: this.translate.instant('service_areas.areas.sunny_isles.name'),
        slug: 'sunny-isles',
        description: this.translate.instant('service_areas.areas.sunny_isles.description'),
        neighborhoods: this.translate.instant('service_areas.areas.sunny_isles.neighborhoods')
      },
      {
        name: this.translate.instant('service_areas.areas.kendall.name'),
        slug: 'kendall',
        description: this.translate.instant('service_areas.areas.kendall.description'),
        neighborhoods: this.translate.instant('service_areas.areas.kendall.neighborhoods')
      },
      {
        name: this.translate.instant('service_areas.areas.doral.name'),
        slug: 'doral',
        description: this.translate.instant('service_areas.areas.doral.description'),
        neighborhoods: this.translate.instant('service_areas.areas.doral.neighborhoods')
      },
      {
        name: this.translate.instant('service_areas.areas.hialeah.name'),
        slug: 'hialeah',
        description: this.translate.instant('service_areas.areas.hialeah.description'),
        neighborhoods: this.translate.instant('service_areas.areas.hialeah.neighborhoods')
      },
      {
        name: this.translate.instant('service_areas.areas.key_biscayne.name'),
        slug: 'key-biscayne',
        description: this.translate.instant('service_areas.areas.key_biscayne.description'),
        neighborhoods: this.translate.instant('service_areas.areas.key_biscayne.neighborhoods')
      },
      {
        name: this.translate.instant('service_areas.areas.homestead.name'),
        slug: 'homestead',
        description: this.translate.instant('service_areas.areas.homestead.description'),
        neighborhoods: this.translate.instant('service_areas.areas.homestead.neighborhoods')
      },
      {
        name: this.translate.instant('service_areas.areas.miami_lakes.name'),
        slug: 'miami-lakes',
        description: this.translate.instant('service_areas.areas.miami_lakes.description'),
        neighborhoods: this.translate.instant('service_areas.areas.miami_lakes.neighborhoods')
      }
    ];
  }

  get services() {
    return [
      { name: this.translate.instant('service_areas.services.residential'), slug: 'residential', icon: '🏠' },
      { name: this.translate.instant('service_areas.services.commercial'), slug: 'commercial', icon: '🏢' },
      { name: this.translate.instant('service_areas.services.deep_clean'), slug: 'deep-clean', icon: '✨' },
      { name: this.translate.instant('service_areas.services.move'), slug: 'move', icon: '📦' }
    ];
  }

  ngOnInit() {
    this.metaService.setPageMeta({
      title: 'Service Areas in Miami | CMK Home Services',
      description: 'CMK Home Services provides professional cleaning throughout Miami, Miami Beach, Coral Gables, Aventura, and surrounding areas. Find your neighborhood and book today!'
    });
  }
}
