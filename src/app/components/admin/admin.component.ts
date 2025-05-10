import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  solicitudes: any[] = [];
  vistaAlternativa = false;

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    const data = localStorage.getItem('compras');
    this.solicitudes = data ? JSON.parse(data) : [];
  }

  eliminarSolicitud(index: number): void {
    this.solicitudes.splice(index, 1);
    localStorage.setItem('compras', JSON.stringify(this.solicitudes));
  }
  cambiarVista(vistaAlt: boolean) {
    this.vistaAlternativa = vistaAlt;
  }
}
