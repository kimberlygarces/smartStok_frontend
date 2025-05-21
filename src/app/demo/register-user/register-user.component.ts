import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbToastModule
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {
  registerUser: FormGroup;
  isLoading = false;
  
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.registerUser = this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(2)]],
      LastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]]
    });
  }

  onSubmit(modalContent: any) {
    if (this.registerUser.invalid) {
      // Marcar todos los campos como touched para mostrar errores
      this.registerUser.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    // Simulamos el envío a la API
    setTimeout(() => {
      this.isLoading = false;
      this.openSuccessModal(modalContent);
    }, 1500);
  }

  openSuccessModal(content: any) {
    this.modalService.open(content, {
   ariaLabelledBy: 'modal-basic-title',
      size: 'sm', // Puedes cambiar a 'lg', 'xl' o dejarlo vacío para el tamaño por defecto
      scrollable: true, // Esto habilita el scroll dentro del modal si el contenido es muy largo
      backdrop: 'static', // Esto evita que el modal se cierre al hacer clic fuera
      keyboard: false, // Esto evita que el modal se cierre con la tecla ESC
      centered: true
    });
  }

  closeModalAndRedirect(modal: any) {
    modal.close();
    this.router.navigate(['/clientes']); // Redirección a lista de clientes
  }
}