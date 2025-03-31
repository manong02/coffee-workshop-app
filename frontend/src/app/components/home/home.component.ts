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
      title: 'Latte Art Workshop',
      price: 50,
      description: "Transform your coffee into a masterpiece! In this hands-on workshop, you'll learn the techniques behind steaming silky microfoam and pouring beautiful latte art, from simple hearts to intricate rosettas. Whether you're a beginner or looking to refine your skills, our expert baristas will guide you through each step to help you create café-worthy designs.",
      image: 'assets/image/latte-art-card.jpg'
    },
    {
      title: 'Espresso Mastery',
      price: 80,
      description: "Master the foundation of every great coffee drink—espresso. This workshop will take you through the essentials of dialing in the perfect shot, understanding extraction, adjusting grind size, and achieving a balanced flavor profile. Whether you're an aspiring barista or a coffee lover eager to learn, this session will elevate your appreciation for the art of espresso making.",
      image: 'assets/image/espresso-card.jpg'
    },
    {
      title: 'Home Brewing',
      price: 150,
      description: "Bring the coffee shop experience to your home! This workshop explores various brewing methods like pour-over, French press, and AeroPress, helping you understand how grind size, water temperature, and brewing time affect flavor. Learn expert tips and tricks to craft a perfect cup, ensuring that every morning starts with barista-quality coffee—right from your own kitchen.",
      image: 'assets/image/home-brewing-card.jpg'
    }
  ];
}
