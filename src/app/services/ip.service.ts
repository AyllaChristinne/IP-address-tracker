import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPData } from '../models/ip.model';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  constructor(private http: HttpClient) {}

  getClientIp(): Observable<{ ip: string }> {
    return this.http.get<{ ip: string }>(environment.getClientIpUrl);
  }

  fetchIp(ip: string): Observable<IPData> {
    return this.http.get<IPData>(`${environment.getIpDataUrl}${ip}`);
  }
}
