import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Crop {
  id: number;
  name: string;
  image: string;
  growthTime: string;
  riskLevel: 'Medio' | 'Alto' | 'Muy Alto';
  soilType: string;
  category: 'Cereal' | 'Hortaliza' | 'Tubérculo' | 'Legumbre';
  status: 'Disponible' | 'En Producción' | 'Temporada Cerrada';
  statusColor: string;
  isActive: boolean;
  description?: string;
  plantingTips?: string;
  harvestTips?: string;
}

@Component({
  selector: 'app-crops',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './crops.component.html',
  styleUrls: ['./crops.component.scss']
})
export class CropsComponent {
  searchTerm: string = '';
  selectedCategory: string = 'all';
  selectedStatus: string = 'all';
  showInactive: boolean = false;
  
  // Modals
  showDetailsModal: boolean = false;
  showEditModal: boolean = false;
  showAddModal: boolean = false;
  
  selectedCrop: Crop | null = null;
  cropForm: FormGroup;
  
  crops: Crop[] = [
    {
      id: 1,
      name: 'Trigo',
      image: '/assets/images/campo_maiz.png',
      growthTime: '120-140 días',
      riskLevel: 'Medio',
      soilType: 'Franco a franco-arcilloso',
      category: 'Cereal',
      status: 'Disponible',
      statusColor: 'bg-orange-500',
      isActive: true,
      description: 'El trigo es uno de los cereales más importantes del mundo, utilizado principalmente para la producción de harina.',
      plantingTips: 'Sembrar en otoño, requiere temperaturas frescas para germinación.',
      harvestTips: 'Cosechar cuando los granos estén duros y dorados.'
    },
    {
      id: 2,
      name: 'Maíz',
      image: '/assets/images/campo_maiz.png',
      growthTime: '90-120 días',
      riskLevel: 'Alto',
      soilType: 'Franco profundo',
      category: 'Cereal',
      status: 'En Producción',
      statusColor: 'bg-blue-500',
      isActive: true,
      description: 'Cereal versátil usado para alimentación humana y animal.',
      plantingTips: 'Plantar después de la última helada, necesita calor.',
      harvestTips: 'Cosechar cuando las mazorcas estén maduras y secas.'
    },
    {
      id: 3,
      name: 'Arroz',
      image: '/assets/images/campo_maiz.png',
      growthTime: '100-130 días',
      riskLevel: 'Muy Alto',
      soilType: 'Arcilloso pesado',
      category: 'Cereal',
      status: 'Disponible',
      statusColor: 'bg-green-500',
      isActive: true,
      description: 'Cereal básico en la alimentación mundial, requiere mucha agua.',
      plantingTips: 'Cultivar en terrenos inundados, necesita agua constante.',
      harvestTips: 'Cosechar cuando los granos estén completamente maduros.'
    },
    {
      id: 4,
      name: 'Tomate',
      image: '/assets/images/campo_maiz.png',
      growthTime: '60-90 días',
      riskLevel: 'Alto',
      soilType: 'Franco con buen drenaje',
      category: 'Hortaliza',
      status: 'Temporada Cerrada',
      statusColor: 'bg-red-500',
      isActive: false,
      description: 'Hortaliza rica en vitaminas, muy versátil en la cocina.',
      plantingTips: 'Plantar en primavera, necesita soporte para crecer.',
      harvestTips: 'Cosechar cuando estén rojos pero firmes.'
    },
    {
      id: 5,
      name: 'Papa',
      image: '/assets/images/campo_maiz.png',
      growthTime: '90-120 días',
      riskLevel: 'Medio',
      soilType: 'Franco-arenoso suelto',
      category: 'Tubérculo',
      status: 'En Producción',
      statusColor: 'bg-orange-500',
      isActive: true,
      description: 'Tubérculo rico en carbohidratos, alimento básico mundial.',
      plantingTips: 'Plantar tubérculos semilla en surcos profundos.',
      harvestTips: 'Cosechar cuando las plantas se sequen naturalmente.'
    },
    {
      id: 6,
      name: 'Zanahoria',
      image: '/assets/images/campo_maiz.png',
      growthTime: '70-90 días',
      riskLevel: 'Medio',
      soilType: 'Franco-arenoso profundo',
      category: 'Hortaliza',
      status: 'Disponible',
      statusColor: 'bg-orange-500',
      isActive: true,
      description: 'Hortaliza rica en betacaroteno, excelente para la vista.',
      plantingTips: 'Sembrar semillas directamente, suelo bien preparado.',
      harvestTips: 'Cosechar cuando alcancen el tamaño deseado.'
    },
    {
      id: 7,
      name: 'Lechuga',
      image: '/assets/images/campo_maiz.png',
      growthTime: '45-60 días',
      riskLevel: 'Alto',
      soilType: 'Franco con materia orgánica',
      category: 'Hortaliza',
      status: 'En Producción',
      statusColor: 'bg-green-500',
      isActive: false,
      description: 'Hortaliza de hoja verde, base de muchas ensaladas.',
      plantingTips: 'Plantar en clima fresco, evitar calor excesivo.',
      harvestTips: 'Cosechar las hojas externas o la cabeza completa.'
    },
    {
      id: 8,
      name: 'Soja',
      image: '/assets/images/campo_maiz.png',
      growthTime: '110-140 días',
      riskLevel: 'Medio',
      soilType: 'Franco bien drenado',
      category: 'Legumbre',
      status: 'Temporada Cerrada',
      statusColor: 'bg-green-500',
      isActive: true,
      description: 'Legumbre rica en proteínas, muy nutritiva.',
      plantingTips: 'Plantar en primavera, fija nitrógeno al suelo.',
      harvestTips: 'Cosechar cuando las vainas estén secas y amarillas.'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.cropForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', Validators.required],
      growthTime: ['', Validators.required],
      riskLevel: ['', Validators.required],
      soilType: ['', Validators.required],
      status: ['', Validators.required],
      statusColor: ['', Validators.required],
      description: [''],
      plantingTips: [''],
      harvestTips: ['']
    });
  }

  get totalCrops(): number {
    return this.crops.filter(crop => crop.isActive).length;
  }

  get cropsInProduction(): number {
    return this.crops.filter(crop => crop.status === 'En Producción' && crop.isActive).length;
  }

  get cerealCrops(): number {
    return this.crops.filter(crop => crop.category === 'Cereal' && crop.isActive).length;
  }

  get vegetableCrops(): number {
    return this.crops.filter(crop => crop.category === 'Hortaliza' && crop.isActive).length;
  }

  get filteredCrops(): Crop[] {
    let filtered = this.crops.filter(crop => {
      // Filtro por estado activo/inactivo
      if (!this.showInactive && !crop.isActive) return false;
      if (this.showInactive && crop.isActive) return false;
      
      // Filtro por categoría
      if (this.selectedCategory !== 'all' && crop.category !== this.selectedCategory) return false;
      
      // Filtro por estado
      if (this.selectedStatus !== 'all' && crop.status !== this.selectedStatus) return false;
      
      // Filtro por búsqueda
      if (this.searchTerm) {
        const searchLower = this.searchTerm.toLowerCase();
        return crop.name.toLowerCase().includes(searchLower) ||
               crop.category.toLowerCase().includes(searchLower) ||
               crop.soilType.toLowerCase().includes(searchLower) ||
               crop.status.toLowerCase().includes(searchLower);
      }
      
      return true;
    });
    
    return filtered;
  }

  getRiskLevelColor(riskLevel: string): string {
    switch (riskLevel) {
      case 'Medio': return 'text-blue-600';
      case 'Alto': return 'text-blue-600';
      case 'Muy Alto': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  }

  getStatusBadgeColor(status: string): string {
    switch (status) {
      case 'Disponible': return 'bg-yellow-100 text-yellow-800';
      case 'En Producción': return 'bg-green-100 text-green-800';
      case 'Temporada Cerrada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  // Modal Methods
  viewCropDetails(crop: Crop): void {
    this.selectedCrop = crop;
    this.showDetailsModal = true;
  }

  openEditModal(crop: Crop): void {
    this.selectedCrop = crop;
    this.cropForm.patchValue({
      name: crop.name,
      category: crop.category,
      growthTime: crop.growthTime,
      riskLevel: crop.riskLevel,
      soilType: crop.soilType,
      status: crop.status,
      statusColor: crop.statusColor,
      description: crop.description || '',
      plantingTips: crop.plantingTips || '',
      harvestTips: crop.harvestTips || ''
    });
    this.showEditModal = true;
  }

  openAddModal(): void {
    this.selectedCrop = null;
    this.cropForm.reset();
    this.cropForm.patchValue({
      statusColor: 'bg-green-500',
      status: 'Disponible',
      riskLevel: 'Medio'
    });
    this.showAddModal = true;
  }

  closeModals(): void {
    this.showDetailsModal = false;
    this.showEditModal = false;
    this.showAddModal = false;
    this.selectedCrop = null;
  }

  // CRUD Operations
  saveCrop(): void {
    if (this.cropForm.valid) {
      const formValue = this.cropForm.value;
      
      if (this.selectedCrop) {
        // Editar cultivo existente
        const index = this.crops.findIndex(c => c.id === this.selectedCrop!.id);
        if (index !== -1) {
          this.crops[index] = {
            ...this.crops[index],
            ...formValue
          };
        }
      } else {
        // Agregar nuevo cultivo
        const newCrop: Crop = {
          id: Math.max(...this.crops.map(c => c.id)) + 1,
          isActive: true,
          image: '/assets/images/campo_maiz.png', // Imagen por defecto
          ...formValue
        };
        this.crops.push(newCrop);
      }
      
      this.closeModals();
    }
  }

  toggleCropStatus(crop: Crop): void {
    const index = this.crops.findIndex(c => c.id === crop.id);
    if (index !== -1) {
      this.crops[index].isActive = !this.crops[index].isActive;
    }
  }

  // Filter Methods
  toggleShowInactive(): void {
    this.showInactive = !this.showInactive;
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }

  filterByStatus(status: string): void {
    this.selectedStatus = status;
  }

  clearFilters(): void {
    this.selectedCategory = 'all';
    this.selectedStatus = 'all';
    this.searchTerm = '';
    this.showInactive = false;
  }
}