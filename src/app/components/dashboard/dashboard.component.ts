import { Component, Input, OnInit } from '@angular/core';
import { IPDataSuccess } from '../../models/ip.model';
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
  @Input({ required: true }) ipData!: IPDataSuccess;
  @Input() isLoading: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  getFormattedLocation() {
    return `${this.ipData?.city}, ${this.ipData?.region} ${this.ipData?.zip}`;
  }
}
