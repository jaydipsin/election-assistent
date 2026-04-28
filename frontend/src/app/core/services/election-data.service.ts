import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ElectionDataService {
  private api = inject(ApiService);
  private sessionId: string | null = null;
  
  private progressSource = new BehaviorSubject<any>({});
  progress$ = this.progressSource.asObservable();
  
  currentElectionType = signal<string | null>(localStorage.getItem('matdaan_election_type'));

  constructor() {
    this.initSession();
  }

  setElectionType(type: string) {
    this.currentElectionType.set(type);
    localStorage.setItem('matdaan_election_type', type);
  }

  private initSession() {
    this.sessionId = localStorage.getItem('matdaan_session_id');
    
    if (!this.sessionId) {
      this.sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('matdaan_session_id', this.sessionId);
    }

    // Initial fetch of progress
    this.api.getProgress(this.sessionId).subscribe({
      next: (data) => this.progressSource.next(data),
      error: (err) => console.error('Failed to load initial progress', err)
    });
  }

  updateProgress(step: string, status: boolean) {
    if (!this.sessionId) return;
    
    this.api.updateProgress(this.sessionId, step, status).subscribe({
      next: () => {
        // Optimistically update local state
        const current = this.progressSource.value;
        this.progressSource.next({ ...current, [step]: status });
      },
      error: (err) => console.error('Failed to update progress', err)
    });
  }

  getSessionId() {
    return this.sessionId;
  }
}
