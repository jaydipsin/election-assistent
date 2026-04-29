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

    // Initial fetch of progress from LocalStorage
    const savedProgress = localStorage.getItem('matdaan_progress');
    if (savedProgress) {
      this.progressSource.next(JSON.parse(savedProgress));
    }
  }

  updateProgress(step: string, status: boolean) {
    const current = this.progressSource.value;
    const newProgress = { ...current, [step]: status };
    
    this.progressSource.next(newProgress);
    localStorage.setItem('matdaan_progress', JSON.stringify(newProgress));
  }

  getSessionId() {
    return this.sessionId;
  }
}
