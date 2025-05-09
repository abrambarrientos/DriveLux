// src/app/components/carro-list/carro-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Car } from '../../models/car.model';


@Component({
  selector: 'app-carro-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarroListComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.http.get<{products: Car[]}>('https://carros.free.beeceptor.com/todos')
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
}