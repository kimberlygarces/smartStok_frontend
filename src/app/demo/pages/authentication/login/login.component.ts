import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Añade RouterLink aquí
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // RouterLink // Añade esta línea
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = false;

  // Credenciales válidas simuladas
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

    username = 'andresrivero';
    password_2 = '12345';

    credencials = {
      username: this.username,
      password: this.password_2
    }

    /*this.loginService.login(credencials).subscribe({
      next: (respuesta) => console.log('Login exitoso:', respuesta),
      error: (error) => console.error('Error en login:', error)
    });*/

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;

    const { email, password } = this.loginForm.value;

    // Simulación de autenticación
    setTimeout(() => {
      if (email === this.validCredentials.email && password === this.validCredentials.password) {
        this.loginService.login(this.credencials).subscribe({
          next: (respuesta) => console.log('Login exitoso:', respuesta),
          error: (error) => console.error('Error en login:', error)
        });
        // Credenciales correctas - redirigir
        this.router.navigate(['/default']);
      } else {
            this.errorMessage = true;

        // Credenciales incorrectas - mostrar error
        // Mostrar alerta
        // alert('Error: Credenciales incorrectas\nUsuario válido: kimberlygarces1994@gmail.com\nContraseña: 123456789');
      }
      this.isLoading = false;
    }, 1500);
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}