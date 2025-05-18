import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = false;

  // Credenciales válidas simuladas (las mantengo por si las necesitas)
  private validCredentials = {
    email: 'kimberlygarces1994@gmail.com',
    password: '123456789'
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginServiceService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = false;

    const { email, password } = this.loginForm.value;

    console.log(this.loginForm.value);
    
    this.loginService.login(this.loginForm.value).subscribe({
      next: (response: any) => { // Usamos 'any' para evitar problemas con el tipo
        // Guardamos TODA la respuesta en localStorage
        localStorage.setItem('authResponse', JSON.stringify(response));
        
        // Guardamos datos importantes por separado para fácil acceso
        if (response.jwt) {
          localStorage.setItem('token', response.jwt);
        }
        if (response.email) {
          localStorage.setItem('email', response.email);
        }
        
        // Redirigimos (mantengo tu ruta original)
        this.router.navigate(['/default']);
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.errorMessage = true;
        this.isLoading = false;
      }
    });
  }

  // Métodos para acceder a los controles del formulario
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}