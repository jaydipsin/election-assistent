import { Component, inject, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '@core/services/language.service';
import { ChatbotService } from '@core/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent implements AfterViewChecked {
  lang = inject(LanguageService);
  private chatbotService = inject(ChatbotService);
  
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  messages = signal<{ text: string, isUser: boolean }[]>([
    { text: this.lang.t('chatbot.greeting'), isUser: false }
  ]);

  userInput = '';
  isLoading = signal(false);

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  async sendMessage() {
    const input = this.userInput.trim();
    if (!input || this.isLoading()) return;

    this.messages.update(m => [...m, { text: input, isUser: true }]);
    this.userInput = '';
    this.isLoading.set(true);

    const response = await this.chatbotService.sendMessage(input, this.messages());
    
    this.messages.update(m => [...m, { text: response, isUser: false }]);
    this.isLoading.set(false);
  }
}
