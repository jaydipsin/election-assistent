import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '@core/services/language.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-polling-booth-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './polling-booth-animation.component.html',
  styleUrl: './polling-booth-animation.component.scss',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(-20px)' }))
      ])
    ])
  ]
})
export class PollingBoothAnimationComponent {
  lang = inject(LanguageService);
  @Output() close = new EventEmitter<void>();

  currentFrame = signal(1);
  totalFrames = 5;
  isBeeping = signal(false);
  showSlip = signal(false);

  frames = [
    {
      id: 1,
      title: { en: 'Identity Verification', hi: 'पहचान का सत्यापन' },
      description: { 
        en: 'Polling Officer 1 checks your name on the electoral roll and verifies your ID.', 
        hi: 'मतदान अधिकारी 1 मतदाता सूची में आपके नाम की जांच करता है और आपकी आईडी सत्यापित करता है।' 
      },
      animation: 'officer-1'
    },
    {
      id: 2,
      title: { en: 'Ink & Signature', hi: 'स्याही और हस्ताक्षर' },
      description: { 
        en: 'Polling Officer 2 marks your left forefinger with indelible ink, asks for your signature, and gives a voter slip.', 
        hi: 'मतदान अधिकारी 2 आपकी बाईं तर्जनी पर अमिट स्याही लगाता है, आपके हस्ताक्षर मांगता है, और एक मतदाता पर्ची देता है।' 
      },
      animation: 'officer-2'
    },
    {
      id: 3,
      title: { en: 'Ballot Activation', hi: 'मतपत्र सक्रियण' },
      description: { 
        en: 'Polling Officer 3 takes your slip and activates the ballot on the Control Unit.', 
        hi: 'मतदान अधिकारी 3 आपकी पर्ची लेता है और कंट्रोल यूनिट पर मतपत्र सक्रिय करता है।' 
      },
      animation: 'officer-3'
    },
    {
      id: 4,
      title: { en: 'Casting Your Vote', hi: 'अपना वोट डालना' },
      description: { 
        en: 'Enter the booth and press the blue button next to your candidate. A red light will glow.', 
        hi: 'बूथ में प्रवेश करें और अपने उम्मीदवार के सामने वाला नीला बटन दबाएं। एक लाल बत्ती जलेगी।' 
      },
      animation: 'evm-press'
    },
    {
      id: 5,
      title: { en: 'VVPAT Confirmation', hi: 'VVPAT पुष्टिकरण' },
      description: { 
        en: 'Hear a long "beep" and watch the VVPAT print your slip. It stays visible for 7 seconds.', 
        hi: 'एक लंबी "बीप" सुनें और VVPAT को अपनी पर्ची प्रिंट करते हुए देखें। यह 7 सेकंड तक दिखाई देती है।' 
      },
      animation: 'vvpat-beep'
    }
  ];

  nextFrame() {
    if (this.currentFrame() < this.totalFrames) {
      this.currentFrame.update(f => f + 1);
      if (this.currentFrame() === 5) {
        this.triggerBoothSequence();
      }
    } else {
      this.close.emit();
    }
  }

  prevFrame() {
    if (this.currentFrame() > 1) {
      this.currentFrame.update(f => f - 1);
    }
  }

  triggerBoothSequence() {
    this.isBeeping.set(true);
    setTimeout(() => {
      this.isBeeping.set(false);
      this.showSlip.set(true);
      setTimeout(() => {
        this.showSlip.set(false);
      }, 7000);
    }, 1500);
  }
}
