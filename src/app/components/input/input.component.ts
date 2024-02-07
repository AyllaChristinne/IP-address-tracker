import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IpService } from '../../services/ip.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit, OnDestroy {
  query: string = '';
  error = false;
  errorSubscription: Subscription = new Subscription();
  loading = true;
  loadingSubscription: Subscription = new Subscription();

  constructor(private ipService: IpService) {}

  ngOnInit(): void {
    this.errorSubscription = this.ipService.error$.subscribe((error) => {
      this.error = error;
    });
    this.loadingSubscription = this.ipService.loading$.subscribe(
      (isLoading) => {
        this.loading = isLoading;
      }
    );
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

  fetchIp() {
    if (this.query.length >= 2) {
      this.ipService.fetchIp(this.query);
    } else {
      this.error = true;
    }
  }

  resetError() {
    if (this.error) this.error = false;
  }
}
