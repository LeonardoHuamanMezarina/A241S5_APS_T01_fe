import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;

  stats = [
    {
      label: 'Cultivos Activos',
      value: 24,
      badge: '+12%',
      badgeClass: 'badge-green',
      iconClass: 'fa-solid fa-arrow-trend-up',
      iconBg: 'icon-green'
    },
    {
      label: 'Parcelas en Uso',
      value: 18,
      badge: '+5%',
      badgeClass: 'badge-green',
      iconClass: 'fa-solid fa-location-dot',
      iconBg: 'icon-blue'
    },
    {
      label: 'Próximas Cosechas',
      value: 7,
      badge: 'Esta semana',
      badgeClass: 'badge-gray',
      iconClass: 'fa-regular fa-calendar',
      iconBg: 'icon-yellow'
    },
    {
      label: 'Alertas',
      value: 3,
      badge: 'Requieren atención',
      badgeClass: 'badge-red',
      iconClass: 'fa-solid fa-triangle-exclamation',
      iconBg: 'icon-red'
    }
  ];

  activities = [
    { title: 'Siembra completada', subtitle: 'Parcela Norte - Trigo', time: 'Hace 2 horas', dotClass: 'dot-green' },
    { title: 'Riego programado', subtitle: 'Parcela Sur - Maíz', time: 'Hace 4 horas', dotClass: 'dot-blue' },
    { title: 'Cosecha iniciada', subtitle: 'Parcela Este - Arroz', time: 'Hace 1 día', dotClass: 'dot-yellow' },
    { title: 'Fertilización aplicada', subtitle: 'Parcela Oeste - Tomate', time: 'Hace 2 días', dotClass: 'dot-green' }
  ];

  ngAfterViewInit(): void {
    this.buildLineChart();
    this.buildPieChart();
  }

  private buildLineChart(): void {
    const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
    new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Trigo',
            data: [45, 52, 60, 65, 72, 80],
            borderColor: '#22c55e',
            backgroundColor: 'transparent',
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#22c55e'
          },
          {
            label: 'Maíz',
            data: [30, 35, 42, 50, 58, 68],
            borderColor: '#eab308',
            backgroundColor: 'transparent',
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#eab308'
          },
          {
            label: 'Arroz',
            data: [25, 28, 38, 45, 55, 70],
            borderColor: '#92400e',
            backgroundColor: 'transparent',
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#92400e'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            min: 0,
            max: 100,
            ticks: { stepSize: 25, color: '#9ca3af' },
            grid: { color: '#f3f4f6' },
            border: { display: false }
          },
          x: {
            ticks: { color: '#9ca3af' },
            grid: { display: false },
            border: { display: false }
          }
        }
      }
    });
  }

  private buildPieChart(): void {
    new Chart(this.pieChartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Trigo', 'Maíz', 'Arroz', 'Tomate', 'Otros'],
        datasets: [{
          data: [35, 25, 20, 12, 8],
          backgroundColor: ['#22c55e', '#eab308', '#dc2626', '#6b7280', '#92400e'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });
  }
}
