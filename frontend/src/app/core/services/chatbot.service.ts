import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private api = inject(ApiService);

  async sendMessage(prompt: string, history: any[] = []) {
    try {
      // Convert history to format expected by backend if needed, 
      // but here we just pass it through
      const response = await firstValueFrom(this.api.sendMessage(prompt, history));
      return response.text;
    } catch (error) {
      console.error('Chat API Error:', error);
      return "I'm having trouble connecting right now. Please try again or check the Voting Guide.";
    }
  }
}
