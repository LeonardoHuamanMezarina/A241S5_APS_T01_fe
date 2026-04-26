import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {

  listaNotificaciones = [
    {
      tipo: 'critica',
      tipoLabel: 'Clima',
      detalle: 'Alerta Meteorológica: Lluvia Intensa Pronosticada para las próximas 24 horas. Revisar drenaje en todas las parcelas.',
      ubicacion: 'Todas las Parcelas',
      fecha: 'Hace 5 min',
      leido: false,
      timer: null as any
    },
    {
      tipo: 'advertencia',
      tipoLabel: 'Cosecha',
      detalle: 'La siembra de Tomate (Parcela 01) ha llegado a la fecha acordada para recogerla.',
      ubicacion: 'Parcela 01',
      fecha: 'Ayer, 03:00 PM',
      leido: true,
      timer: null as any
    },
    {
      tipo: 'info',
      tipoLabel: 'Sistema',
      detalle: 'Catálogo de Cultivos Actualizado, nueva información de agua y suelo para Papas añadida.',
      ubicacion: 'General',
      fecha: '18 May, 10:00 AM',
      leido: true,
      timer: null as any
    }
  ];

  iniciarAutoVisto(index: number): void {
    if (!this.listaNotificaciones[index].leido) {
      this.listaNotificaciones[index].timer = setTimeout(() => {
        this.listaNotificaciones[index].leido = true;
      }, 1500);
    }
  }

  cancelarAutoVisto(index: number): void {
    if (this.listaNotificaciones[index].timer) {
      clearTimeout(this.listaNotificaciones[index].timer);
    }
  }

  eliminarNotificacion(index: number): void {
    this.listaNotificaciones.splice(index, 1);
  }
}