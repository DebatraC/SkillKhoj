import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

export interface StudentProfile {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private baseUrl = `${environment.apiUrl}/student`; // Use environment configuration

  getStudentProfile(userId: string): Observable<StudentProfile> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get<StudentProfile>(`${this.baseUrl}/${userId}/profile`, { headers });
  }

  updateStudentProfile(userId: string, profileData: Partial<StudentProfile>): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    
    // Fixed URL to match backend pattern
    return this.http.put(`${this.baseUrl}/${userId}/profile`, profileData, { headers });
  }
}
