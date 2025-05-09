import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { CarroDetalleComponent } from './components/carro-detalle/carro-detalle.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EquipoComponent } from './components/equipo/equipo.component';
import { CarroListComponent } from './components/car-list/car-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'Servicios', component: ServiciosComponent },
    { path: 'Nosotros', component: NosotrosComponent },
    { path: 'Preguntas', component: PreguntasComponent },
    { path: 'Contacto', component: ContactoComponent },
    { path: 'Equipo', component: EquipoComponent },
    { path: 'Reserva', component: CarroListComponent },
    {
        path: 'carros/:id',
        loadComponent: () => import('./components/carro-detalle/carro-detalle.component').then(m => m.CarroDetalleComponent)
    },
];
