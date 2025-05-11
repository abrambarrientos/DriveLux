import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  solicitudes: any[] = [];
  opiniones: any[] = [];
  vistaAlternativa = false;

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    // Cargar solicitudes de compra
    const comprasData = localStorage.getItem('compras');
    this.solicitudes = comprasData ? JSON.parse(comprasData) : [];
    
    // Cargar opiniones
    const opinionesData = localStorage.getItem('opiniones');
    this.opiniones = opinionesData ? JSON.parse(opinionesData) : [];
  }

  eliminarSolicitud(index: number): void {
    this.solicitudes.splice(index, 1);
    localStorage.setItem('compras', JSON.stringify(this.solicitudes));
  }

  eliminarOpinion(index: number): void {
    this.opiniones.splice(index, 1);
    localStorage.setItem('opiniones', JSON.stringify(this.opiniones));
  }

  cambiarVista(esOpiniones: boolean): void {
    this.vistaAlternativa = esOpiniones;
  }
}