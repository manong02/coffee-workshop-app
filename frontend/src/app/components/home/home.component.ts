import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../service-card/service-card.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  services = [
    {
      title: 'Espresso Masterclass',
      description: 'Learn the art of making perfect espresso',
      image: 'assets/images/espresso-card.jpg'
    },
    {
      title: 'Latte Art Workshop',
      description: 'Create beautiful latte art designs',
      image: 'assets/images/latte-art-card.jpg'
    },
    {
      title: 'Home Brewing Techniques',
      description: 'Master coffee brewing at home',
      image: 'assets/images/home-brewing-card.jpg'
    }
  ];
}
