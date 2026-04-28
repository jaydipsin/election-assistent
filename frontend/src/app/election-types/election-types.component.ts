import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ElectionDataService } from '@core/services/election-data.service';
import { LanguageService } from '@core/services/language.service';

interface ElectionOption {
  id: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-election-types',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './election-types.component.html',
  styleUrl: './election-types.component.scss'
})
export class ElectionTypesComponent {
  private dataService = inject(ElectionDataService);
  private router = inject(Router);
  lang = inject(LanguageService);

  options: ElectionOption[] = [
    { id: 'lok-sabha', icon: '🏛️', color: '#1a237e' }, // Navy
    { id: 'vidhan-sabha', icon: '⚖️', color: '#f57c00' }, // Saffron
    { id: 'panchayat', icon: '🌳', color: '#2e7d32' }, // Green
    { id: 'municipal', icon: '🏢', color: '#00838f' }  // Teal
  ];

  selectElection(type: string) {
    this.dataService.setElectionType(type);
    this.router.navigate(['/voting-guide']);
  }
}
