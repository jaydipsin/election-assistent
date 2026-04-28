import { Component, inject, signal, effect, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '@core/services/language.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent implements AfterViewChecked {
  lang = inject(LanguageService);
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  messages = signal<{ text: string, isUser: boolean }[]>([
    { text: this.lang.t('chatbot.greeting'), isUser: false }
  ]);

  userInput = '';

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sendMessage(): void {
    const input = this.userInput.trim();
    if (!input) return;

    this.messages.update(m => [...m, { text: input, isUser: true }]);
    this.userInput = '';

    // Mock Response Logic
    setTimeout(() => {
      let response = '';
      const lowerMsg = input.toLowerCase();
      
      // Keywords in both languages for better UX
      const regKeywords = ['register', 'registration', 'form 6', 'रजिस्टर', 'पंजीकरण', 'फॉर्म 6'];
      const idKeywords = ['id', 'card', 'epic', 'voter id', 'पहचान पत्र', 'आईडी', 'कार्ड', 'एपिक'];

      if (regKeywords.some(k => lowerMsg.includes(k))) {
        response = this.lang.t('chatbot.regResponse');
      } else if (idKeywords.some(k => lowerMsg.includes(k))) {
        response = this.lang.t('chatbot.idResponse');
      } else {
        response = this.lang.t('chatbot.defaultResponse');
      }

      this.messages.update(m => [...m, { text: response, isUser: false }]);
    }, 1000);
  }
}
