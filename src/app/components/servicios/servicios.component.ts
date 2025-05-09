import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Servicio } from '../../interfaces/Servicio.interface';
@Component({
  selector: 'app-servicios',
  imports: [CommonModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

  servicios: Servicio[] = [
    // Servicios existentes
    {
      id: 1,
      nombre: 'TUNING DEPORTIVO',
      imagen: 'imgServicios/img1.jpg',
      descripcion: 'Mejoras de performance con turbocompresores, escape deportivo y reprogramación ECU.',
      icono: 'car',
      destacado: true
    },
    {
      id: 2,
      nombre: 'SUSPENSION RACING',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDYMSLWHSzyIMMR9ZOchXW9z5nzeEGHNZmxg&s',
      descripcion: 'Kit de suspensión ajustable para mejor manejo en curvas y baja altura.',
      icono: 'carUsed',
      destacado: false
    },
    {
      id: 3,
      nombre: 'FINANCIAMIENTO VIP',
      imagen: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/13/64/49/fb.jpg',
      descripcion: 'Créditos para modificaciones deportivas con tasas preferenciales.',
      icono: 'finance',
      destacado: true
    },
    {
      id: 4,
      nombre: 'MANTENIMIENTO PRO',
      imagen: 'https://wallpapers.com/images/hd/car-repair-1000-x-563-wallpaper-taa7v0sgma4934pe.jpg',
      descripcion: 'Servicios especializados para autos modificados o de alta potencia.',
      icono: 'maintenance',
      destacado: false
    },
    {
      id: 5,
      nombre: 'AERODINAMICA',
      imagen: 'https://es.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2024/site-simp/overview/carousel/2024-nissan-gt-r-aerodynamics.jpg',
      descripcion: 'Instalación de alerones, difusores y kits de cuerpo completo.',
      icono: 'collision',
      destacado: false
    },
    {
      id: 6,
      nombre: 'DIAGNOSTICO PRO',
      imagen: 'https://st3.depositphotos.com/1177973/12710/i/950/depositphotos_127104178-stock-photo-laptop-near-car-engine-modern.jpg',
      descripcion: 'Análisis computarizado para maximizar el rendimiento de tu auto.',
      icono: 'inspection',
      destacado: true
    },
  
    // Nuevos servicios agregados
    {
      id: 7,
      nombre: 'VENTA DE VEHICULOS',
      imagen: 'https://img.freepik.com/foto-gratis/coche-lujoso-estacionado-carretera-faro-iluminado-al-atardecer_181624-60607.jpg?semt=ais_hybrid&w=740',
      descripcion: 'Amplio catálogo de autos nuevos y seminuevos de las mejores marcas.',
      icono: 'local_shipping',
      destacado: true
    },
    {
      id: 8,
      nombre: 'SEGUROS AUTOMOTRICES',
      imagen: 'https://storage.googleapis.com/sigo-blog-production/2021/12/autosclasicos.jpg',
      descripcion: 'Pólizas personalizadas para proteger tu inversión vehicular.',
      icono: 'security',
      destacado: true
    },
    {
      id: 10,
      nombre: 'CARROCERIA Y PINTURA',
      imagen: 'https://st3.depositphotos.com/13768208/18099/i/450/depositphotos_180997184-stock-photo-car-detailing-the-man-holds.jpg',
      descripcion: 'Reparación de daños y personalización de colores con garantía.',
      icono: 'color_lens',
      destacado: false
    },
    {
      id: 11,
      nombre: 'SISTEMA DE SONIDO',
      imagen: 'https://img.remediosdigitales.com/a7e766/pruebas-de-sonido-4/1366_2000.jpg',
      descripcion: 'Instalación profesional de equipos de audio premium.',
      icono: 'speaker',
      destacado: false
    },
    {
      id: 16,
      nombre: 'SISTEMAS DE SEGURIDAD',
      imagen: 'https://segurointeligente.mx/blog/wp-content/uploads/2021/11/sistemas-seguridad-autos-2022FINAL.jpg',
      descripcion: 'Instalación de alarmas, rastreo GPS y cámaras de reversa.',
      icono: 'lock',
      destacado: false
    },

  ];
}
