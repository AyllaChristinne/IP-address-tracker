import { Component, OnInit } from '@angular/core';
import { IPData, IPDataSuccess } from '../../models/ip.model';
import { IpService } from '../../services/ip.service';
import { UtcOffsetPipe } from '../../pipes/utcOffset.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [CommonModule, UtcOffsetPipe],
})
export class DashboardComponent implements OnInit {
  ipData: IPDataSuccess | null = null;
  loading: boolean = true;

  constructor(private ipService: IpService) {}

  ngOnInit(): void {
    this.ipService.ipData$.subscribe((res) => {
      if (res && res.status === 'success') this.ipData = res;
    });
    this.ipService.loading$.subscribe((isLoading) => {
      this.loading = isLoading;
    });
  }

  getFormattedLocation() {
    return `${this.ipData?.city}, ${this.ipData?.region} ${this.ipData?.zip}`;
  }
}
