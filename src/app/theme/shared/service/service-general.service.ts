import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceGeneralService {
  private authUrl = 'https://smartstockv2-cweudvaub2hxa8cf.canadacentral-01.azurewebsites.net/api/auth/log-in';
  private registarAlert = 'https://smartstockv2-cweudvaub2hxa8cf.canadacentral-01.azurewebsites.net/api/alerts/register-alert';
  private notificationsUrl = 'https://smartstockv2-cweudvaub2hxa8cf.canadacentral-01.azurewebsites.net/api/notificaciones'; // URL corregida

  constructor(private http: HttpClient) { }

  private getAuthToken(): string {
    try {
      const authData = JSON.parse(localStorage.getItem('autnResponse') || '{}');
      console.log('AuthData:', authData);

      return authData.token || authData.jwt || '';
    } catch (e) {
      console.error('Error al obtener el token:', e);
      return '';
    }
  }

  configIA(configData: any): Observable<any> {
    return this.http.post<any>(this.authUrl, configData, {
      headers: this.getHeaders()
    });
  }

  sendAlerts(notificationData: any): Observable<any> {
    // console.log('Enviando notificación:', notificationData);
    return this.http.post<any>(this.notificationsUrl, notificationData, {
      headers: this.getHeaders()
    });
  }

  registerAlert(dataAlert: any): Observable<any> {
    console.log('Enviando notificación:', dataAlert);
    return this.http.post<any>(this.registarAlert, dataAlert, {
      headers: this.getHeaders()
    });
  }


  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    // console.log('Token usado:', token ? '*****' + token.slice(-5) : 'NO TOKEN');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}