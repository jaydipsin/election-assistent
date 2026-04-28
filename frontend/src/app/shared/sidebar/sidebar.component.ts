import { Component, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '@core/services/language.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  lang = inject(LanguageService);
  isOpen = input<boolean>(false);
  sidebarClose = output<void>();

  navItems = [
    {
      route: '/',
      labelKey: 'nav.home',
      icon: 'home',
      exact: true
    },
    {
      route: '/voting-guide',
      labelKey: 'nav.votingGuide',
      icon: 'book',
      exact: false
    },
    {
      route: '/election-types',
      labelKey: 'nav.electionTypes',
      icon: 'layers',
      exact: false
    },
    {
      route: '/chatbot',
      labelKey: 'nav.chatbot',
      icon: 'message',
      exact: false
    }
  ];

  close(): void {
    this.sidebarClose.emit();
  }

  onNavClick(): void {
    this.close();
  }
}
