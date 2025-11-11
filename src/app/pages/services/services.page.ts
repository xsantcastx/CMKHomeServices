import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

type ServiceIcon = 'home' | 'office' | 'windows' | 'organize' | 'sparkles' | 'keys' | 'building' | 'sun';

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
  id: string;
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

  activeService = signal<string>('residential');
  services = signal<Service[]>([]);

  private serviceIcons: Record<string, ServiceIcon> = {
    residential: 'home',
    commercial: 'office',
    windows: 'windows',
    organization: 'organize',
    deep_clean: 'sparkles',
    move: 'keys',
    property: 'building',
    snowbird: 'sun'
  };

  private loadServices(): void {
    const serviceIds = ['residential', 'commercial', 'windows', 'organization', 'deep_clean', 'move', 'property', 'snowbird'];
    const commonFAQs = this.translate.instant('services.common_faqs') || [];
    
    const loadedServices = serviceIds.map(id => {
      const serviceData = this.translate.instant(`services.${id}`) || {};
      const serviceFaqs = serviceData.faqs || [];
      
      return {
        id: id,
        icon: this.serviceIcons[id],
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
        const serviceExists = this.services().find(s => s.id === params['serviceId']);
        if (serviceExists) {
          this.activeService.set(params['serviceId']);
        } else {
          this.router.navigate(['/services']);
        }
      }
    });

    // Check for service in query params (e.g., /services?service=commercial)
    this.route.queryParams.subscribe(params => {
      if (params['service']) {
        const serviceExists = this.services().find(s => s.id === params['service']);
        if (serviceExists) {
          this.activeService.set(params['service']);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
  }

  setActiveService(id: string): void {
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


