import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { USUARIOS } from '../datos/usuarios';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginStatusSubject = new BehaviorSubject<boolean>(this.hasSession());
  loginStatus$ = this.loginStatusSubject.asObservable();

  private usernameSubject = new BehaviorSubject<string | null>(this.getStoredUsername());
  username$ = this.usernameSubject.asObservable();

  constructor() {}

  private hasSession(): boolean {
    return localStorage.getItem('logueado') === 'true';
  }

  login(username: string, password: string): boolean {
  const user = USUARIOS.find(u => u.username === username && u.password === password);
  const success = !!user;

  localStorage.setItem('logueado', success.toString());

  if (success) {
    localStorage.setItem('username', user!.username); // Guarda el nombre de usuario
    this.usernameSubject.next(user!.username);
  } else {
    localStorage.removeItem('username');
    this.usernameSubject.next(null);
  }

  this.loginStatusSubject.next(success);
  return success;
  }

  logout(): void {
  localStorage.removeItem('logueado');
  localStorage.removeItem('username');
  this.loginStatusSubject.next(false);
  this.usernameSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.hasSession();
  }

  private getStoredUsername(): string | null {
    return localStorage.getItem('username');
  }
}
