import { Component, inject, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '@core/services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  lang = inject(LanguageService);
  menuToggle = output<void>();

  onToggleMenu(): void {
    this.menuToggle.emit();
  }

  onToggleLanguage(): void {
    this.lang.toggleLanguage();
  }
}
