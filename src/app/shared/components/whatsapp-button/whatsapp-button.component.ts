import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandConfigService } from '../../../core/services/brand-config.service';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a 
      [href]="whatsappUrl" 
      target="_blank"
      rel="noopener noreferrer"
      class="whatsapp-float"
      aria-label="Chat on WhatsApp"
      title="Chat with us on WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      <span class="whatsapp-text">Chat on WhatsApp</span>
    </a>
  `,
  styles: [`
    .whatsapp-float {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      background: linear-gradient(135deg, #c9a24a, #f5d79b);
      color: #1c1404;
      border-radius: 50px;
      box-shadow: 0 12px 30px -18px rgba(201, 162, 74, 0.35),
                  0 18px 45px -22px rgba(201, 162, 74, 0.35);
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;

      svg {
        width: 28px;
        height: 28px;
        flex-shrink: 0;
        fill: currentColor;
      }

      &:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 16px 40px -24px rgba(201, 162, 74, 0.45),
                    0 24px 55px -30px rgba(201, 162, 74, 0.5);
        filter: brightness(1.05);
      }

      &:active {
        transform: translateY(-1px) scale(1.02);
      }

      @media (max-width: 768px) {
        bottom: 1rem;
        right: 1rem;
        padding: 0.875rem;
        border-radius: 50%;
        
        .whatsapp-text {
          display: none;
        }

        svg {
          width: 32px;
          height: 32px;
        }
      }
    }

    @keyframes pulse {
      0%, 100% {
        box-shadow: 0 12px 30px -18px rgba(201, 162, 74, 0.35),
                    0 18px 45px -22px rgba(201, 162, 74, 0.35);
      }
      50% {
        box-shadow: 0 12px 36px -18px rgba(201, 162, 74, 0.5),
                    0 24px 58px -28px rgba(201, 162, 74, 0.5);
      }
    }

    .whatsapp-float {
      animation: pulse 2.3s ease-in-out infinite;
    }
  `]
})
export class WhatsappButtonComponent {
  private brandConfig = inject(BrandConfigService);

  get whatsappUrl(): string {
    const phone = '17863807579';
    const message = encodeURIComponent('Hi! I\'d like to get a quote for cleaning services.');
    return `https://wa.me/${phone}?text=${message}`;
  }
}
