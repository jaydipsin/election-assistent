import { Injectable } from '@angular/core';
import { marked } from 'marked';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {
  constructor() {
    // Configure marked options if needed
    marked.setOptions({
      breaks: true,
      gfm: true
    });
  }

  async parse(markdown: string): Promise<string> {
    return marked.parse(markdown);
  }
}
