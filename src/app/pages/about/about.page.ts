import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss'
})
export class AboutPage implements OnInit {
  private metaService = inject(MetaService);
  private translate = inject(TranslateService);

  get values() {
    return this.translate.instant('about.values.items') || [];
  }

  get stats() {
    return this.translate.instant('about.stats') || [];
  }

  get benefits() {
    return this.translate.instant('about.why_choose.benefits') || [];
  }

  get founderHighlights() {
    return this.translate.instant('about.founder_story.highlights') || [];
  }

  get founderParagraphs() {
    return this.translate.instant('about.founder_story.paragraphs') || [];
  }

  ngOnInit() {
    this.metaService.setPageMeta({
      title: 'About Us - CMK Home Services | Professional Cleaning in Miami',
      description: 'Meet Gloria and learn about CMK Home Services. Licensed, insured, and dedicated to excellence in residential and commercial cleaning throughout Miami.'
    });
  }
}
