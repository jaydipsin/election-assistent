import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatbotComponent } from './chatbot.component';
import { LanguageService } from '@core/services/language.service';
import { ChatbotService } from '@core/services/chatbot.service';
import { MarkdownService } from '@core/services/markdown.service';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { beforeEach } from 'node:test';

describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;
  let mockLanguageService: any;
  let mockChatbotService: any;
  let mockMarkdownService: any;

  beforeEach(async () => {
    mockLanguageService = {
      language: signal('en')
    };
    mockChatbotService = {
      sendMessage: jasmine.createSpy('sendMessage').and.resolveTo('Response from AI')
    };
    mockMarkdownService = {
      parse: jasmine.createSpy('parse').and.resolveTo('<p>Response from AI</p>')
    };

    await TestBed.configureTestingModule({
      imports: [ChatbotComponent],
      providers: [
        provideRouter([]),
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: ChatbotService, useValue: mockChatbotService },
        { provide: MarkdownService, useValue: mockMarkdownService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add user message and get response on sendMessage', async () => {
    component.userInput = 'Test message';
    await component.sendMessage();

    expect(component.messages().length).toBe(3); // Initial + User + AI
    expect(component.messages()[1].text).toBe('Test message');
    expect(component.messages()[2].text).toBe('Response from AI');
    expect(mockChatbotService.sendMessage).toHaveBeenCalledWith('Test message', jasmine.any(Array));
  });

  it('should not send empty message', async () => {
    component.userInput = '   ';
    await component.sendMessage();

    expect(mockChatbotService.sendMessage).not.toHaveBeenCalled();
  });
});
function expect(component: ChatbotComponent) {
  throw new Error('Function not implemented.');
}

