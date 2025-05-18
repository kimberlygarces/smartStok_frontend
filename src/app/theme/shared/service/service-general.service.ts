import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceGeneralService {

  constructor(private http: HttpClient) { }

    private apiUrl = 'https://smartstockv2-cweudvaub2hxa8cf.canadacentral-01.azurewebsites.net/api/auth/log-in'


    
  configIA(configIA:any): Observable<any[]> {
    console.log('Configuración IA:', configIA);
    
    return this.http.post<any[]>(this.apiUrl, configIA);
  }
}


