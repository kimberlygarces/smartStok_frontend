import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'; // Importa Router
import { ServiceGeneralService } from '../../../theme/shared/service/service-general.service';
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
    { id: 1, nombre: 'Kimberly Garces Perez', email: 'kimberlygarces1994@gmail.com', telefono: '3001234567' },
    { id: 2, nombre: 'Maria Fernanda', email: 'mfernada4@gmail.com', telefono: '3002345678' },
    { id: 3, nombre: 'Andres Rivero', email: 'andresrivero@gmail.com', telefono: '3003456789' },
    { id: 4, nombre: 'Andres Restrepo', email: 'andresRestrepo@gmail.com', telefono: '3147242607' }
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
    { id: 1, nombre: 'Cat chow' },
    { id: 2, nombre: 'Predicción prueba' },
    { id: 3, nombre: 'Día del gato' },
    { id: 4, nombre: 'Predicción Premiun' }
  ]
  tiposAlerta = [
    { id: 1, nombre: 'Informativa' },
    { id: 2, nombre: 'Preventiva' },
    { id: 3, nombre: 'Crítica' }
  ];

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private _serviceGeneral: ServiceGeneralService,
    private router: Router
  ) {
    this.alertaForm = this.fb.group({
      usuario: [this.usuarios[0].id, Validators.required],
      medio: ['', Validators.required],
      periodicidad: ['', Validators.required],
      motivo: [this.motivos[0].id, Validators.required],
      tipoAlerta: [this.tiposAlerta[0].id, Validators.required]
    });
  }

  // Función para crear la notificación
  private crearNotificacion(): any {
    const usuarioId = this.alertaForm.value.usuario;
    const tipoAlertaId = this.alertaForm.value.tipoAlerta;
    
    const usuarioSeleccionado = this.usuarios.find(u => u.id === usuarioId);
    const tipoAlertaSeleccionado = this.tiposAlerta.find(t => t.id === tipoAlertaId);

    if (!usuarioSeleccionado || !tipoAlertaSeleccionado) {
      throw new Error('Datos de usuario o tipo de alerta no encontrados');
    }

    return {
      usuario: usuarioSeleccionado.nombre,
      producto: 'Cat chow',
      numeroTelefono: usuarioSeleccionado.telefono,
      email: usuarioSeleccionado.email,
      tipoAlerta: tipoAlertaSeleccionado.nombre,
      numeroStock: '25',
      fechaStock: '2025-07-18',
      estadoStock: 'Desabastecido'
    };
  }

  // Función para enviar la notificación
  private enviarNotificacion(notificacion: any, modalContent: any): void {
    this._serviceGeneral.sendAlerts(notificacion).subscribe({
      next: (respuesta) => {
        console.log('Notificación enviada:', respuesta);
        this.isLoading = false;
        this.mostrarModalExito(modalContent);
      },
      error: (error) => {
        console.error('Error al enviar:', error);
        this.isLoading = false;
      }
    });
  }


    private registerAlert(dataAlert: any, modalContent: any): void {
    // console.log(dataAlert);
    // Obtener el username del localStorage de forma segura
    const getUsernameFromStorage = (): string => {
      try {
        const authResponse = localStorage.getItem('authResponse');
        if (!authResponse) return 'prueba'; // Fallback si no existe

        const parsedData = JSON.parse(authResponse) as {
          username?: string;
          message?: string;
          codeStatus?: number;
          jwt?: string;
        };

        return parsedData.username || 'prueba'; // Usa el username o fallback
      } catch (error) {
        console.error('Error al leer authResponse del localStorage:', error);
        return 'prueba'; // Fallback en caso de error
      }
    };
  
    const dataRequest = {
    username: 'kgarcesp', //getUsernameFromStorage(),
    consecutiveCommunication: dataAlert.medio,
    periodicity: dataAlert.periodicidad,
    motive: dataAlert.motivo,
    typeAlert: dataAlert.tipoAlerta
  }
    this._serviceGeneral.registerAlert(dataRequest).subscribe({
      next: (respuesta) => {
        console.log('Notificación enviada:', respuesta);
        this.isLoading = false;
        this.mostrarModalExito(modalContent);
      },
      error: (error) => {
        console.log(error);
        
        this.isLoading = false;
        this.mostrarModalExito(modalContent);
      }
    });
  }
  // Función para mostrar modal de éxito
  private mostrarModalExito(modalContent: any): void {
    this.modalService.open(modalContent, { 
      ariaLabelledBy: 'modal-basic-title',
      centered: true
    });
  }


  
  onSubmit(modalContent: any) {
    if (this.alertaForm.invalid) {
      console.warn('Formulario inválido');
      return;
    }

    this.isLoading = true;

    try {
      const notificacion = this.crearNotificacion();
      console.log('Datos a enviar:', notificacion);
      this.enviarNotificacion(notificacion, modalContent);

      this.registerAlert(this.alertaForm.value, modalContent);

    } catch (error) {
      console.error('Error al crear notificación:', error);
      this.isLoading = false;
    }
  }

  
  closeModalAndRedirect(modal: any) {
    modal.close();
    this.router.navigate(['/Alert_List']);
  }
}