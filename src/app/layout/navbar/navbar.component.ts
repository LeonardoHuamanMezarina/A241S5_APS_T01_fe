import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  menuAbierto = false;

  constructor(public notificationService: NotificationService) {}

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
}