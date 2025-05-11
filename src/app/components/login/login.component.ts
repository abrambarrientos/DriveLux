import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { Router,RouterModule} from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  loginError = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.authService.login(this.username, this.password)) {
      Swal.fire({
              title: 'Inicio de sesion exitoso',
              text: 'bienvenido',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#3b82f6',
              background: '#1f2937',
              color: '#ffffff',
              iconColor: '#10b981'
            });
      this.loginError = false;
      this.router.navigate(['/']);
    } else {
      this.loginError = true;
    }
  }
}
