import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieComponent } from 'ngx-lottie';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-contact-form-modal',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  templateUrl: './contact-form-modal.component.html',
  styleUrl: './contact-form-modal.component.css'
})
export class ContactFormModalComponent {
  @Input() isContactFormModalOpen = false;
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() email: string = '';
  @Input() phoneNumber: string = '';
  @Output() closeContactFormModal = new EventEmitter<void>();

  options: AnimationOptions = {
    path: '/assets/animations/confettijson.json',
    autoplay: true,
    loop: false
  };

  message: string = '';
  submitted = false;

  closeModal() {
    this.closeContactFormModal.emit();
  }
}



