import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactFormModalComponent } from '../modals/contact-form-modal/contact-form-modal.component';

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
  
  onpenContactFormModal(){
    this.isContactFormModalOpen = true;
  }

  handleContactFormSubmission(form: NgForm, firstName: string, lastName: string, email: string, phoneNumber: string, message: string){
    this.submitted = true;
    if(form.invalid){
      return;
    }
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
