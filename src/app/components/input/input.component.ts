import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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
export class InputComponent implements OnInit {
  @Input() isError: boolean = false;
  @Input() isLoading: boolean = true;
  @Output() queryEmitter: EventEmitter<string> = new EventEmitter();
  query: string = '';

  constructor() {}

  ngOnInit(): void {}

  fetchIp() {
    if (this.query.length >= 2) {
      this.queryEmitter.emit(this.query);
    }
  }

  resetError() {
    if (this.isError) this.isError = false;
  }
}
