import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { ElectionDataService } from '@core/services/election-data.service';
import { LanguageService } from '@core/services/language.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-voting-guide',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './voting-guide.component.html',
  styleUrl: './voting-guide.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true })
      ])
    ])
  ]
})
export class VotingGuideComponent implements OnInit {
  private api = inject(ApiService);
  private dataService = inject(ElectionDataService);
  lang = inject(LanguageService);

  config = signal<any>(null);
  isLoading = signal(true);

  ngOnInit() {
    const type = this.dataService.currentElectionType();
    if (type) {
      this.fetchConfig(type);
    } else {
      this.isLoading.set(false);
    }
  }

  fetchConfig(type: string) {
    this.isLoading.set(true);
    this.api.getElectionConfig(type).subscribe({
      next: (data) => {
        this.config.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load election config', err);
        this.isLoading.set(false);
      }
    });
  }
}
