import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/auth/log-in'

  login(usuario: {username: string; password: string}): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl, usuario);
  }
}
