import { Component, inject, signal, ViewChild, ElementRef, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '@core/services/language.service';
import { ChatbotService } from '@core/services/chatbot.service';
import { MarkdownService } from '@core/services/markdown.service';
import { SafeHtmlPipe } from '@shared/pipes/safe-html.pipe';

interface ChatMessage {
  text: string;
  formattedText?: string;
  isUser: boolean;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [RouterLink, FormsModule, SafeHtmlPipe],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatbotComponent implements AfterViewChecked {
  lang = inject(LanguageService);
  private chatbotService = inject(ChatbotService);
  private markdownService = inject(MarkdownService);
  
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  messages = signal<ChatMessage[]>([
    { 
      text: this.lang.language() === 'en' 
        ? "Hello! I'm your Matdaan Assistant, powered by Google Gemini. How can I help you today?" 
        : "नमस्ते! मैं आपका मतदान सहायक हूँ, जो Google Gemini द्वारा संचालित है। मैं आज आपकी क्या मदद कर सकता हूँ?", 
      isUser: false 
    }
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

    try {
      this.messages.update(m => [...m, { text: input, isUser: true }]);
      this.userInput = '';
      this.isLoading.set(true);

      const response = await this.chatbotService.sendMessage(input, this.messages());
      
      // Parse markdown
      const formatted = await this.markdownService.parse(response);

      this.messages.update(m => [...m, { 
        text: response, 
        formattedText: formatted,
        isUser: false 
      }]);
    } catch (error) {
      console.error('Chat Error:', error);
      this.messages.update(m => [...m, { 
        text: "Sorry, I encountered an error. Please try again.", 
        isUser: false 
      }]);
    } finally {
      this.isLoading.set(false);
    }
  }
}
