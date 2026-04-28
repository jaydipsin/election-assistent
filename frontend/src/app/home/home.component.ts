import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '@core/services/language.service';

interface FeatureCard {
  iconType: string;
  titleKey: string;
  descKey: string;
  route: string;
  accent: string;
}

interface StatItem {
  value: string;
  labelKey: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  lang = inject(LanguageService);
  isVisible = signal(false);

  features: FeatureCard[] = [
    {
      iconType: 'voter',
      titleKey: 'feature.firstTimeVoter.title',
      descKey: 'feature.firstTimeVoter.desc',
      route: '/first-time-voter',
      accent: 'saffron'
    },
    {
      iconType: 'election',
      titleKey: 'feature.electionTypes.title',
      descKey: 'feature.electionTypes.desc',
      route: '/election-types',
      accent: 'navy'
    },
    {
      iconType: 'booth',
      titleKey: 'feature.booth.title',
      descKey: 'feature.booth.desc',
      route: '/voting-journey',
      accent: 'green'
    }
  ];

  stats: StatItem[] = [
    { value: '18', labelKey: 'stats.elections', icon: 'calendar' },
    { value: '96.8 Cr', labelKey: 'stats.voters', icon: 'users' },
    { value: '543', labelKey: 'stats.constituencies', icon: 'map' },
    { value: '65.79%', labelKey: 'stats.turnout', icon: 'trending' }
  ];

  ngOnInit(): void {
    setTimeout(() => this.isVisible.set(true), 100);
  }
}
