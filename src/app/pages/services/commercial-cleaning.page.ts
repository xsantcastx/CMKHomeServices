import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-commercial-cleaning',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <div class="service-page">
      <!-- Hero Section -->
      <section class="service-hero">
        <div class="page-container">
          <div class="service-hero__content">
            <span class="service-hero__badge">COMMERCIAL CLEANING</span>
            <h1 class="service-hero__title">Professional Business Cleaning in Miami</h1>
            <p class="service-hero__subtitle">
              Keep your workspace pristine, professional, and welcoming. 
              Flexible scheduling, after-hours service, and customized cleaning plans for your business.
            </p>
            <div class="service-hero__ctas">
              <a routerLink="/contact" class="btn btn--primary">Get a Free Quote</a>
              <a href="https://wa.me/17863807579" target="_blank" class="btn btn--secondary">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Industries Section -->
      <section class="section-gap bg-surface">
        <div class="page-container">
          <h2 class="section-title text-center">Industries We Serve</h2>
          <div class="industries-grid">
            <div class="industry-card">
              <div class="industry-card__icon">
                <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
              </div>
              <h3>Office Buildings</h3>
              <p>Corporate offices, coworking spaces, and professional suites</p>
            </div>
            <div class="industry-card">
              <div class="industry-card__icon">
                <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
              </div>
              <h3>Retail Spaces</h3>
              <p>Stores, boutiques, and shopping centers</p>
            </div>
            <div class="industry-card">
              <div class="industry-card__icon">
                <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>
              </div>
              <h3>Restaurants & Cafes</h3>
              <p>Dining areas, kitchens, and food service facilities</p>
            </div>
            <div class="industry-card">
              <div class="industry-card__icon">
                <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"/><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/></svg>
              </div>
              <h3>Professional Services</h3>
              <p>Law firms, medical offices, salons, and clinics</p>
            </div>
            <div class="industry-card">
              <div class="industry-card__icon">
                <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
              </div>
              <h3>Fitness Centers</h3>
              <p>Gyms, yoga studios, and wellness facilities</p>
            </div>
            <div class="industry-card">
              <div class="industry-card__icon">
                <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/></svg>
              </div>
              <h3>Educational Facilities</h3>
              <p>Schools, training centers, and learning spaces</p>
            </div>
          </div>
        </div>
      </section>

      <!-- What's Included Section -->
      <section class="section-gap">
        <div class="page-container">
          <h2 class="section-title text-center">Commercial Cleaning Services</h2>
          <div class="checklist-grid">
            <div class="checklist-column">
              <h3>Common Areas</h3>
              <ul class="checklist">
                <li>✓ Lobby & reception cleaning</li>
                <li>✓ Hallways & corridors</li>
                <li>✓ Elevator cleaning</li>
                <li>✓ Stairwells maintained</li>
                <li>✓ Break rooms sanitized</li>
              </ul>
            </div>
            <div class="checklist-column">
              <h3>Workspaces</h3>
              <ul class="checklist">
                <li>✓ Desks wiped & dusted</li>
                <li>✓ Floors vacuumed & mopped</li>
                <li>✓ Trash removal & replacement</li>
                <li>✓ Surface disinfection</li>
                <li>✓ Window & glass cleaning</li>
              </ul>
            </div>
            <div class="checklist-column">
              <h3>Restrooms</h3>
              <ul class="checklist">
                <li>✓ Complete sanitization</li>
                <li>✓ Fixtures polished</li>
                <li>✓ Supplies restocked</li>
                <li>✓ Odor control</li>
                <li>✓ High-touch disinfection</li>
              </ul>
            </div>
            <div class="checklist-column">
              <h3>Specialized Services</h3>
              <ul class="checklist">
                <li>✓ After-hours cleaning</li>
                <li>✓ Floor waxing & buffing</li>
                <li>✓ Carpet deep cleaning</li>
                <li>✓ Post-construction cleanup</li>
                <li>✓ Event setup/cleanup</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits Section -->
      <section class="section-gap bg-surface">
        <div class="page-container">
          <h2 class="section-title text-center">Why Commercial Clients Choose CMK</h2>
          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-card__icon">🌙</div>
              <h3>Flexible Scheduling</h3>
              <p>After-hours, early morning, or weekend service—we work around your business hours.</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-card__icon">✓</div>
              <h3>Consistent Quality</h3>
              <p>Same dedicated team, same high standards, every single visit.</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-card__icon">🧪</div>
              <h3>Professional Products</h3>
              <p>Commercial-grade, eco-friendly cleaning solutions that work.</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-card__icon">🔒</div>
              <h3>Bonded & Insured</h3>
              <p>Full liability coverage and background-checked staff for your peace of mind.</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-card__icon">📊</div>
              <h3>Custom Plans</h3>
              <p>Tailored cleaning schedules and checklists specific to your industry needs.</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-card__icon">💰</div>
              <h3>Competitive Pricing</h3>
              <p>Transparent quotes with no hidden fees—you know exactly what you're paying for.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Process Section -->
      <section class="section-gap">
        <div class="page-container">
          <h2 class="section-title text-center">How We Work With Your Business</h2>
          <div class="process-steps">
            <div class="process-step">
              <div class="process-step__number">1</div>
              <h3>Site Assessment</h3>
              <p>We visit your facility to understand your specific needs and challenges.</p>
            </div>
            <div class="process-step">
              <div class="process-step__number">2</div>
              <h3>Custom Proposal</h3>
              <p>Receive a detailed plan with transparent pricing and service frequency options.</p>
            </div>
            <div class="process-step">
              <div class="process-step__number">3</div>
              <h3>Scheduled Service</h3>
              <p>Our team arrives on schedule, works efficiently, and minimizes disruption.</p>
            </div>
            <div class="process-step">
              <div class="process-step__number">4</div>
              <h3>Quality Assurance</h3>
              <p>Regular check-ins and adjustments to ensure we exceed your expectations.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="page-container text-center">
          <h2>Ready for a Cleaner Workplace?</h2>
          <p>Let's discuss a custom cleaning plan for your business—no obligation.</p>
          <div class="cta-buttons">
            <a routerLink="/contact" class="btn btn--primary btn--large">Request Free Quote</a>
            <a href="https://wa.me/17863807579" target="_blank" class="btn btn--secondary btn--large">Message on WhatsApp</a>
          </div>
          <p class="cta-contact">
            Or call us: <a href="tel:+17863807579">(786) 380-7579</a>
          </p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .service-page { min-height: 100vh; }
    .service-hero {
      padding: 6rem 0 4rem;
      background: linear-gradient(135deg, rgba(10, 11, 13, 0.95), rgba(19, 21, 26, 0.9));
      position: relative;
      overflow: hidden;
    }
    .service-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 30% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%);
    }
    .service-hero__content {
      position: relative;
      z-index: 2;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    .service-hero__badge {
      display: inline-block;
      padding: 0.5rem 1.5rem;
      background: rgba(212, 175, 55, 0.1);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 999px;
      color: #d4af37;
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      margin-bottom: 1.5rem;
    }
    .service-hero__title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 600;
      background: linear-gradient(135deg, #fff, #f5d6a1, #d4af37);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }
    .service-hero__subtitle {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.7;
      margin-bottom: 2rem;
    }
    .service-hero__ctas {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn {
      padding: 1rem 2rem;
      border-radius: 999px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      display: inline-block;
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
    .section-gap { padding: 5rem 0; }
    .bg-surface { background: rgba(12, 16, 24, 0.5); }
    .section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 3rem;
      color: #f5f5f7;
    }
    .industries-grid,
    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }
    .industry-card,
    .benefit-card {
      padding: 2rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      text-align: center;
      transition: all 0.3s ease;
    }
    .industry-card:hover,
    .benefit-card:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(212, 175, 55, 0.3);
      transform: translateY(-4px);
    }
    .industry-card__icon,
    .benefit-card__icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    .industry-card h3,
    .benefit-card h3 {
      color: #d4af37;
      margin-bottom: 0.75rem;
      font-size: 1.25rem;
    }
    .industry-card p,
    .benefit-card p {
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.6;
    }
    .checklist-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }
    .checklist-column h3 {
      color: #d4af37;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
    .checklist {
      list-style: none;
      padding: 0;
    }
    .checklist li {
      padding: 0.75rem 0;
      color: rgba(255, 255, 255, 0.8);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .process-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 2rem;
    }
    .process-step { text-align: center; }
    .process-step__number {
      width: 4rem;
      height: 4rem;
      margin: 0 auto 1.5rem;
      background: linear-gradient(135deg, #d4af37, #f5a623);
      color: #0a0b0d;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
    }
    .process-step h3 {
      color: #f5f5f7;
      margin-bottom: 0.75rem;
    }
    .process-step p {
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.6;
    }
    .cta-section {
      padding: 6rem 0;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(245, 166, 35, 0.05));
    }
    .cta-section h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 3rem;
      color: #f5f5f7;
      margin-bottom: 1rem;
    }
    .cta-section > div > p {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 2rem;
    }
    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }
    .cta-contact {
      color: rgba(255, 255, 255, 0.6);
      font-size: 1rem;
    }
    .cta-contact a {
      color: #d4af37;
      text-decoration: none;
      font-weight: 600;
    }
    .cta-contact a:hover { text-decoration: underline; }
    .text-center { text-align: center; }
    @media (max-width: 768px) {
      .service-hero { padding: 4rem 0 3rem; }
      .service-hero__title { font-size: 2rem; }
      .section-gap { padding: 3rem 0; }
    }
  `]
})
export class CommercialCleaningPage {}

