import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPData } from '../models/ip.model';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  private ipData = new BehaviorSubject<IPData | null>(null);
  ipData$ = this.ipData.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();
  private errorSubject = new BehaviorSubject<boolean>(false);
  error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchIp();
  }

  fetchIp(ip?: string) {
    this.http
      .get<IPData>(
        `${environment.getIpDataUrl}${
          ip ? ip : ''
        }?fields=query,city,offset,isp,lat,lon,zip,region,status`
      )
      .subscribe((res) => {
        if (res.status === 'success') {
          this.ipData.next(res);
          console.log(res);
          this.errorSubject.next(false);
        } else {
          this.errorSubject.next(true);
        }
        this.loadingSubject.next(false);
      });
  }

  getCurrData() {
    return this.ipData.value;
  }
}
