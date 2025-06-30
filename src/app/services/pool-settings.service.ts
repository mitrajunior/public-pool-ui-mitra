import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PoolSettingsService {
  constructor(private http: HttpClient) {}

  getSettings(): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/settings`);
  }

  updateSettings(data: { feeAddress?: string; feePercent?: number }): Observable<any> {
    return this.http.put(`${environment.API_URL}/api/settings`, data);
  }
}
