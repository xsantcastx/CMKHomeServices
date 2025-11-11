import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BrandConfigService } from '../core/services/brand-config.service';

interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  image?: string;
  '@id'?: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    '@type': string;
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification?: Array<{
    '@type': string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  priceRange?: string;
  areaServed?: Array<{
    '@type': string;
    name: string;
  }>;
  hasOfferCatalog?: {
    '@type': string;
    name: string;
    itemListElement: Array<{
      '@type': string;
      itemOffered: {
        '@type': string;
        name: string;
        description: string;
      };
    }>;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  private platformId = inject(PLATFORM_ID);
  private brandConfig = inject(BrandConfigService);

  addLocalBusinessSchema(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Only run in browser
    }

    const schema: LocalBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'CMK Home Services',
      image: 'https://cmkhomeservices.com/assets/logo.png', // Update with actual logo URL
      '@id': 'https://cmkhomeservices.com',
      url: 'https://cmkhomeservices.com',
      telephone: '+1-786-380-7579',
      email: 'info@cmkhomeservices.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Miami',
        addressRegion: 'FL',
        postalCode: '33101',
        addressCountry: 'US'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 25.7617,
        longitude: -80.1918
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00'
        }
      ],
      priceRange: '$$',
      areaServed: [
        { '@type': 'City', name: 'Miami' },
        { '@type': 'City', name: 'Miami Beach' },
        { '@type': 'City', name: 'Coral Gables' },
        { '@type': 'City', name: 'Brickell' },
        { '@type': 'City', name: 'Downtown Miami' },
        { '@type': 'City', name: 'South Beach' },
        { '@type': 'City', name: 'Coconut Grove' },
        { '@type': 'City', name: 'Aventura' },
        { '@type': 'City', name: 'Sunny Isles Beach' },
        { '@type': 'City', name: 'Kendall' },
        { '@type': 'City', name: 'Doral' },
        { '@type': 'City', name: 'Hialeah' }
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Cleaning Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Residential Cleaning',
              description: 'Professional home cleaning services for Miami residents'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Commercial Cleaning',
              description: 'Office and commercial space cleaning services'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Window Washing',
              description: 'Professional window cleaning for homes and businesses'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Deep Cleaning',
              description: 'Intensive deep cleaning services'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Move-In/Move-Out Cleaning',
              description: 'Specialized cleaning for property moves'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Home Organization',
              description: 'Professional organization services'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Rental Unit Management',
              description: 'Cleaning and management for rental properties'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Snowbird Property Care',
              description: 'Property maintenance for seasonal residents'
            }
          }
        ]
      }
    };

    this.injectSchema('local-business-schema', schema);
  }

  private injectSchema(id: string, schema: any): void {
    // Remove existing schema if present
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }

    // Create and inject new schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  removeSchema(id: string): void {
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }
  }
}
