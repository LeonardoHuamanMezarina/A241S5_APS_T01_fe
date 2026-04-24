import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  avatarText: string;
  phone: string;
  role: 'Agricultor' | 'Administrador';
  isActive: boolean;
  registrationDate: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: User[] = [
    {
      id: 1,
      name: 'Carlos Quispe Mamani',
      email: 'carlos.quispe@agrogest.pe',
      avatarText: 'Carlos',
      phone: '987654321',
      role: 'Agricultor',
      isActive: true,
      registrationDate: '10 ene. 2025'
    },
    {
      id: 2,
      name: 'Rosa Flores Huamán',
      email: 'rosa.flores@agrogest.pe',
      avatarText: 'Rosa',
      phone: '976543210',
      role: 'Agricultor',
      isActive: true,
      registrationDate: '05 feb. 2025'
    },
    {
      id: 3,
      name: 'Jorge Medina Torres',
      email: 'jorge.medina@agrogest.pe',
      avatarText: 'Jorge',
      phone: '965432109',
      role: 'Administrador',
      isActive: true,
      registrationDate: '01 ene. 2025'
    }
  ];

  toggleStatus(user: User): void {
    user.isActive = !user.isActive;
  }
}
