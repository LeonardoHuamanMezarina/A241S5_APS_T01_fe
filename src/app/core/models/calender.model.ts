export interface EventoCalendario {
  id: string;
  usuarioId: string;
  parcelaId: string;
  siembraId: string | null;
  titulo: string;
  tipo: string;
  fechaInicio: string;
  fechaFin: string | null;
  color: string;
  createdAt: string;
}

export interface Parcela {
  id: string;
  nombre: string;
}