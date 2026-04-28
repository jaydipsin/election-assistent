import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.backendUrl || 'http://localhost:5000/api';

  // Election Configuration
  getElectionConfig(type: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/election/config/${type}`);
  }

  // Progress Endpoints
  getProgress(sessionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/progress/${sessionId}`);
  }

  updateProgress(sessionId: string, stepId: string, status: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/progress/${sessionId}`, { stepId, status });
  }

  // Chat Endpoint
  sendMessage(message: string, history: any[], electionType?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/chat`, { message, history, electionType });
  }
}
