import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-alerts-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbToastModule
  ],
  templateUrl: './alerts-register.component.html',
  styleUrl: './alerts-register.component.scss'
})
export class AlertsRegisterComponent {
  alertaForm: FormGroup;
  isLoading = false;
  usuarios = [
    { id: 1, nombre: 'Kimberly Garces Perez' },
    { id: 2, nombre: 'Maria Fernanda' },
    { id: 3, nombre: 'Andres Rivero' },
    { id: 4, nombre: 'Andres Restrepo' }
  ];
  
  mediosComunicacion = [
    { id: 1, nombre: 'Correo electrónico' },
    { id: 2, nombre: 'WhatsApp' }
  ];
  
  periodicidades = [
    { id: 1, nombre: 'Diaria' },
    { id: 2, nombre: 'Cada dos días' },
    { id: 3, nombre: 'Semanal' },
    { id: 4, nombre: 'Mensual' }
  ];
  
  motivos = [
    { id: 1, nombre: 'Predicción prueba' },
    { id: 2, nombre: 'Día del gato' },
    { id: 3, nombre: 'Predicción Premiun' }
  ];

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router // Inyecta Router
  ) {
    this.alertaForm = this.fb.group({
      usuario: [this.usuarios[0].id, Validators.required], // Primer usuario por defecto
      medio: ['', Validators.required],
      periodicidad: ['', Validators.required],
      motivo: [this.motivos[0].id, Validators.required] // Primer motivo por defecto
    });
  }

  onSubmit(modalContent: any) {
    if (this.alertaForm.invalid) {
      return;
    }

    this.isLoading = true;

    // Simulamos el envío a la API
    setTimeout(() => {
      console.log('Alerta registrada:', this.alertaForm.value);
      this.isLoading = false;
      
      // Mostrar modal de éxito
      this.modalService.open(modalContent, { 
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      });
    }, 1500);
  }

  closeModalAndRedirect(modal: any) {
    modal.close();
    this.router.navigate(['/Alert_List']); // Redirección a Alert_List
  }
}