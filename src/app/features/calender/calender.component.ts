import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventoCalendario, Parcela } from '../../core/models/calender.model';

interface CalendarDay {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: EventoCalendario[];
}

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss'
})
export class CalenderComponent {

  eventos: EventoCalendario[] = [
    {
      id: '1',
      usuarioId: '1',
      parcelaId: '1',
      siembraId: null,
      titulo: 'Maíz',
      tipo: 'Cosecha',
      fechaInicio: '2026-04-10',
      fechaFin: '2026-04-12',
      color: '#f59e0b',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      usuarioId: '1',
      parcelaId: '1',
      siembraId: null,
      titulo: 'Papa',
      tipo: 'Siembra',
      fechaInicio: '2026-04-15',
      fechaFin: null,
      color: '#22c55e',
      createdAt: new Date().toISOString()
    }
  ];

  parcelas: Parcela[] = [
    { id: '1', nombre: 'Parcela Norte A' },
    { id: '2', nombre: 'Parcela Sur B' }
  ];

  currentMonth = 3;
  currentYear = 2026;
  calendarDays: CalendarDay[] = [];

  dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  stats: { label: string; value: number; fontColor: string }[] = [];


  showAddModal = false;

  newEvento: Partial<EventoCalendario> = {
    titulo: '',
    tipo: 'Siembra',
    parcelaId: '',
    fechaInicio: '',
    color: '#22c55e'
  };

  tiposEvento = [
    { value: 'Siembra', label: 'Siembra', color: '#22c55e', icon: 'fa-solid fa-seedling' },
    { value: 'Cosecha', label: 'Cosecha', color: '#f59e0b', icon: 'fa-solid fa-wheat-awn' }
  ];

  selectedDate: Date = new Date();

  constructor() {
    this.generateCalendar();
    this.updateStats();
  }

  get monthName(): string {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[this.currentMonth];
  }

  generateCalendar(): void {
    this.calendarDays = [];

    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

    const today = new Date();

    for (let i = firstDay - 1; i >= 0; i--) {
      const date = daysInPrevMonth - i;
      const month = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
      const year = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;

      this.calendarDays.push({
        date,
        month,
        year,
        isCurrentMonth: false,
        isToday: false,
        events: this.getEventsForDate(year, month, date)
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        i === today.getDate() &&
        this.currentMonth === today.getMonth() &&
        this.currentYear === today.getFullYear();

      this.calendarDays.push({
        date: i,
        month: this.currentMonth,
        year: this.currentYear,
        isCurrentMonth: true,
        isToday,
        events: this.getEventsForDate(this.currentYear, this.currentMonth, i)
      });
    }

    const remaining = 42 - this.calendarDays.length;

    for (let i = 1; i <= remaining; i++) {
      const month = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
      const year = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;

      this.calendarDays.push({
        date: i,
        month,
        year,
        isCurrentMonth: false,
        isToday: false,
        events: this.getEventsForDate(year, month, i)
      });
    }
  }

  getEventsForDate(year: number, month: number, day: number): EventoCalendario[] {
    return this.eventos.filter(e => {
      const d = new Date(e.fechaInicio);
      return d.getFullYear() === year &&
        d.getMonth() === month &&
        d.getDate() === day;
    });
  }

  prevMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
    this.updateStats();
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
    this.updateStats();
  }

  // ---------------- STATS ----------------
  updateStats() {
    this.stats = [
      { label: 'Eventos este mes', value: this.eventos.length, fontColor: '#1a3a3a' },
      { label: 'Siembras', value: this.countByType('Siembra'), fontColor: '#22c55e' },
      { label: 'Cosechas', value: this.countByType('Cosecha'), fontColor: '#f59e0b' },
      { label: 'Próximos', value: this.getUpcomingEvents().length, fontColor: '#3b82f6' }
    ];
  }

  countByType(tipo: string): number {
    return this.eventos.filter(e => e.tipo === tipo).length;
  }

  isDaySelected(day: CalendarDay): boolean {
    return this.selectedDate.getDate() === day.date &&
      this.selectedDate.getMonth() === day.month &&
      this.selectedDate.getFullYear() === day.year;
  }

  seleccionarDia(day: CalendarDay) {
    this.selectedDate = new Date(day.year, day.month, day.date);
  }

  getEventIcon(tipo: string): string {
    const icons: any = {
      'Siembra': 'fa-solid fa-seedling',
      'Cosecha': 'fa-solid fa-wheat-awn'
    };
    return icons[tipo] || 'fa-solid fa-calendar-day';
  }

  getShortTitle(title: string): string {
    return title;
  }

  getUpcomingEvents(): EventoCalendario[] {
    const now = new Date();
    return this.eventos.filter(e => new Date(e.fechaInicio) >= now);
  }

  getParcelaName(event: EventoCalendario): string {
    const p = this.parcelas.find(p => p.id === event.parcelaId);
    return p ? p.nombre : 'Parcela';
  }

  isToday(dateStr: string): boolean {
    const d = new Date(dateStr);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('es-PE');
  }

  // ---------------- MODAL ADD ----------------
  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  onTipoChange() {
    const tipo = this.tiposEvento.find(t => t.value === this.newEvento.tipo);
    if (tipo) this.newEvento.color = tipo.color;
  }

  guardarEvento() {
    if (!this.newEvento.titulo || !this.newEvento.fechaInicio) return;

    const evento: EventoCalendario = {
      id: Math.random().toString(),
      usuarioId: '1',
      parcelaId: this.newEvento.parcelaId || '1',
      siembraId: null,
      titulo: this.newEvento.titulo,
      tipo: this.newEvento.tipo || 'Siembra',
      fechaInicio: this.newEvento.fechaInicio,
      fechaFin: null,
      color: this.newEvento.color || '#22c55e',
      createdAt: new Date().toISOString()
    };

    this.eventos.push(evento);
    this.generateCalendar();
    this.updateStats();
    this.closeAddModal();
  }
}