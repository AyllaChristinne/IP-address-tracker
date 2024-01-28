import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from './../environments/environment';
import { IPData } from '../models/ip.model';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ip-address-tracker';
  isFetching: boolean = false;
  clientIp: string = '';
  ipData: IPData | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.isFetching = true;
    this.getClientIp();
    this.fetchIp(this.clientIp);
    this.isFetching = false;
  }

  private getClientIp() {
    this.http
      .get<{ ip: string }>(environment.getClientIpUrl)
      .subscribe((res) => {
        this.clientIp = res.ip;
      });
  }

  private fetchIp(ip: string) {
    this.http
      .get<IPData>(`${environment.getIpDataUrl}${ip}`)
      .subscribe((res) => {
        this.ipData = res;
      });
  }
}
