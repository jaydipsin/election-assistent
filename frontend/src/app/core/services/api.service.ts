import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.backendUrl;

  // Election Configuration
  getElectionConfig(type: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/election/config/${type}`);
  }

  // Chat Endpoint
  sendMessage(message: string, history: any[], electionType?: string): Observable<any> {
    console.log(this.apiUrl);
    return this.http.post(`${this.apiUrl}/chat`, { message, history, electionType });
  }
}
