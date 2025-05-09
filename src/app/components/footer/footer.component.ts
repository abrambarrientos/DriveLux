import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Router,RouterModule} from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [ CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
