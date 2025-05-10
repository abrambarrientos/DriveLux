import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Router,RouterModule} from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }



  estaLogueado = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.loginStatus$.subscribe(
      estado => this.estaLogueado = estado
    );
  }
  logout(): void {
    this.authService.logout();
  }
  


}
