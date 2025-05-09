// carro-detalle.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Carro } from '../../interfaces/carro.interface';

@Component({
  selector: 'app-carro-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carro-detalle.component.html', // Referencia al archivo HTML externo
  styleUrl: './carro-detalle.component.css' // Puedes añadir aquí archivos CSS si los necesitas
})
export class CarroDetalleComponent {
  private route = inject(ActivatedRoute);
  carro: Carro | undefined;

  // Simulamos una "base de datos" de carros
  private carros: Carro[] = [
    {
      id: 1,
      nombre: 'Toyota Supra MK5',
      imagen: '/imgCarros/ToyotaSupra2.png',
      caracteristicasIzq: ['Motor 3.0L', 'Tracción trasera'],
      caracteristicasDer: ['340 HP', 'Automático 8 veloc']
    },
    {
      id: 2,
      nombre: 'Mazda RX-7 FD',
      imagen: '/imgCarros/mazda2.png',
      caracteristicasIzq: ['Motor Wankel 1.3L', 'Peso: 1300kg'],
      caracteristicasDer: ['276 HP', 'Manual 5 veloc']
    },
    {
      id: 3,
      nombre: 'Nissan GT-R R35',
      imagen: '/imgCarros/nissangtr2.png',
      caracteristicasIzq: ['3.8L V6 Twin Turbo', 'AWD'],
      caracteristicasDer: ['565 HP', '0-100 km/h: 2.7s']
    },
    {
      id: 4,
      nombre: 'Porsche 911 Turbo S',
      imagen: '/imgCarros/porche2.png',
      caracteristicasIzq: ['3.8L Flat-6 Turbo', 'AWD'],
      caracteristicasDer: ['650 HP', '0-100: 2.7s']
    },
    {
      id: 5,
      nombre: 'Ford Mustang Shelby GT500',
      imagen: '/imgCarros/Mustang.png',
      caracteristicasIzq: ['5.2L Supercharged V8', 'Tracción trasera'],
      caracteristicasDer: ['760 HP', 'Manual 7 veloc']
    },
    {
      id: 6,
      nombre: 'Chevrolet Corvette C8',
      imagen: '/imgCarros/chevrolet2.png',
      caracteristicasIzq: ['6.2L V8', 'Motor central'],
      caracteristicasDer: ['495 HP', '0-100: 2.9s']
    },

  ];


  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carro = this.carros.find(c => c.id === id);
  }

  volver() {
    window.history.back();
  }
}