import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../service/login-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('modalContent', { static: true }) modalContent: any;

  loginForm: FormGroup;
  isLoading = false;
  errorMessage = false;

  // Credenciales válidas para los tres usuarios
  private validUsers = [
    {
      email: 'kimberlygarces1994@gmail.com',
      password: '123456789',
      username: 'Kimberly Garces',
      role: 'user'
    },
    {
      email: 'andres.rivero@example.com',
      password: 'rivero123',
      username: 'Andres Rivero',
      role: 'user'
    },
    {
      email: 'andres.restrepo@example.com',
      password: 'restrepo123',
      username: 'Andres Restrepo',
      role: 'user'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private loginService: LoginServiceService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    this.isLoading = true;

    if (this.loginForm.invalid) return;

    this.errorMessage = false;

    const { email, password, rememberMe } = this.loginForm.value;

    // Buscamos si las credenciales coinciden con algún usuario válido
    const validUser = this.validUsers.find(user => 
      user.email === email && user.password === password
    );

    if (validUser) {
      // Simulamos una respuesta exitosa del servidor
      const mockResponse = {
        jwt: 'mock-jwt-token',
        email: validUser.email,
        username: validUser.username,
        role: validUser.role
      };

      // Guardamos la respuesta mock en localStorage
      localStorage.setItem('authResponse', JSON.stringify(mockResponse));
      localStorage.setItem('token', mockResponse.jwt);
      localStorage.setItem('email', mockResponse.email);
      localStorage.setItem('username', mockResponse.username);

      // Si el usuario marcó "recordarme", guardamos el email
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/default']);
      }, 1000);
    } else {
      // Credenciales incorrectas
      this.errorMessage = true;

      setTimeout(() => {
        this.isLoading = false;
        this.openModal(this.modalContent);
      }, 1000);
    }
  }

  openModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'sm',
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
  }

  // Métodos para acceder a los controles del formulario
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}