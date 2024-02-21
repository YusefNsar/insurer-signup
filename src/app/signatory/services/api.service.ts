// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://signupback.azurewebsites.net';

  constructor(private http: HttpClient) {}

  submitFormData(requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/Signatory`, requestBody);
  }
  getFormData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/Signatory`);
  }
}
