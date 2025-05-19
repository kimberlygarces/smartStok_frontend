import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceGeneralService {
  private apiUrl = 'https://smartstockv2-cweudvaub2hxa8cf.canadacentral-01.azurewebsites.net/api/auth/log-in';

  constructor(private http: HttpClient) { }

  private getAuthToken(): string {
    try {
      // Obtener el token del localStorage - nota el nombre exacto 'autnResponse'
      const authData = JSON.parse(localStorage.getItem('autnResponse') || '{}');
      return authData.token || authData.jwt || ''; // Intenta con ambos nombres por si acaso
    } catch (e) {
      console.error('Error al obtener el token:', e);
      return '';
    }
  }

  configIA(configData: any): Observable<any> {
    const token = this.getAuthToken();
    
    // Crear headers con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    console.log('Enviando configuración IA con token:', token ? '*****' + token.slice(-5) : 'NO TOKEN');

    return this.http.post<any>(this.apiUrl, configData, { headers });
  }
}