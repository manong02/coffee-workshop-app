import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieComponent } from 'ngx-lottie';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Input() isConfirmationModalOpen = false;
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() email: string = '';
  @Input() phoneNumber: string = '';
  @Input() availability: {date: string, time: string} = {date: '', time: ''};
  @Output() closeConfirmationModal = new EventEmitter<void>();

  options: AnimationOptions = {
    path: '/assets/animations/confettijson.json',
    autoplay: true,
    loop: false
  };
}
