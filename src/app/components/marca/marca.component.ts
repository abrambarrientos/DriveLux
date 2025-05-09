// marca.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarroService } from '../../services/carro.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-marca',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent {
  carros: any[] = [];
  marca: string = '';

  constructor(
    private route: ActivatedRoute,
    private carroService: CarroService
  ) {
    this.marca = this.route.snapshot.paramMap.get('marca') || '';
    this.cargarCarros();
  }

  cargarCarros() {
    this.carroService.getCarrosPorMarca(this.marca).subscribe({
      next: (data) => this.carros = data,
      error: (err) => console.error('Error al cargar autos:', err)
    });
  }
}