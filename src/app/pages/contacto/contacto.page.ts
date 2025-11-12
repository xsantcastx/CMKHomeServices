import { Component, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EmailService } from '../../services/email.service';
import { AnalyticsService } from '../../services/analytics.service';
import { RecaptchaService } from '../../services/recaptcha.service';
import { MetaService } from '../../services/meta.service';
import { BrandConfigService } from '../../core/services/brand-config.service';

interface ContactFormData {
  nombre: string;
  email: string;
  telefono: string;
  servicio?: string;
  direccion?: string;
  mensaje: string;
  aceptarPrivacidad: boolean;
  fotos?: File[];
}

@Component({
  selector: 'app-contacto-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contacto.page.html',
  styleUrl: './contacto.page.scss'
})
export class ContactoPageComponent {
  private platformId = inject(PLATFORM_ID);
  private analyticsService = inject(AnalyticsService);
  private metaService = inject(MetaService);
  private recaptchaService = inject(RecaptchaService);
  private translate = inject(TranslateService);
  brandConfig = inject(BrandConfigService);
  
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  submitErrorMessage = '';
  selectedFiles: File[] = [];
  
  // Get services from translations
  get services() {
    return [
      { value: 'residential', label: this.translate.instant('contact.services.residential') },
      { value: 'commercial', label: this.translate.instant('contact.services.commercial') },
      { value: 'deep-clean', label: this.translate.instant('contact.services.deep_clean') },
      { value: 'move-in-out', label: this.translate.instant('contact.services.move_in_out') },
      { value: 'post-construction', label: this.translate.instant('contact.services.post_construction') },
      { value: 'windows', label: this.translate.instant('contact.services.windows') },
      { value: 'carpet', label: this.translate.instant('contact.services.carpet') }
    ];
  }

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) {
    // Set page meta tags
    this.metaService.setPageMeta({
      title: 'Contact Us - Get a Free Quote | CMK Home Services',
      description: 'Get in touch with CMK Home Services for professional cleaning services in Miami. Free quotes, same-day service available. Call (786) 380-7579 or message us.'
    });

    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[\+]?[1]?[\s]?[(]?[0-9]{3}[)]?[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/)]],
      servicio: ['', []],
      direccion: ['', [Validators.maxLength(200)]],
      mensaje: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      aceptarPrivacidad: [false, [Validators.requiredTrue]]
    });
    
    // Track form start when user starts filling it
    this.contactForm.valueChanges.subscribe(() => {
      if (!this.isSubmitting && !this.submitSuccess) {
        this.analyticsService.trackFormStart('contact_form');
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files).slice(0, 5); // Max 5 files
    }
  }

  async onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitError = false;
      this.submitSuccess = false;
      
      const formData: ContactFormData = this.contactForm.value;
      
      // Only submit if in browser (not during SSR)
      if (isPlatformBrowser(this.platformId)) {
        try {
          // Execute reCAPTCHA v3
          const recaptchaToken = await this.recaptchaService.execute('contact');
          
          // Add files to form data if any
          if (this.selectedFiles.length > 0) {
            formData.fotos = this.selectedFiles;
          }
          
          // Send form with reCAPTCHA token
          await this.emailService.sendContactForm(formData);
          
          // Track successful form submission
          this.analyticsService.trackFormSubmit('contact_form', true);
          this.analyticsService.trackContactSubmit('form', {
            servicio: formData.servicio || 'general',
            has_photos: this.selectedFiles.length > 0,
            form_location: 'contacto_page'
          });
          
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.contactForm.reset();
          this.selectedFiles = [];
          
          // Reset success message after 8 seconds
          setTimeout(() => {
            this.submitSuccess = false;
          }, 8000);
        } catch (error: any) {
          // Track form error
          this.analyticsService.trackFormSubmit('contact_form', false);
          this.analyticsService.trackFormError('contact_form', 'submission_error');
          
          this.isSubmitting = false;
          this.submitError = true;
          this.submitErrorMessage = error.message || this.translate.instant('contact.error_message');
          
          // Reset error message after 10 seconds
          setTimeout(() => {
            this.submitError = false;
          }, 10000);
        }
      } else {
        // Fallback for SSR
        setTimeout(() => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.contactForm.reset();
        }, 1000);
      }
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
      
      // If it's a nested form group, recursively mark as touched
      if (control instanceof FormGroup) {
        this.markFormGroupTouched();
      }
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      const errors = field.errors;
      
      if (errors['required']) {
        const fieldKeys: { [key: string]: string } = {
          'nombre': 'contact.validation.name_required',
          'email': 'contact.validation.email_required',
          'telefono': 'contact.validation.phone_required',
          'mensaje': 'contact.validation.message_required',
          'aceptarPrivacidad': 'contact.validation.privacy_required'
        };
        return this.translate.instant(fieldKeys[fieldName] || 'contact.validation.name_required');
      }
      
      if (errors['email']) return this.translate.instant('contact.validation.email_invalid');
      if (errors['pattern'] && fieldName === 'telefono') return this.translate.instant('contact.validation.phone_invalid');
      if (errors['minlength']) {
        return this.translate.instant('contact.validation.min_length', { length: errors['minlength'].requiredLength });
      }
      if (errors['maxlength']) {
        return this.translate.instant('contact.validation.max_length', { length: errors['maxlength'].requiredLength });
      }
    }
    return '';
  }

  // Getter for form field states to use in template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.valid && field?.touched);
  }

  // Phone number formatting helper
  formatPhoneNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove non-digits
    
    // Simple Spanish phone formatting
    if (value.startsWith('34')) {
      value = '+34 ' + value.substring(2);
    } else if (value.length > 0 && !value.startsWith('+')) {
      value = '+34 ' + value;
    }
    
    this.contactForm.patchValue({ telefono: value });
  }

  // Get WhatsApp link with clean phone number
  getWhatsAppLink(): string {
    const phone = this.brandConfig.site.contact.phone || '';
    const cleanPhone = phone.replace(/\D/g, ''); // Remove non-digits
    return `https://wa.me/${cleanPhone}`;
  }
}
