import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Coordinates, IPData, IPDataSuccess } from './models/ip.model';
import { MapComponent } from './components/map/map.component';
import { IpService } from './services/ip.service';
import { InputComponent } from './components/input/input.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  data!: IPData;
  coordinates!: Coordinates;
  isError: boolean = false;
  isLoading: boolean = true;

  constructor(private ipService: IpService) {}

  get dataSuccess(): IPDataSuccess {
    return this.data as IPDataSuccess;
  }

  ngOnInit() {
    this.initApp();
  }

  private initApp() {
    this.ipService.fetchIp().subscribe((res: IPData) => {
      if (!res.error) {
        this.data = res;
        this.coordinates = {
          lat: this.data.latitude,
          lon: this.data.longitude,
        };
        this.isError = false;
      } else {
        this.isError = true;
      }
      this.isLoading = false;
    });
  }

  fetchIp(ip: string) {
    this.ipService.fetchIp(ip).subscribe((res: IPData) => {
      if (!res.error) {
        this.data = res;
        this.coordinates = {
          lat: this.data.latitude,
          lon: this.data.longitude,
        };
        this.isError = false;
      } else {
        this.isError = true;
      }
      this.isLoading = false;
    });
  }
}
