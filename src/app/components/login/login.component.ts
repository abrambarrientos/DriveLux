import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { Router,RouterModule} from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
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
      alert('¡Inicio de sesión exitoso!');
      this.loginError = false;
      this.router.navigate(['/']);
    } else {
      this.loginError = true;
    }
  }
}
