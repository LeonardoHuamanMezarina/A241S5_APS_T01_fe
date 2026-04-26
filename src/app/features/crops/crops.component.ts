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
  status: 'Primavera-Verano' | 'Primavera-Otoño' | 'Otoño-Invierno' | 'Todo el año' | 'Verano';
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
  styleUrl: './crops.component.scss'
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
  showConfirmModal: boolean = false;
  
  selectedCrop: Crop | null = null;
  cropForm: FormGroup;
  confirmAction: string = '';
  confirmMessage: string = '';
  confirmButtonText: string = '';
  confirmButtonColor: string = '';
  
  crops: Crop[] = [
    {
      id: 1,
      name: 'Trigo',
      image: 'https://images.unsplash.com/photo-1529511582893-2d7e684dd128?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      growthTime: '120-140 días',
      riskLevel: 'Medio',
      soilType: 'Franco a franco-arcilloso',
      category: 'Cereal',
      status: 'Otoño-Invierno',
      statusColor: 'bg-orange-500',
      isActive: true,
      description: 'El trigo es uno de los cereales más importantes del mundo, utilizado principalmente para la producción de harina.',
      plantingTips: 'Sembrar en otoño, requiere temperaturas frescas para germinación.',
      harvestTips: 'Cosechar cuando los granos estén duros y dorados.'
    },
    {
      id: 2,
      name: 'Maíz',
      image: 'https://plus.unsplash.com/premium_photo-1667047165840-803e47970128?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFpenxlbnwwfHwwfHx8MA%3D%3D',
      growthTime: '90-120 días',
      riskLevel: 'Alto',
      soilType: 'Franco profundo',
      category: 'Cereal',
      status: 'Primavera-Verano',
      statusColor: 'bg-blue-500',
      isActive: true,
      description: 'Cereal versátil usado para alimentación humana y animal.',
      plantingTips: 'Plantar después de la última helada, necesita calor.',
      harvestTips: 'Cosechar cuando las mazorcas estén maduras y secas.'
    },
    {
      id: 3,
      name: 'Arroz',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJyb3p8ZW58MHx8MHx8fDA%3D',
      growthTime: '100-130 días',
      riskLevel: 'Muy Alto',
      soilType: 'Arcilloso pesado',
      category: 'Cereal',
      status: 'Verano',
      statusColor: 'bg-green-500',
      isActive: true,
      description: 'Cereal básico en la alimentación mundial, requiere mucha agua.',
      plantingTips: 'Cultivar en terrenos inundados, necesita agua constante.',
      harvestTips: 'Cosechar cuando los granos estén completamente maduros.'
    },
    {
      id: 4,
      name: 'Tomate',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9tYXRlfGVufDB8fDB8fHww',
      growthTime: '60-90 días',
      riskLevel: 'Alto',
      soilType: 'Franco con buen drenaje',
      category: 'Hortaliza',
      status: 'Primavera-Verano',
      statusColor: 'bg-red-500',
      isActive: true,
      description: 'Hortaliza rica en vitaminas, muy versátil en la cocina.',
      plantingTips: 'Plantar en primavera, necesita soporte para crecer.',
      harvestTips: 'Cosechar cuando estén rojos pero firmes.'
    },
    {
      id: 5,
      name: 'Papa',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG90YXRvfGVufDB8fDB8fHww',
      growthTime: '90-120 días',
      riskLevel: 'Medio',
      soilType: 'Franco-arenoso suelto',
      category: 'Tubérculo',
      status: 'Primavera-Otoño',
      statusColor: 'bg-orange-500',
      isActive: true,
      description: 'Tubérculo rico en carbohidratos, alimento básico mundial.',
      plantingTips: 'Plantar tubérculos semilla en surcos profundos.',
      harvestTips: 'Cosechar cuando las plantas se sequen naturalmente.'
    },
    {
      id: 6,
      name: 'Zanahoria',
      image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fycm90fGVufDB8fDB8fHww',
      growthTime: '70-90 días',
      riskLevel: 'Medio',
      soilType: 'Franco-arenoso profundo',
      category: 'Hortaliza',
      status: 'Todo el año',
      statusColor: 'bg-orange-500',
      isActive: true,
      description: 'Hortaliza rica en betacaroteno, excelente para la vista.',
      plantingTips: 'Sembrar semillas directamente, suelo bien preparado.',
      harvestTips: 'Cosechar cuando alcancen el tamaño deseado.'
    },
    {
      id: 7,
      name: 'Lechuga',
      image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGV0dHVjZXxlbnwwfHwwfHx8MA%3D%3D',
      growthTime: '45-60 días',
      riskLevel: 'Alto',
      soilType: 'Franco con materia orgánica',
      category: 'Hortaliza',
      status: 'Primavera-Otoño',
      statusColor: 'bg-green-500',
      isActive: true,
      description: 'Hortaliza de hoja verde, base de muchas ensaladas.',
      plantingTips: 'Plantar en clima fresco, evitar calor excesivo.',
      harvestTips: 'Cosechar las hojas externas o la cabeza completa.'
    },
    {
      id: 8,
      name: 'Soja',
      image: 'https://images.unsplash.com/photo-1639843606783-b2f9c50a7468?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29qYXxlbnwwfHwwfHx8MA%3D%3D',
      growthTime: '110-140 días',
      riskLevel: 'Medio',
      soilType: 'Franco bien drenado',
      category: 'Legumbre',
      status: 'Primavera-Verano',
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
      image: ['', Validators.required],
      description: [''],
      plantingTips: [''],
      harvestTips: ['']
    });

    // Cargar datos del localStorage si existen
    this.loadCropsFromStorage();
  }

  private loadCropsFromStorage(): void {
    // Forzar el uso de los datos actualizados con las nuevas imágenes
    // Comentamos temporalmente la carga del localStorage para que use los datos nuevos
    /*
    const savedCrops = localStorage.getItem('crops-data');
    if (savedCrops) {
      try {
        const parsedCrops = JSON.parse(savedCrops);
        // Verificar si los datos guardados tienen la nueva imagen del trigo
        const savedTrigo = parsedCrops.find((crop: Crop) => crop.id === 1);
        if (savedTrigo && savedTrigo.image !== 'https://images.unsplash.com/photo-1529511582893-2d7e684dd128?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') {
          // Si la imagen es diferente, usar los datos por defecto (actualizados)
          this.saveCropsToStorage();
        } else {
          this.crops = parsedCrops;
        }
      } catch (error) {
        console.error('Error loading crops from localStorage:', error);
      }
    } else {
      // Si no hay datos guardados, guardar los datos por defecto
      this.saveCropsToStorage();
    }
    */
    
    // Usar siempre los datos actualizados y guardarlos
    this.saveCropsToStorage();
  }

  private saveCropsToStorage(): void {
    try {
      localStorage.setItem('crops-data', JSON.stringify(this.crops));
    } catch (error) {
      console.error('Error saving crops to localStorage:', error);
    }
  }

  // Método para resetear los datos (útil para desarrollo)
  resetCropsData(): void {
    localStorage.removeItem('crops-data');
    window.location.reload();
  }

  get totalCrops(): number {
    return this.crops.filter(crop => crop.isActive).length;
  }

  get cropsInProduction(): number {
    return this.crops.filter(crop => crop.status.includes('Primavera') && crop.isActive).length;
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
      case 'Primavera-Otoño': return 'bg-yellow-500 text-white';
      case 'Todo el año': return 'bg-yellow-500 text-white';
      case 'Primavera-Verano': return 'bg-yellow-500 text-white';
      case 'Otoño-Invierno': return 'bg-yellow-500 text-white';
      case 'Verano': return 'bg-yellow-500 text-white';
      default: return 'bg-yellow-500 text-white';
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
      image: crop.image,
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
      status: 'Primavera-Verano',
      riskLevel: 'Medio',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&auto=format&fit=crop&q=60'
    });
    this.showAddModal = true;
  }

  closeModals(): void {
    this.showDetailsModal = false;
    this.showEditModal = false;
    this.showAddModal = false;
    this.showConfirmModal = false;
    this.selectedCrop = null;
  }

  // CRUD Operations
  saveCrop(): void {
    if (this.cropForm.valid) {
      // Mostrar confirmación antes de guardar
      if (this.selectedCrop) {
        this.confirmAction = 'save-edit';
        this.confirmMessage = `¿Estás seguro de editar el cultivo "${this.selectedCrop.name}"?`;
        this.confirmButtonText = 'Sí, Editar';
        this.confirmButtonColor = 'bg-blue-500 hover:bg-blue-600';
      } else {
        this.confirmAction = 'save-add';
        this.confirmMessage = `¿Estás seguro de agregar el nuevo cultivo "${this.cropForm.value.name}"?`;
        this.confirmButtonText = 'Sí, Agregar Cultivo';
        this.confirmButtonColor = 'bg-green-500 hover:bg-green-600';
      }
      this.showConfirmModal = true;
    }
  }

  confirmSave(): void {
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
        ...formValue
      };
      this.crops.push(newCrop);
    }
    
    // Guardar en localStorage
    this.saveCropsToStorage();
    this.closeModals();
  }

  toggleCropStatus(crop: Crop): void {
    this.selectedCrop = crop;
    this.confirmAction = crop.isActive ? 'deactivate' : 'restore';
    
    if (crop.isActive) {
      this.confirmMessage = `¿Estás seguro de inactivar el cultivo "${crop.name}"?`;
      this.confirmButtonText = 'Sí, Inactivar';
      this.confirmButtonColor = 'bg-red-500 hover:bg-red-600';
    } else {
      this.confirmMessage = `¿Estás seguro de restaurar el cultivo "${crop.name}"?`;
      this.confirmButtonText = 'Sí, Restaurar';
      this.confirmButtonColor = 'bg-green-500 hover:bg-green-600';
    }
    
    this.showConfirmModal = true;
  }

  confirmToggleStatus(): void {
    if (this.selectedCrop) {
      const index = this.crops.findIndex(c => c.id === this.selectedCrop!.id);
      if (index !== -1) {
        this.crops[index].isActive = !this.crops[index].isActive;
        // Guardar en localStorage
        this.saveCropsToStorage();
      }
      this.closeModals();
    }
  }

  executeConfirmAction(): void {
    switch (this.confirmAction) {
      case 'save-edit':
      case 'save-add':
        this.confirmSave();
        break;
      case 'deactivate':
      case 'restore':
        this.confirmToggleStatus();
        break;
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