import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { USUARIOS } from '../datos/usuarios';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginStatusSubject = new BehaviorSubject<boolean>(this.hasSession());
  loginStatus$ = this.loginStatusSubject.asObservable();

  constructor() {}

  private hasSession(): boolean {
    return localStorage.getItem('logueado') === 'true';
  }

  login(username: string, password: string): boolean {
    const user = USUARIOS.find(u => u.username === username && u.password === password);
    const success = !!user;
    localStorage.setItem('logueado', success.toString());
    this.loginStatusSubject.next(success);
    return success;
  }

  logout(): void {
    localStorage.removeItem('logueado');
    this.loginStatusSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.hasSession();
  }
}
