import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://smartstockv2-cweudvaub2hxa8cf.canadacentral-01.azurewebsites.net/api/auth/log-in';

  login(usuario: {email: string; password: string}): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl, usuario);
  }
}
