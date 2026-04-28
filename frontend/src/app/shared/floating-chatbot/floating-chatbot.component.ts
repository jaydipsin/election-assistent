import { Component, inject, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { ChatbotService } from '@core/services/chatbot.service';
import { LanguageService } from '@core/services/language.service';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-floating-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './floating-chatbot.component.html',
  styleUrl: './floating-chatbot.component.scss',
  animations: [
    trigger('toggleChat', [
      transition(':enter', [
        style({ transform: 'translateY(100%) scale(0.8)', opacity: 0 }),
        animate('300ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ transform: 'translateY(0) scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(100%) scale(0.8)', opacity: 0 }))
      ])
    ])
  ]
})
export class FloatingChatbotComponent implements AfterViewChecked {
  private chatbotService = inject(ChatbotService);
  lang = inject(LanguageService);

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  isOpen = signal(false);
  isLoading = signal(false);
  userInput = signal('');
  messages = signal<Message[]>([
    { 
      text: this.lang.language() === 'hi' ? 'नमस्ते! मैं आपका मतदान सहायक हूं। मैं आपकी क्या सहायता कर सकता हूं?' : 'Hello! I am your Matdaan Assistant. How can I help you today?', 
      isUser: false, 
      timestamp: new Date() 
    }
  ]);

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.isOpen.update(v => !v);
  }

  async sendMessage() {
    const text = this.userInput().trim();
    if (!text || this.isLoading()) return;

    // Add user message
    const newMessage: Message = { text, isUser: true, timestamp: new Date() };
    this.messages.update(m => [...m, newMessage]);
    this.userInput.set('');
    this.isLoading.set(true);

    // Get AI response
    const response = await this.chatbotService.sendMessage(text, this.messages());
    
    this.messages.update(m => [...m, { 
      text: response, 
      isUser: false, 
      timestamp: new Date() 
    }]);
    this.isLoading.set(false);
  }

  private scrollToBottom() {
    if (this.scrollContainer) {
      const el = this.scrollContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }
}
