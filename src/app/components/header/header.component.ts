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
  nombre:string =' ';
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  estaLogueado = false;

  constructor(private authService: AuthService,  private router: Router) {}

  ngOnInit() {
    this.authService.loginStatus$.subscribe(
      estado => this.estaLogueado = estado
    );
    this.authService.username$.subscribe(name => {
    this.nombre = name ?? '';
});
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  


}
