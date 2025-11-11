import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DEFAULT_SERVICE_ID, SERVICE_ICONS, SERVICE_IDS, ServiceIcon, ServiceId } from './services.constants';

interface ProcessStep {
  title: string;
  description: string;
}

interface QuickFact {
  label: string;
  value: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Service {
  id: ServiceId;
  icon: ServiceIcon;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  process: ProcessStep[];
  trustBadges: string[];
  quickFacts: QuickFact[];
  faqs: FAQ[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './services.page.html',
  styleUrl: './services.page.scss'
})
export class ServicesPage implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private translate = inject(TranslateService);
  private langChangeSubscription?: Subscription;

  activeService = signal<ServiceId>(DEFAULT_SERVICE_ID);
  services = signal<Service[]>([]);

  private loadServices(): void {
    const commonFAQs = this.translate.instant('services.common_faqs') || [];
    
    const loadedServices = SERVICE_IDS.map(id => {
      const serviceData = this.translate.instant(`services.${id}`) || {};
      const serviceFaqs = serviceData.faqs || [];
      
      return {
        id: id,
        icon: SERVICE_ICONS[id],
        title: serviceData.title || '',
        tagline: serviceData.tagline || '',
        description: serviceData.description || '',
        quickFacts: serviceData.quick_facts || [],
        features: serviceData.features || [],
        process: serviceData.process || [],
        trustBadges: serviceData.trust_badges || [],
        faqs: [...serviceFaqs, ...commonFAQs]
      };
    });

    this.services.set(loadedServices);
  }

  ngOnInit(): void {
    // Load services initially
    this.loadServices();

    // Reload services when language changes
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadServices();
    });

    // Check for service in route params (e.g., /services/residential)
    this.route.params.subscribe(params => {
      if (params['serviceId']) {
        const paramId = params['serviceId'] as ServiceId;
        const serviceExists = this.services().find(s => s.id === paramId);
        if (serviceExists) {
          this.activeService.set(paramId);
        } else {
          this.router.navigate(['/services']);
        }
      }
    });

    // Check for service in query params (e.g., /services?service=commercial)
    this.route.queryParams.subscribe(params => {
      if (params['service']) {
        const queryId = params['service'] as ServiceId;
        const serviceExists = this.services().find(s => s.id === queryId);
        if (serviceExists) {
          this.activeService.set(queryId);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
  }

  setActiveService(id: ServiceId): void {
    this.activeService.set(id);
    // Update URL without full navigation
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { service: id },
      queryParamsHandling: 'merge'
    });
    if (typeof window !== 'undefined') {
      // Scroll to service detail section
      const detailSection = document.querySelector('.service-detail');
      if (detailSection) {
        detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  whatsAppLink(serviceTitle: string): string {
    const message = `Hi! I'd like to discuss ${serviceTitle} services.`;
    return `https://wa.me/17863807579?text=${encodeURIComponent(message)}`;
  }
}


