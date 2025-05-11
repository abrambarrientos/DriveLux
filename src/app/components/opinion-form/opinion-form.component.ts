import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-opinion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './opinion-form.component.html',
  styleUrls: ['./opinion-form.component.css']
})
export class OpinionFormComponent {
  opinionForm: FormGroup;
  @ViewChild('opinionsContainer') opinionsContainer!: ElementRef;
  private scrollInterval: any;
  private isHovered = false;
  opinions = [
    {
      id: 1,
      name: 'Juan Pérez',
      rating: 5,
      comment: 'Increíble experiencia de compra. El auto superó todas mis expectativas en rendimiento y diseño.',
      verified: true,
      date: new Date('2023-05-15')
    },
    {
      id: 2,
      name: 'María González',
      rating: 4,
      comment: 'Muy buen servicio postventa. El único detalle fue el tiempo de espera para la entrega.',
      verified: true,
      date: new Date('2023-06-22')
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      rating: 5,
      comment: 'El motor suena como un sueño. Nunca había manejado algo con tanta potencia y control.',
      verified: true,
      date: new Date('2023-07-10')
    },
    {
      id: 4,
      name: 'Ana López',
      rating: 5,
      comment: 'Asesoramiento impecable. Me ayudaron a encontrar exactamente lo que buscaba.',
      verified: false,
      date: new Date('2023-08-05')
    },
    {
      id: 5,
      name: 'Roberto Sánchez',
      rating: 4,
      comment: 'Excelente relación calidad-precio. Lo recomendaría a cualquier entusiasta de los autos.',
      verified: true,
      date: new Date('2023-09-18')
    }
  ];

  ngAfterViewInit() {
    this.startAutoScroll();

    // Pausar scroll al hacer hover
    this.opinionsContainer.nativeElement.addEventListener('mouseenter', () => {
      this.isHovered = true;
      this.stopAutoScroll();
    });

    this.opinionsContainer.nativeElement.addEventListener('mouseleave', () => {
      this.isHovered = false;
      this.startAutoScroll();
    });
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  startAutoScroll() {
    this.stopAutoScroll();
    this.scrollInterval = setInterval(() => {
      if (!this.isHovered) {
        this.opinionsContainer.nativeElement.scrollLeft += 1;

        // Reiniciar scroll cuando llegue al final
        if (this.opinionsContainer.nativeElement.scrollLeft >=
          this.opinionsContainer.nativeElement.scrollWidth / 2) {
          this.opinionsContainer.nativeElement.scrollLeft = 0;
        }
      }
    }, 30);
  }

  stopAutoScroll() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  }

  constructor(private fb: FormBuilder) {
    this.opinionForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      titulo: ['', [Validators.required]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  submitOpinion() {
    if (this.opinionForm.valid) {
      const nuevaOpinion = {
        ...this.opinionForm.value,
        fecha: new Date().toISOString(),
        id: Date.now() // ID único basado en timestamp
      };

      const opinionesGuardadas = JSON.parse(localStorage.getItem('opiniones') || '[]');
      opinionesGuardadas.push(nuevaOpinion);
      localStorage.setItem('opiniones', JSON.stringify(opinionesGuardadas));
      this.opinionForm.reset();

      Swal.fire({
        title: '¡Opinión enviada!',
        text: 'Gracias por compartir tu opinión con nosotros.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3b82f6',
        background: '#1f2937',
        color: '#ffffff',
        iconColor: '#10b981'
      });
    } else {
      this.markFormGroupTouched(this.opinionForm);
    }

  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}