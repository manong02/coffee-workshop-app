import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactFormModalComponent } from '../modals/contact-form-modal/contact-form-modal.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule, ContactFormModalComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  @Output() contactSubmitted = new EventEmitter<{firstName: string, lastName: string, email: string, phoneNumber: string, message: string}>();
  isContactFormModalOpen = false;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  message: string = '';
  submitted = false;

  constructor(private http: HttpClient) {}
  
  onpenContactFormModal(){
    this.isContactFormModalOpen = true;
  }

  handleContactFormSubmission(form: NgForm, firstName: string, lastName: string, email: string, phoneNumber: string, message: string){
    this.submitted = true;
    if(form.invalid){
      return;
    }

    const contactData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      message: this.message
    };

    this.http.post('http://127.0.0.1:8000/notifications/contact/', contactData).subscribe(
      (response) => {
        console.log('Contact form submitted successfully:', response);
      },
      (error) => {
        console.error('Error submitting contact form:', error);
      }
    );

    this.isContactFormModalOpen = true;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.message = message;
    this.contactSubmitted.emit({firstName, lastName, email, phoneNumber, message});
    form.reset();
    this.submitted = false;
  }

}
