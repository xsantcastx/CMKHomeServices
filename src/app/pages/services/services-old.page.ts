import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

interface Service {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  idealFor: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <div class="services-page">
      <!-- Hero Section -->
      <section class="services-hero">
        <div class="page-container">
          <h1 class="services-hero__title">Our Services</h1>
          <p class="services-hero__subtitle">
            Professional cleaning and organization services tailored to your needs. 
            Licensed, insured, and trusted by Miami residents.
          </p>
        </div>
      </section>

      <!-- Services Grid -->
      <section class="section-gap">
        <div class="page-container">
          <div class="services-grid">
            @for (service of services; track service.id) {
              <article class="service-card" (click)="selectService(service)">
                <div class="service-card__icon">{{ service.icon }}</div>
                <h2 class="service-card__title">{{ service.title }}</h2>
                <p class="service-card__tagline">{{ service.tagline }}</p>
                <button class="service-card__btn">Learn More →</button>
              </article>
            }
          </div>
        </div>
      </section>

      <!-- Selected Service Detail Modal/Section -->
      @if (selectedService()) {
        <div class="service-modal" (click)="closeService()">
          <div class="service-modal__content" (click)="$event.stopPropagation()">
            <button class="service-modal__close" (click)="closeService()">✕</button>
            
            <div class="service-detail">
              <div class="service-detail__header">
                <span class="service-detail__icon">{{ selectedService()!.icon }}</span>
                <h2>{{ selectedService()!.title }}</h2>
                <p class="service-detail__tagline">{{ selectedService()!.tagline }}</p>
              </div>

              <div class="service-detail__body">
                <div class="service-detail__section">
                  <h3>What We Do</h3>
                  <p>{{ selectedService()!.description }}</p>
                </div>

                <div class="service-detail__section">
                  <h3>What's Included</h3>
                  <ul class="feature-list">
                    @for (feature of selectedService()!.features; track feature) {
                      <li>✓ {{ feature }}</li>
                    }
                  </ul>
                </div>

                <div class="service-detail__section">
                  <h3>Ideal For</h3>
                  <ul class="ideal-list">
                    @for (item of selectedService()!.idealFor; track item) {
                      <li>{{ item }}</li>
                    }
                  </ul>
                </div>

                <div class="service-detail__cta">
                  <a routerLink="/contact" class="btn btn--primary">Get a Free Quote</a>
                  <a href="https://wa.me/17863807579" target="_blank" class="btn btn--secondary">
                    <span class="whatsapp-icon">💬</span> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Trust Section -->
      <section class="trust-section">
        <div class="page-container">
          <h2 class="section-title">Why Choose CMK Home Services?</h2>
          <div class="trust-grid">
            <div class="trust-card">
              <div class="trust-card__icon">✓</div>
              <h3>Licensed & Insured</h3>
              <p>Fully covered for your complete peace of mind</p>
            </div>
            <div class="trust-card">
              <div class="trust-card__icon">👥</div>
              <h3>Experienced Team</h3>
              <p>Trained professionals who treat your home like their own</p>
            </div>
            <div class="trust-card">
              <div class="trust-card__icon">💰</div>
              <h3>Transparent Pricing</h3>
              <p>No hidden fees—you know exactly what you'll pay</p>
            </div>
            <div class="trust-card">
              <div class="trust-card__icon">⭐</div>
              <h3>Exceptional Service</h3>
              <p>Detail-oriented care and guaranteed satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="page-container">
          <h2>Ready to Get Started?</h2>
          <p>Contact us today for a free, no-obligation quote</p>
          <div class="cta-buttons">
            <a routerLink="/contact" class="btn btn--primary btn--large">Request Free Quote</a>
            <a href="tel:+17863807579" class="btn btn--secondary btn--large">📞 (786) 380-7579</a>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .services-page {
      min-height: 100vh;
      background: linear-gradient(180deg, #0a0b0d 0%, #13151a 100%);
    }

    .services-hero {
      padding: 6rem 0 4rem;
      text-align: center;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.05), rgba(245, 166, 35, 0.02));
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .services-hero__title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(3rem, 6vw, 5rem);
      font-weight: 600;
      background: linear-gradient(135deg, #fff, #f5d6a1, #d4af37);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      margin-bottom: 1.5rem;
    }

    .services-hero__subtitle {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.7);
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.7;
    }

    .section-gap {
      padding: 5rem 0;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
    }

    .service-card {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1.5rem;
      padding: 2.5rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .service-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .service-card:hover {
      transform: translateY(-8px);
      border-color: rgba(212, 175, 55, 0.3);
      box-shadow: 0 20px 40px rgba(212, 175, 55, 0.1);
    }

    .service-card:hover::before {
      opacity: 1;
    }

    .service-card__icon {
      font-size: 4rem;
      margin-bottom: 1.5rem;
      filter: drop-shadow(0 4px 8px rgba(212, 175, 55, 0.3));
    }

    .service-card__title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.75rem;
      font-weight: 600;
      color: #f5f5f7;
      margin-bottom: 0.75rem;
    }

    .service-card__tagline {
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .service-card__btn {
      background: none;
      border: 1px solid rgba(212, 175, 55, 0.3);
      color: #d4af37;
      padding: 0.75rem 1.5rem;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
    }

    .service-card__btn:hover {
      background: rgba(212, 175, 55, 0.1);
      border-color: #d4af37;
    }

    /* Modal Styles */
    .service-modal {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      animation: fadeIn 0.3s ease;
      overflow-y: auto;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .service-modal__content {
      background: linear-gradient(135deg, #1a1b1f, #13151a);
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: 2rem;
      max-width: 800px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      animation: slideUp 0.3s ease;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
    }

    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(50px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }

    .service-modal__close {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 10;
    }

    .service-modal__close:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: rotate(90deg);
    }

    .service-detail {
      padding: 3rem;
    }

    .service-detail__header {
      text-align: center;
      margin-bottom: 3rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .service-detail__icon {
      font-size: 5rem;
      display: block;
      margin-bottom: 1.5rem;
      filter: drop-shadow(0 4px 12px rgba(212, 175, 55, 0.4));
    }

    .service-detail__header h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.5rem;
      color: #f5f5f7;
      margin-bottom: 0.5rem;
    }

    .service-detail__tagline {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.6);
    }

    .service-detail__section {
      margin-bottom: 2.5rem;
    }

    .service-detail__section h3 {
      color: #d4af37;
      font-size: 1.5rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .service-detail__section p {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.8;
      font-size: 1.0625rem;
    }

    .feature-list,
    .ideal-list {
      list-style: none;
      padding: 0;
      display: grid;
      gap: 0.75rem;
    }

    .feature-list li {
      color: rgba(255, 255, 255, 0.8);
      padding: 0.75rem 1rem;
      background: rgba(255, 255, 255, 0.03);
      border-left: 3px solid #d4af37;
      border-radius: 0.5rem;
    }

    .ideal-list {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    .ideal-list li {
      color: rgba(255, 255, 255, 0.7);
      padding: 0.75rem 1rem;
      background: rgba(212, 175, 55, 0.05);
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: 0.75rem;
      text-align: center;
    }

    .service-detail__cta {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      flex-wrap: wrap;
    }

    .btn {
      padding: 1rem 2rem;
      border-radius: 999px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      border: none;
      cursor: pointer;
    }

    .btn--primary {
      background: linear-gradient(135deg, #d4af37, #f5a623);
      color: #0a0b0d;
      border: 1px solid rgba(245, 166, 35, 0.2);
    }

    .btn--primary:hover {
      background: linear-gradient(135deg, #e5c158, #f5b644);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
    }

    .btn--secondary {
      background: rgba(255, 255, 255, 0.05);
      color: #f5f5f7;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .btn--secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }

    .btn--large {
      padding: 1.25rem 2.5rem;
      font-size: 1.125rem;
    }

    .whatsapp-icon {
      font-size: 1.25rem;
    }

    /* Trust Section */
    .trust-section {
      padding: 5rem 0;
      background: rgba(12, 16, 24, 0.5);
    }

    .section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.5rem;
      text-align: center;
      color: #f5f5f7;
      margin-bottom: 3rem;
    }

    .trust-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .trust-card {
      padding: 2rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      text-align: center;
      transition: all 0.3s ease;
    }

    .trust-card:hover {
      border-color: rgba(212, 175, 55, 0.3);
      background: rgba(255, 255, 255, 0.05);
    }

    .trust-card__icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .trust-card h3 {
      color: #d4af37;
      margin-bottom: 0.75rem;
      font-size: 1.25rem;
    }

    .trust-card p {
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.6;
    }

    /* CTA Section */
    .cta-section {
      padding: 6rem 0;
      text-align: center;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(245, 166, 35, 0.04));
    }

    .cta-section h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 3rem;
      color: #f5f5f7;
      margin-bottom: 1rem;
    }

    .cta-section p {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 2rem;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    @media (max-width: 768px) {
      .services-hero {
        padding: 4rem 0 3rem;
      }

      .section-gap {
        padding: 3rem 0;
      }

      .services-grid {
        grid-template-columns: 1fr;
      }

      .service-detail {
        padding: 2rem 1.5rem;
      }

      .service-modal__content {
        border-radius: 1.5rem;
      }

      .ideal-list {
        grid-template-columns: 1fr;
      }

      .service-detail__cta {
        flex-direction: column;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class ServicesPage {
  selectedService = signal<Service | null>(null);

  services: Service[] = [
    {
      id: 'residential',
      icon: '🏠',
      title: 'Residential Cleaning',
      tagline: 'Your home, spotless and stress-free',
      description: 'Comprehensive home cleaning services from routine maintenance to deep cleans. Our experienced team handles every detail so you can enjoy your space without lifting a finger.',
      features: [
        'Kitchen deep cleaning & sanitization',
        'Bathroom scrubbing & disinfection',
        'Floor vacuuming & mopping',
        'Dusting all surfaces & fixtures',
        'Bed making & linen changing',
        'Trash removal & disposal',
        'Window cleaning (interior)',
        'Customizable cleaning checklists'
      ],
      idealFor: [
        'Busy families',
        'Working professionals',
        'Regular maintenance',
        'Post-party cleanup',
        'Seasonal deep cleans'
      ]
    },
    {
      id: 'commercial',
      icon: '🏢',
      title: 'Commercial Cleaning',
      tagline: 'Professional spaces that impress',
      description: 'Keep your business looking its best with our commercial cleaning services. We work around your schedule, including after-hours service, to ensure minimal disruption.',
      features: [
        'Office & workspace cleaning',
        'Restroom sanitization',
        'Break room & kitchen maintenance',
        'Lobby & reception area care',
        'Floor care & maintenance',
        'Window & glass cleaning',
        'Trash & recycling removal',
        'After-hours scheduling available'
      ],
      idealFor: [
        'Office buildings',
        'Retail spaces',
        'Medical facilities',
        'Restaurants',
        'Property management'
      ]
    },
    {
      id: 'windows',
      icon: '🪟',
      title: 'Window Washing',
      tagline: 'Crystal-clear views, inside and out',
      description: 'Professional window cleaning that makes your glass sparkle. We handle both interior and exterior windows safely and efficiently.',
      features: [
        'Interior window cleaning',
        'Exterior window washing',
        'Screen cleaning & repair',
        'Track & sill cleaning',
        'Streak-free shine guarantee',
        'Hard water stain removal',
        'Safety equipment for high windows',
        'Eco-friendly cleaning solutions'
      ],
      idealFor: [
        'High-rise apartments',
        'Single-family homes',
        'Commercial buildings',
        'Storefronts',
        'Seasonal maintenance'
      ]
    },
    {
      id: 'organization',
      icon: '📦',
      title: 'Home Organization',
      tagline: 'From chaos to calm, we organize it all',
      description: 'Declutter and organize your space with our professional organizing services. We create functional systems that are easy to maintain.',
      features: [
        'Closet organization & systems',
        'Garage decluttering & setup',
        'Kitchen & pantry organization',
        'Home office organization',
        'Storage solutions & labeling',
        'Donation coordination',
        'Space planning & optimization',
        'Maintenance plans & tips'
      ],
      idealFor: [
        'Downsizing households',
        'Growing families',
        'Home offices',
        'Seasonal transitions',
        'New homeowners'
      ]
    },
    {
      id: 'deep-cleaning',
      icon: '🧼',
      title: 'Deep Cleaning Services',
      tagline: 'The ultimate reset for your home',
      description: 'Go beyond surface cleaning with our comprehensive deep cleaning service. We tackle every nook, cranny, and hard-to-reach spot for a truly fresh start.',
      features: [
        'Baseboard & trim cleaning',
        'Inside appliances (oven, fridge, microwave)',
        'Cabinet interiors & exteriors',
        'Light fixture & ceiling fan cleaning',
        'Grout & tile deep scrubbing',
        'Blinds & window treatment cleaning',
        'Wall washing & spot treatment',
        'Behind & under furniture cleaning'
      ],
      idealFor: [
        'Spring cleaning',
        'Pre-event preparation',
        'Post-construction cleanup',
        'Annual maintenance',
        'New home preparation'
      ]
    },
    {
      id: 'move-in-out',
      icon: '🚚',
      title: 'Move-In / Move-Out Cleaning',
      tagline: 'Start fresh or leave spotless',
      description: 'Make moving easier with our thorough move-in/move-out cleaning. Perfect for renters, homeowners, and property managers ensuring spaces are pristine.',
      features: [
        'Complete empty-home cleaning',
        'Inside all cabinets & closets',
        'All appliances cleaned (inside & out)',
        'Wall spot cleaning',
        'Carpet vacuuming & spot treatment',
        'Window & blind cleaning',
        'Bathroom deep sanitization',
        'Landlord/tenant ready certification'
      ],
      idealFor: [
        'Renters',
        'Property managers',
        'Home sellers',
        'New homeowners',
        'Apartment turnovers'
      ]
    },
    {
      id: 'unit-management',
      icon: '🔑',
      title: 'Unit Management Services',
      tagline: 'Property care for landlords & managers',
      description: 'Comprehensive cleaning and maintenance for rental properties, vacation homes, and investment properties. We keep units turnover-ready and guest-ready.',
      features: [
        'Turnover cleaning between tenants',
        'Regular maintenance cleaning',
        'Inspection-ready preparation',
        'Linen & supply management',
        'Minor repairs coordination',
        'Preventive maintenance checks',
        'Photography-ready staging',
        'Flexible scheduling for showings'
      ],
      idealFor: [
        'Property managers',
        'Landlords',
        'Vacation rental owners',
        'Real estate investors',
        'Airbnb hosts'
      ]
    },
    {
      id: 'snowbird',
      icon: '🏖️',
      title: 'Snowbird Property Care',
      tagline: 'Peace of mind while you are away',
      description: 'Specialized care for seasonal residents. We keep your Miami property fresh, secure, and ready for your return whether you are gone for weeks or months.',
      features: [
        'Regular property inspections',
        'Pre-arrival deep cleaning',
        'Preventive maintenance checks',
        'Mail & package management',
        'Plant & garden care coordination',
        'Hurricane preparation/cleanup',
        'Climate control monitoring',
        'Security & safety checks'
      ],
      idealFor: [
        'Seasonal residents',
        'Winter visitors',
        'Vacation homeowners',
        'Snowbirds',
        'Extended travelers'
      ]
    }
  ];

  selectService(service: Service) {
    this.selectedService.set(service);
    document.body.style.overflow = 'hidden';
  }

  closeService() {
    this.selectedService.set(null);
    document.body.style.overflow = '';
  }
}
