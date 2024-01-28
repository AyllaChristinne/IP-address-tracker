import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IPData } from './models/ip.model';
import { MapComponent } from './components/map/map.component';
import { IpService } from './services/ip.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, MapComponent],
  providers: [IpService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ip-address-tracker';
  isFetching: boolean = false;
  clientIp: { ip: string } = { ip: '' };
  ipData: IPData | null = null;

  constructor(private ipService: IpService) {}

  ngOnInit() {
    this.isFetching = true;
    this.initApp();
    this.isFetching = false;
  }

  private initApp() {
    this.getClientIp();
    this.getIpData(this.clientIp.ip);
  }

  private getClientIp() {
    this.ipService.getClientIp().subscribe((res) => {
      this.clientIp = res;
    });
  }

  private getIpData(ip: string) {
    this.ipService.fetchIp(ip).subscribe((res) => {
      this.ipData = res;
    });
  }
}
