import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '@core/services/language.service';

@Component({
  selector: 'app-voting-guide',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './voting-guide.component.html',
  styleUrl: './voting-guide.component.scss'
})
export class VotingGuideComponent {
  lang = inject(LanguageService);

  activeCategory = signal('registration');

  categories = [
    { id: 'registration', icon: 'user-plus', labelEn: 'Registration', labelHi: 'पंजीकरण' },
    { id: 'id-card', icon: 'credit-card', labelEn: 'Voter ID', labelHi: 'वोटर आईडी' },
    { id: 'booth', icon: 'map-pin', labelEn: 'Find Booth', labelHi: 'बूथ खोजें' },
    { id: 'process', icon: 'check-circle', labelEn: 'How to Vote', labelHi: 'वोट कैसे दें' }
  ];

  votingSteps = [
    {
      titleEn: 'First Polling Officer',
      titleHi: 'प्रथम मतदान अधिकारी',
      descEn: 'Checks your name in the voter list and your ID proof.',
      descHi: 'मतदाता सूची में आपके नाम और आपके पहचान प्रमाण की जांच करता है।',
      icon: '1'
    },
    {
      titleEn: 'Second Polling Officer',
      titleHi: 'द्वितीय मतदान अधिकारी',
      descEn: 'Will ink your finger, give you a slip and take your signature on a register (Form 17A).',
      descHi: 'आपकी उंगली पर स्याही लगाएगा, आपको एक पर्ची देगा और एक रजिस्टर (फॉर्म 17ए) पर आपके हस्ताक्षर लेगा।',
      icon: '2'
    },
    {
      titleEn: 'Third Polling Officer',
      titleHi: 'तृतीय मतदान अधिकारी',
      descEn: 'Takes the slip and enables the EVM for you.',
      descHi: 'पर्ची लेता है और आपके लिए ईवीएम सक्षम करता है।',
      icon: '3'
    },
    {
      titleEn: 'Cast Your Vote',
      titleHi: 'अपना वोट डालें',
      descEn: 'Enter the voting compartment and press the button on the EVM against the candidate of your choice.',
      descHi: 'मतदान कक्ष में प्रवेश करें और अपनी पसंद के उम्मीदवार के सामने ईवीएम पर बटन दबाएं।',
      icon: '4'
    }
  ];

  setCategory(id: string): void {
    this.activeCategory.set(id);
  }
}
