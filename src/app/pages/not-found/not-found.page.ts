import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.scss'
})
export class NotFoundPageComponent {
  private translate = inject(TranslateService);

  get popularServices() {
    return [
      { name: this.translate.instant('not_found_page.services.residential'), slug: 'residential', icon: '🏠' },
      { name: this.translate.instant('not_found_page.services.commercial'), slug: 'commercial', icon: '🏢' },
      { name: this.translate.instant('not_found_page.services.deep_clean'), slug: 'deep-clean', icon: '✨' },
      { name: this.translate.instant('not_found_page.services.windows'), slug: 'windows', icon: '🪟' }
    ];
  }

  get quickLinks() {
    return [
      { name: this.translate.instant('not_found_page.links.home'), path: '/', icon: '🏠' },
      { name: this.translate.instant('not_found_page.links.all_services'), path: '/services', icon: '🧹' },
      { name: this.translate.instant('not_found_page.links.about'), path: '/about', icon: '👥' },
      { name: this.translate.instant('not_found_page.links.service_areas'), path: '/service-areas', icon: '📍' },
      { name: this.translate.instant('not_found_page.links.contact'), path: '/contact', icon: '📞' }
    ];
  }
}