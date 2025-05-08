import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServiciosComponent } from './components/servicios/servicios.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'home',component: HomeComponent},
    {path: 'Servicios',component: ServiciosComponent},
];
