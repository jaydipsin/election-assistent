import { Injectable } from '@angular/core';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {
  constructor() {
    marked.setOptions({
      breaks: true,
      gfm: true
    });
  }

  async parse(markdown: string): Promise<string> {
    try {
      const html = await marked.parse(markdown);
      return DOMPurify.sanitize(html);
    } catch (err) {
      console.error('Markdown Parse Error:', err);
      return markdown; // Return raw markdown if parsing fails
    }
  }
}
