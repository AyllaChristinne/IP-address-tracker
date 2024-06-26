import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPData } from '../models/ip.model';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  private ipData = new BehaviorSubject<IPData | null>(null);
  ipData$ = this.ipData.asObservable();
  urlFieldsParam = [
    'query',
    'city',
    'offset',
    'isp',
    'lat',
    'lon',
    'zip',
    'region',
    'status',
  ];

  constructor(private http: HttpClient) {}

  fetchIp(ip: string = '') {
    return this.http.get<IPData>(
      `${environment.getIpDataUrl}${ip ? ip + '/' : ''}json`
    );
  }
}
