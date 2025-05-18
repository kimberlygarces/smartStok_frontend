import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {
  clientes = [
    {
      id: 1,
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@example.com',
      celular: '3001234567',
      activo: true
    },
    {
      id: 2,
      firstName: 'María',
      lastName: 'Gómez',
      email: 'maria.gomez@example.com',
      celular: '3102345678',
      activo: true
    },
    {
      id: 3,
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      email: 'carlos.rodriguez@example.com',
      celular: '3203456789',
      activo: false
    }
  ];

  clienteEditando: any = {};
  idClienteAEliminar: number | null = null;
  mostrarToast = false;
  toastMensaje = '';
  toastClass = 'bg-success text-white';

  constructor(private modalService: NgbModal) {}

  cambiarEstado(cliente: any) {
    // Simular cambio de estado en backend
    console.log(`Estado cambiado para ${cliente.firstName}: ${cliente.activo ? 'Activo' : 'Inactivo'}`);
    this.mostrarMensaje(`Cliente ${cliente.activo ? 'activado' : 'desactivado'} correctamente`);
  }

  abrirModalEdicion(cliente: any, modalEdicion: any) {
    this.clienteEditando = {...cliente};
    this.modalService.open(modalEdicion, { size: 'lg' });
  }

  guardarCambios(modal: any) {
    const index = this.clientes.findIndex(c => c.id === this.clienteEditando.id);
    if (index !== -1) {
      this.clientes[index] = {...this.clienteEditando};
      this.mostrarMensaje('Cliente actualizado correctamente');
    } else {
      this.mostrarMensaje('Error al actualizar cliente', 'bg-danger text-white');
    }
    modal.close();
  }

  confirmarEliminacion(id: number, modalConfirmacion: any) {
    this.idClienteAEliminar = id;
    this.modalService.open(modalConfirmacion);
  }

  eliminarCliente(modal: any) {
    if (this.idClienteAEliminar !== null) {
      this.clientes = this.clientes.filter(c => c.id !== this.idClienteAEliminar);
      this.mostrarMensaje('Cliente eliminado correctamente', 'bg-danger text-white');
    }
    modal.close();
    this.idClienteAEliminar = null;
  }

  mostrarMensaje(mensaje: string, clase: string = 'bg-success text-white') {
    this.toastMensaje = mensaje;
    this.toastClass = clase;
    this.mostrarToast = true;
    
    setTimeout(() => {
      this.mostrarToast = false;
    }, 3000);
  }
}