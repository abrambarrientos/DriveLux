// src/app/components/carro-list/carro-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from '../../models/car.model';


@Component({
  selector: 'app-carro-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarroListComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;
  error: string | null = null;
  showModal: boolean = false;
  selectedCar: Car | null = null;

  carForm: FormGroup;
  paymentMethods = ['Efectivo', 'Tarjeta crédito', 'Financiamiento'];
  colors = ['Rojo', 'Azul', 'Negro', 'Blanco', 'Gris'];
  features = ['Aire acondicionado', 'Vidrios eléctricos', 'Sistema de navegación'];

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.carForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      paymentMethod: ['', Validators.required],
      color: ['', Validators.required],
      features: this.fb.group({
        airConditioning: [false],
        electricWindows: [false],
        navigation: [false]
      }, { validators: this.atLeastOneFeature }),
      testDate: ['', [Validators.required, this.futureDateValidator]],
      comments: ['', [Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
    this.loadCars();
  }


  atLeastOneFeature(group: FormGroup) {
    const values = group.value;
    const selected = values.airConditioning || values.electricWindows || values.navigation;
    return selected ? null : { noFeatureSelected: true };
  }

  futureDateValidator(control: any) {
    if (!control.value) return { required: true }; // Añade esta línea

    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate >= today ? null : { pastDate: true };
  }

  openModal(car: Car): void {
  this.selectedCar = car;
  this.showModal = true;
  this.carForm.reset({
    features: {
      airConditioning: false,
      electricWindows: false,
      navigation: false
    }
  });
}

  onSubmit(): void {
    // Marcar todos los campos como touched
   this.markFormGroupTouched(this.carForm);

  if (this.carForm.valid) {
    const formData = this.carForm.value;
    console.log('Formulario enviado:', formData);

    // Obtener los datos anteriores del localStorage o inicializar un arreglo vacío
    const storedData = localStorage.getItem('compras');
    const submissions = storedData ? JSON.parse(storedData) : [];

    // Agregar el nuevo formulario al arreglo
    submissions.push({
      ...formData,
      carId: this.selectedCar?.id || null,
      carName: this.selectedCar?.name || null,
      timestamp: new Date().toISOString()
    });

    // Guardar de nuevo en localStorage
    localStorage.setItem('compras', JSON.stringify(submissions));

    alert('Solicitud enviada correctamente');
    this.showModal = false;
  } else {
    console.log('Formulario inválido', this.getFormErrors());
  }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private getFormErrors(): any {
    const errors: any = {};
    Object.keys(this.carForm.controls).forEach(key => {
      const control = this.carForm.get(key);
      if (control?.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  loadCars(): void {
    this.http.get<{ products: Car[] }>('https://carrosapi.free.beeceptor.com/todos')
      .subscribe({
        next: (response) => {
          this.cars = response.products;
          this.filteredCars = [...this.cars];
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar los carros. Intente nuevamente más tarde.';
          this.isLoading = false;
          console.error('Error fetching cars:', err);
        }
      });
  }

  filterCars(): void {
    if (!this.searchTerm) {
      this.filteredCars = [...this.cars];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredCars = this.cars.filter(car =>
      car.name.toLowerCase().includes(term) ||
      car.description.toLowerCase().includes(term) ||
      car.price.includes(term)
    );
  }

  todayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}