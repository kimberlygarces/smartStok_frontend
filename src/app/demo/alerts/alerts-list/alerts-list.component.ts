import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
@Component({
  selector: 'app-alerts-list',
    standalone: true,
  imports: [
    CommonModule, // Agrega esto
    FormsModule
  ],
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.scss']
})
export class AlertsListComponent {
  @ViewChild('modalEdicion') modalEdicion!: TemplateRef<any>;
  @ViewChild('modalConfirmacion') modalConfirmacion!: TemplateRef<any>; // Agrega esta línea
  alertas = [
    {
      usuario: 'Juan Pérez',
      medio: 'Correo electrónico',
      periodicidad: 'Diaria',
      configuracion: 'Día del perro',
      activo: false
    },
    {
      usuario: 'Andres Restrepo',
      medio: 'Correo electrónico',
      periodicidad: 'Diaria',
      configuracion: 'Productos Premiun',
      activo: false
    },
    {
      usuario: 'Andres Rivero',
      medio: 'Correo electrónico',
      periodicidad: 'Diaria',
      configuracion: 'Productos general',
      activo: false
    },
    {
      usuario: 'Kimberly Garces',
      medio: 'Correo electrónico',
      periodicidad: 'Diaria',
      configuracion: 'Predicción Prueba',
      activo: true
    },
    {
      usuario: 'Kimberly Garces',
      medio: 'Correo electrónico',
      periodicidad: 'Diaria',
      configuracion: 'Cat chow',
      activo: true
    },
    
    {
      usuario: 'Kimberly Garces',
      medio: 'Correo electrónico',
      periodicidad: 'Diaria',
      configuracion: 'Dog Chow',
      activo: true
    }
  ];

  periodicidades = ['Diaria', 'Cada dos días', 'Semanal', 'Mensual'];
  alertaSeleccionada: any = null;
  nuevaPeriodicidad: string = '';
  
  // Toast
  mostrarToast = false;
  toastTitulo = '';
  toastMensaje = '';
  toastClass = 'bg-success';
  indiceAEliminar: number | null = null;

  constructor(private modalService: NgbModal) {}

  cambiarEstado(alerta: any) {
    // Simular llamada a API
    setTimeout(() => {
      this.mostrarMensaje('Éxito', `Alerta ${alerta.activo ? 'activada' : 'desactivada'} correctamente`);
    }, 500);
  }

  eliminarAlerta(index: number) {
    this.indiceAEliminar = index;
    this.modalService.open(this.modalConfirmacion, {
      centered: true,
      backdrop: 'static'
    });
  }
  confirmarEliminacion(modal: any) {
    if (this.indiceAEliminar !== null) {
      this.alertas.splice(this.indiceAEliminar, 1);
      this.mostrarMensaje('Éxito', 'Alerta eliminada correctamente');
      modal.close();
      this.indiceAEliminar = null;
    }
  }
  abrirModalEdicion(alerta: any) {
    this.alertaSeleccionada = alerta;
    this.nuevaPeriodicidad = alerta.periodicidad;
    this.modalService.open(this.modalEdicion);
  }

  guardarCambios(modal: any) {
    if (this.alertaSeleccionada && this.nuevaPeriodicidad) {
      // Simular llamada a API
      setTimeout(() => {
        this.alertaSeleccionada.periodicidad = this.nuevaPeriodicidad;
        this.mostrarMensaje('Éxito', 'Periodicidad actualizada correctamente');
        modal.close();
      }, 500);
    }
  }

  private mostrarMensaje(titulo: string, mensaje: string, tipo: 'success' | 'danger' = 'success') {
    this.toastTitulo = titulo;
    this.toastMensaje = mensaje;
    this.toastClass = tipo === 'success' ? 'bg-success' : 'bg-danger';
    this.mostrarToast = true;
    
    setTimeout(() => {
      this.mostrarToast = false;
    }, 3000);
  }
}