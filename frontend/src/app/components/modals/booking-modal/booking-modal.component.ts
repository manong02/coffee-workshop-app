import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() selectedService: string = '';
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmBooking = new EventEmitter<{firstName: string, lastName: string, email: string, phoneNumber: string, availability: string}>();
  selectedImage = '';
  
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  availability: string = '';

  serviceOptions = [
    { name: 'Latte Art Workshop', display: 'Latte Art Workshop ($50)' },
    { name: 'Espresso Mastery', display: 'Espresso Mastery ($80)' },
    { name: 'Home Brewing', display: 'Home Brewing ($150)' }
  ];

  ngOnChanges() {
    this.updateImage();
  }

  updateImage() {
    switch (this.selectedService) {
      case 'Latte Art Workshop':
        this.selectedImage = '/assets/image/latte-art-booking.jpg';
        break;
      case 'Espresso Mastery':
        this.selectedImage = '/assets/image/espresso-booking.jpg';
        break;
      case 'Home Brewing':
        this.selectedImage = '/assets/image/home-brewing-booking.jpg';
        break;
      default:
        this.selectedImage = '';
    }
  }

  onConfirm() {
    this.confirmBooking.emit({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      availability: this.availability
    });
    this.closeModal.emit();
  }
}
