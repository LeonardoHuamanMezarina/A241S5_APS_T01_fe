import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {

  listaNotificaciones: any[] = [];

  constructor(public notificationService: NotificationService) {}

  ngOnInit(): void {
    // Sincronizamos con la lista global del servicio
    this.listaNotificaciones = this.notificationService.lista;
  }

  // Método simple para marcar como leída al hacer clic
  marcarLeida(index: number): void {
    this.notificationService.marcarComoLeida(index);
  }
}