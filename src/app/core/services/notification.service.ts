import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Lista global de notificaciones
  lista = [
    {
      tipoLabel: 'CLIMA',
      detalle: 'Alerta Meteorológica: Lluvia Intensa Pronosticada para las próximas 24 horas. Revisar drenaje en todas las parcelas.',
      fecha: 'Hace 3 min',
      leido: false,
      timer: null as any
    },
    {
      tipoLabel: 'COSECHA',
      detalle: 'La siembra de Tomate (Parcela 01) ha llegado a la fecha acordada para recogerla.',
      fecha: 'Hace 2 horas',
      leido: false,
      timer: null as any
    },
    {
      tipoLabel: 'SISTEMA',
      detalle: 'Catálogo de Cultivos Actualizado, nueva información de agua y suelo para Papas añadida.',
      fecha: 'Ayer, 10:00 AM',
      leido: true,
      timer: null as any
    }
  ];

  get totalNuevas(): number {
    return this.lista.filter(n => !n.leido).length;
  }

  // Método para marcar como leído
  marcarComoLeida(index: number) {
    if (this.lista[index]) {
      this.lista[index].leido = true;
    }
  }
}