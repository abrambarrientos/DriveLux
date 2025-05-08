import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Router,RouterModule} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgClass, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
