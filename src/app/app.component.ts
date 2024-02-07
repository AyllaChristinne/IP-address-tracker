import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IPData } from './models/ip.model';
import { MapComponent } from './components/map/map.component';
import { IpService } from './services/ip.service';
import { InputComponent } from './components/input/input.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    MapComponent,
    InputComponent,
    DashboardComponent,
  ],
  providers: [IpService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ip-address-tracker';

  constructor(private ipService: IpService) {}

  ngOnInit() {
    this.initApp();
  }

  private initApp() {
    this.ipService.fetchIp();
  }
}
