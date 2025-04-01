import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent implements OnChanges, OnInit {
  @Input() isOpen = false;
  @Input() selectedService: string = '';
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmBooking = new EventEmitter<{firstName: string, lastName: string, email: string, phoneNumber: string, availability:  { date: string, time: string }}>();
  selectedImage = '';
  
  availableSlots: any[] = [];

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  availability: string = '';
  
  selectedSlot: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAvailableSlots();
  }

  loadAvailableSlots() {
    this.http.get('http://127.0.0.1:8000/availabilities/').subscribe(
      (response: any) => {
        this.availableSlots = response.filter((slot: any) => !slot.is_booked);
        console.log('Filtered slots:', this.availableSlots);
      },
      (error) => {
        console.error('Error loading available slots:', error);
      }
    );
  }

  submitted = false;

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
        this.selectedImage = '/assets/image/home-brewing-booking2.jpg';
        break;
      default:
        this.selectedImage = '';
    }
  }

  onAvailabilityChange(event: any) {
    const selectedId = event.target.value;
    this.selectedSlot = this.availableSlots.find(slot => slot.id.toString() === selectedId);
  }

  submitBooking() {
    let serviceValue = '';
    switch(this.selectedService) {
        case 'Latte Art Workshop':
            serviceValue = 'latte_art';
            break;
        case 'Espresso Mastery':
            serviceValue = 'espresso_mastery';
            break;
        case 'Home Brewing':
            serviceValue = 'home_brewing';
            break;
        default:
            serviceValue = '';
    }

    const bookingData = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      phone: this.phoneNumber,
      availability: parseInt(this.availability),
      service: serviceValue,
    };

    console.log('Sending booking data:', bookingData);

    this.http.post('http://127.0.0.1:8000/bookings/',bookingData).subscribe(
      response => {
        console.log('Booking confirmed and email sent!');
        // Refresh available slots after successful booking
        this.loadAvailableSlots();
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phoneNumber = '';
        this.availability = '';
        this.selectedService = '';
        this.submitted = false;
        this.closeModal.emit();
      },
      error => {
        console.error('Error confirming booking:', error);
      }
    )
  }

  onConfirm(bookingForm: any) {
    this.submitted = true;

    if (bookingForm.invalid) {
      return;
    }
    if (!this.selectedSlot) { 
      console.error('No slot selected');
      return;
    }

    // First emit the booking details for the confirmation modal
    this.confirmBooking.emit({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      availability: {
        date: this.selectedSlot.date,
        time: this.selectedSlot.time
      }
    });

    // Then submit the booking with the ID
    this.submitBooking();
    
    // Reset the form
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phoneNumber = '';
    this.availability = '';
    this.selectedService = '';
    this.selectedSlot = null;

    bookingForm.resetForm();
    this.submitted = false;
    this.closeModal.emit();
  }
}
