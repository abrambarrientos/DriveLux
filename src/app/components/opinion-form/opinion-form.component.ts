import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-opinion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './opinion-form.component.html',
  styleUrls: ['./opinion-form.component.css']
})
export class OpinionFormComponent {
  opinionForm: FormGroup;

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