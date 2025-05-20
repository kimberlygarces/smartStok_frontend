import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ServiceGeneralService } from '../../../theme/shared/service/service-general.service';

@Component({
  selector: 'app-config-ia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './config-ia.component.html',
  styleUrls: ['./config-ia.component.scss']
})
export class ConfigIaComponent {
  @ViewChild('modalContent', { static: true }) modalContent: any;
  @ViewChild('nameConfigModal', { static: true }) nameConfigModal: any;

  nombreConfiguracion: string = '';
  showToast = false;
  toastMessage = '';
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
    { id: 1, label: 'Ventas por Producto' },
    { id: 2, label: 'Niveles de Inventario' }
  ];

  subjects = [
    { id: 1, label: 'El stock este minimo' },
    { id: 2, label: 'Sobre Abastecimiento' }
  ];

  periodos = [
    { value: '1 mes', label: '1 mes' },
    { value: '3 meses', label: '3 meses' },
    { value: '5 meses', label: '6 meses' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private _serviceGeneral: ServiceGeneralService
  ) {
    const productControls = this.allProducts.reduce((acc, product) => {
      acc[this.getProductId(product)] = new FormControl(false);
      return acc;
    }, {} as { [key: string]: FormControl });

    this.configForm = this.fb.group({
      metricas: this.fb.array(this.metricas.map(() => false)),
      productos: this.fb.group(productControls),
      subjects: this.fb.array(this.subjects.map(() => false)),
      actualizacionAutomatica: [true],
      periodo: ['3 meses'],
      stockMinimo: [null],
      stockMaximo: [null]
    });

    this.searchTerm.valueChanges.subscribe(term => {
      this.filterProducts(term || '');
    });
  }

  getProductId(product: string): string {
    return product.replace(/[^a-zA-Z0-9]/g, '_');
  }

  showStockMinimo(): boolean {
    const subjectsArray = this.configForm.get('subjects')?.value;
    return subjectsArray && subjectsArray[0];
  }

  showStockMaximo(): boolean {
    const subjectsArray = this.configForm.get('subjects')?.value;
    return subjectsArray && subjectsArray[1];
  }

  onSubjectChange() {
    if (!this.showStockMinimo()) {
      this.configForm.get('stockMinimo')?.reset();
    }
    if (!this.showStockMaximo()) {
      this.configForm.get('stockMaximo')?.reset();
    }
  }

  onMetricaChange() {
    this.configForm.updateValueAndValidity();
  }

  onSubmit() {
    if (this.configForm.invalid) {
      this.showToastMessage('Por favor completa todos los campos requeridos', false);
      return;
    }
    this.openNameConfigModal(this.nameConfigModal);
  }

  saveConfigName(modal: any) {
    if (!this.nombreConfiguracion || this.nombreConfiguracion.trim() === '') {
      this.showToastMessage('Por favor ingresa un nombre para la configuración', false);
      return;
    }

    modal.close();

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

    // Preparar datos en la estructura requerida
    const configData = {
      namePrediction: this.nombreConfiguracion,
      metrics: this.getSelectedMetricsWithConsecutive(),
      products: this.getSelectedProductsWithConsecutive(),
      subjects: this.getSelectedSubjectsWithConsecutive(),
      automaticUpdated: this.configForm.get('actualizacionAutomatica')?.value ? 1 : 0,
      period: this.configForm.get('periodo')?.value,
      stockMinim: this.configForm.get('stockMinimo')?.value,
      stockMax: this.configForm.get('stockMaximo')?.value,
      username: getUsernameFromStorage() // Obtenemos el username correctamente
    };

    console.log('Datos a enviar:', configData); // Para depuración

    this.isLoading = true;

    this._serviceGeneral.configIA(configData).subscribe({
      next: (respuesta) => {
// console.log(respuesta)

        this.isLoading = false;
        this.openModal(this.modalContent);
        this.showToastMessage('Configuración guardada exitosamente!');
      },
      error: (error) => {
        console.error('Error en registro:', error);
        this.isLoading = false;
        this.showToastMessage('Error al guardar la configuración', false);
      }
    });
  }

  private getSelectedMetricsWithConsecutive(): any[] {
    const selectedMetrics = this.getSelected('metricas', this.metricas);
    return selectedMetrics.map((id, index) => ({
      [`consecutiveMetric`]: id,
    }));
  }

  private getSelectedProductsWithConsecutive(): any[] {
    const productosGroup = this.configForm.get('productos')?.value;
    const selectedProducts = Object.keys(productosGroup)
      .filter(key => productosGroup[key])
      .map(key => {
        const product = this.allProducts.find(p => this.getProductId(p) === key);
        return product || '';
      })
      .filter(p => p !== '');

    return selectedProducts.map((product, index) => ({
      [`consecutiveProduct`]: index + 1,
      name: product
    }));
  }

  private getSelectedSubjectsWithConsecutive(): any[] {
    const selectedSubjects = this.getSelected('subjects', this.subjects);
    return selectedSubjects.map((id, index) => ({
      [`consecutiveSubject`]: id,

    }));
  }

  // ... (mantener los demás métodos igual)
  openNameConfigModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md'
    });
  }

  openModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg'
    });
  }

  reportGeneration() {
    this.isLoadingReport = true;
    setTimeout(() => {
      this.isLoadingReport = false;
      this.showToastMessage('Reporte generado exitosamente!');
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

  private showToastMessage(message: string, isSuccess: boolean = true) {
    this.toastMessage = message;
    this.toastType = isSuccess ? 'success' : 'danger';
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  private getSelected(formArrayName: string, options: any[]): any[] {
    return this.configForm.get(formArrayName)?.value
      .map((checked: boolean, i: number) => checked ? options[i].id : null)
      .filter((v: null) => v !== null);
  }
}