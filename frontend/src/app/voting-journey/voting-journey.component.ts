import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { LanguageService } from '@core/services/language.service';
import { ElectionDataService } from '@core/services/election-data.service';
import { PollingBoothAnimationComponent } from '../polling-booth-animation/polling-booth-animation.component';

@Component({
  selector: 'app-voting-journey',
  standalone: true,
  imports: [CommonModule, RouterLink, PollingBoothAnimationComponent],
  templateUrl: './voting-journey.component.html',
  styleUrl: './voting-journey.component.scss',
  animations: [
    trigger('stepAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-10px)' }),
          stagger(100, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class VotingJourneyComponent {
  lang = inject(LanguageService);
  private dataService = inject(ElectionDataService);

  currentStep = signal(1);
  totalSteps = 8;
  showBoothAnimation = signal(false);

  // EVM Simulation State
  isVoting = signal(false);
  hasVoted = signal(false);
  showVVPAT = signal(false);
  selectedCandidate = signal<string | null>(null);

  progressWidth = computed(() => `${(this.currentStep() / this.totalSteps) * 100}%`);

  nextStep(): void {
    if (this.currentStep() < this.totalSteps) {
      this.currentStep.update(s => s + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
    }
  }

  goToStep(step: number): void {
    this.currentStep.set(step);
  }

  simulateVote(candidate: string): void {
    if (this.isVoting() || this.hasVoted()) return;

    this.selectedCandidate.set(candidate);
    this.isVoting.set(true);

    // Simulate VVPAT printing
    setTimeout(() => {
      this.showVVPAT.set(true);

      // Simulate Beep and success
      setTimeout(() => {
        this.isVoting.set(false);
        this.hasVoted.set(true);
        this.showVVPAT.set(false);

        // Update Firebase Progress
        this.dataService.updateProgress('evm_simulator', true);

        // Play beep sound if needed (omitted for simplicity but simulated visually)
      }, 3000);
    }, 1000);
  }

  resetSim(): void {
    this.isVoting.set(false);
    this.hasVoted.set(false);
    this.showVVPAT.set(false);
    this.selectedCandidate.set(null);
  }

  speak(text: string): void {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.lang.language() === 'hi' ? 'hi-IN' : 'en-IN';
    window.speechSynthesis.speak(utterance);
  }
}
