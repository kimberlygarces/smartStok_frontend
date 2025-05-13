import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-config-ia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './config-ia.component.html',
  styleUrls: ['./config-ia.component.scss']
})
export class ConfigIaComponent {
      @ViewChild('modalContent', { static: true }) modalContent: any;

    nombreConfiguracion: string = '';

  showToast = false;
  toastMessage = '';
  toastClass = 'bg-success text-white';
  configForm: FormGroup;
  isLoading = false;
  isLoadingReport = false;

  searchTerm = new FormControl('');
  toastType: 'success' | 'danger' = 'success';
  allProducts = [
    "FANCY FEAST PETITS FIL POLL Y QUES X85GR",
    "PROPLAN VETERINARY DIET CANINE NFX2 72K",
    "PROPLAN WET CAT STERILIZED CHICKEN 85GR",
    "EXCELLENT ADULT RAZA MED GRANDE X 3 KG",
    "PROPLAN PUPPY COMPLETE X 17 5KG",
    "PROPLAN DOG PUPPY COMPLETE X 3 KG",
    "PROPLAN SKIN&STOMACH-PAVO Y PROBIOT3,5 K",
    "DOG CHOW CONTROL PESO ADULT TODOS x 17 K",
    "PROPLAN EXIGENT DOG SMALL BREED X 3KG",
    "FANCY FEASTCASSEROLEATUNSALMON POUCH 85G",
    "DOG CHOW SALUD V CACH MED Y GDES X 2 K",
    "PROPLAN FORTIFLORA CANINO SUPL X30 SB",
    "DOG CHOW ADLT RP PAG 3 LLE 4 KG",
    "PROPLAN WET ADULTO SALMON 85 GR",
    "FELIX SENSACION CON PESCADO BLANCO X85GR",
    "DOG CHOW LONGEVIDAD ADULT 7+TODOS x 17K",
    "PROPLAN PUPPY SMALL BREED X1 KG",
    "PROPLAN VET D CRITICAL NUTRITION X5,5OZ",
    "ONE PERROS MULTI PROTEINAS X 85 GR",
    "FELIX FILETE POLLO Y SALMON SALSA X 156G",
    "DOG CHOW ADULTOS CORDERO X 100G",
    "GATSY ADULT POLLO CARNE 17 KG",
    "PROPLAN VETER D FELINE UR STRVOXLTX2 72K",
    "PROPLAN SENSITIVE SKIN SMALL BRED X 1KG",
    "PROPLAN CAT URINARY X 1 KG",
    "FELIX CLASSIC CON PAVO X 85G",
    "CAT CHOW ESTERILIZADOS X 8 KL",
    "DENTALIFE LARGE DOG TREAT X 221G",
    "FELIX SENSACIONES PAVO/MENUDE SALSAX85G",
    "PROPLAN VET D CANINE HA X 13,3 OZ",
    "CAT CHOW VIDA SANA X 1 3 KGS",
    "EXCELLENT FORMULA ADULT MAINTENANCE 8 KG",
    "LADRINA POLLO BRASA+VEGETALES X1KG",
    "FELIX PATE CLASSIC SENSMARNS X 156 G",
    "DOG CHOW SALUD V ADULT MED GDES X 22,7 K",
    "DOG CHOW FEST POLLO TROZOS JUG X 100 GRS",
    "PROPLAN CAT SKIN&STOMACH-PAVO Y PROB 3 K",
    "PROPLAN VETERINARY DIET NF CANINEX13 3OZ",
    "PROPLAN VETERINARY DIET FELINE ENX2 72 K",
    "LADRINA CARNE PARRILLA+VEGETALES X22 7KG",
    "PROPLAN WET DOG ADULT CHICKEN 100GR",
    "PROPLAN VET FELINE NF ADVANCED X 1 43K",
    "PRO PLAN SENS RZ MEDPIELADT 10KG PR3KG",
    "PROPLAN PUPPY SMALL BREED X 7 5 KG",
    "EXCELLENT FORMULA ADULT MAINT 22 7 KG",
    "DOG CHOW ADULT R MED/GRA P19 7 LL22 7 KG",
    "PROPLAN VD CANINE EN GASTRO X2K",
    "ONE PERROS SUPER FOOD SALMON X 85GR",
    "CAT CHOW ADULTOS HOGAREÑOS F D X 8KG",
    "FANCY FEAST MOUSSE PESCAD Y CAMAR X 85GR",
    "PROPLAN VETERINARY DIET CANINE OMX2 72 K",
    "DOG CHOW FESTIV TROZOS DE POLLO X 368 GR",
    "CAT CHOW VIDA SANA X 3 KGS",
    "CAT CHOW GATITOS F D X 1 5 GR",
    "CAT CHOW ADULT SO MULTISABOR PG 3 LLEVE",
    "EXCELLENT ADULT RAZA PEQUEÑA X 1KG",
    "CAT CHOW ADULTOS DELIMIX F D X 10 KG",
    "FELIX PATE PAVO Y MENUDENCIAS X 156 G",
    "PROPLAN PUPPY SMALL BREED X 3 5KG",
    "CAT CHOW ADULTOS DELIMIX F D X 1 5 KG"
  ].sort();

  filteredProducts = [...this.allProducts];

  metricas = [
    { id: 'ventasProducto', label: 'Ventas por Producto' },
    { id: 'nivelesInventario', label: 'Niveles de Inventario' }
  ];

  enfoques = [
    { id: 'enfoque1', label: 'El stock este minimo' },
    { id: 'enfoque2', label: 'Sobre Abastecimiento' },
    { id: 'enfoque3', label: 'Seguimiento' }
  ];

  periodos = [
    { value: '1 mes', label: '1 mes' },
    { value: '3 meses', label: '3 meses' },
    { value: '6 meses', label: '6 meses' },
    { value: '1 año', label: '1 año' },
    { value: '2 año', label: '2 años' },
    { value: '3 año', label: '3 años' }
  ];

  constructor(private fb: FormBuilder, 
    private router: Router, private modalService: NgbModal) {
    const productControls = this.allProducts.reduce((acc, product) => {
      acc[this.getProductId(product)] = new FormControl(false);
      return acc;
    }, {} as { [key: string]: FormControl });

    this.configForm = this.fb.group({
      metricas: this.fb.array(this.metricas.map(() => false)),
      productos: this.fb.group(productControls),
      enfoques: this.fb.array(this.enfoques.map(() => false)),
      actualizacionAutomatica: [true],
      periodo: ['3 meses']
    });

    this.searchTerm.valueChanges.subscribe(term => {
      this.filterProducts(term || '');
    });
  }

  public getProductId(product: string): string {
    return product.replace(/[^a-zA-Z0-9]/g, '_');
  }

  reportGeneration() {
    this.isLoadingReport = true;
    setTimeout(() => {
      this.isLoadingReport = false;
      this.showToastMessage('Reporte generado exitosamente!');
    }, 1500);
  }

  openNameConfigModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md'
    });
  }

    saveConfigName(modal: any) {
        if (!this.nombreConfiguracion || this.nombreConfiguracion.trim() === '') {
          this.showToastMessage('Por favor ingresa un nombre para la configuración', '', false);
          return;
        }
        
        modal.close();
        this.onSubmit();
        this.openModal(this.modalContent);
    }
  openModal(content: any) {
    setTimeout(() => {
      this.modalService.open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg'
      });
    }, 1500);
  }

  configAlert() {
    this.router.navigate(['/Alert']);
  }

  filterProducts(term: string) {
    const searchTerm = term.toLowerCase();
    this.filteredProducts = this.allProducts.filter(product =>
      product.toLowerCase().includes(searchTerm)
    );
  }

  triggerToast(message: string, type: 'success' | 'danger' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  onSubmit() {
    this.isLoading = true;

    setTimeout(() => {
      console.log('Configuración guardada:', this.getSelectedOptions());
      this.isLoading = false;
    }, 1500);
  }

  private showToastMessage(message: string, header: string = '', isSuccess: boolean = true) {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 7000);
  }

  private getSelectedOptions() {
    return {
      nombreConfiguracion: this.nombreConfiguracion,
      metricas: this.getSelected('metricas', this.metricas),
      productos: this.getSelectedProductos(),
      enfoques: this.getSelected('enfoques', this.enfoques),
      actualizacionAutomatica: this.configForm.get('actualizacionAutomatica')?.value,
      periodo: this.configForm.get('periodo')?.value
    };
  }

  private getSelectedProductos(): string[] {
    const productosGroup = this.configForm.get('productos')?.value;
    return Object.keys(productosGroup)
      .filter(key => productosGroup[key])
      .map(key => {
        const product = this.allProducts.find(p => this.getProductId(p) === key);
        return product || '';
      })
      .filter(p => p !== '');
  }

  private getSelected(formArrayName: string, options: any[]): string[] {
    return this.configForm.get(formArrayName)?.value
      .map((checked: boolean, i: number) => checked ? options[i].id : null)
      .filter((v: null) => v !== null);
  }
}