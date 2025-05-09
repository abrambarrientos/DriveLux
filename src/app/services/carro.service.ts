// src/app/services/carro.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carro,ApiResponse } from '../interfaces/carro.interface'; // Cambia la ruta según tu estructura de carpetas
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarroService {
  private http = inject(HttpClient);
  private apiUrl = 'https://carros.free.beeceptor.com/todos';

  getCarros(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.apiUrl);
  }
}
