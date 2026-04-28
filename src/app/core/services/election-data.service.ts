import { Injectable, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, update, Database } from 'firebase/database';
import { environment } from '@env/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElectionDataService {
  private db!: Database;
  private sessionId: string | null = null;
  
  private progressSource = new BehaviorSubject<any>({});
  progress$ = this.progressSource.asObservable();

  constructor() {
    this.initFirebase();
    this.initSession();
  }

  private initFirebase() {
    const app = initializeApp(environment.firebase);
    this.db = getDatabase(app);
  }

  private initSession() {
    this.sessionId = localStorage.getItem('matdaan_session_id');
    
    if (!this.sessionId) {
      this.sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('matdaan_session_id', this.sessionId);
      
      // Initialize node in Firebase
      set(ref(this.db, `sessions/${this.sessionId}`), {
        createdAt: new Date().toISOString(),
        progress: {
          started: true
        }
      });
    }

    // Listen for progress updates
    const progressRef = ref(this.db, `sessions/${this.sessionId}/progress`);
    onValue(progressRef, (snapshot) => {
      const data = snapshot.val();
      this.progressSource.next(data || {});
    });
  }

  async updateProgress(step: string, status: boolean) {
    if (!this.sessionId) return;
    
    const progressRef = ref(this.db, `sessions/${this.sessionId}/progress`);
    await update(progressRef, {
      [step]: status,
      lastUpdated: new Date().toISOString()
    });
  }

  getSessionId() {
    return this.sessionId;
  }
}
