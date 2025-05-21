// Angular Import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BajajChartComponent } from 'src/app/theme/shared/components/apexchart/bajaj-chart/bajaj-chart.component';
import { BarChartComponent } from 'src/app/theme/shared/components/apexchart/bar-chart/bar-chart.component';
import { ChartDataMonthComponent } from 'src/app/theme/shared/components/apexchart/chart-data-month/chart-data-month.component';

@Component({
  selector: 'app-default',
  imports: [CommonModule, BajajChartComponent, ChartDataMonthComponent, SharedModule],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  // public method
    isLoading = false;

  ListGroup = [
    {
      name: 'CAT CHOW VIDA SANA X 1 3 KGS',
      profit: '10% inventario',
      invest: '$1839.00',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success'
    },
    {
      name: 'EXCELLENT FORMULA ADULT MAINTENANCE 8 KG',
      profit: '10% inventario',
      invest: '$100.00',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    },
    {
      name: 'LADRINA CARNE PARRILLA+VEGETALES X22 7KG',
      profit: '10% inventario',
      invest: '$200.00',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success'
    },
    {
      name: 'ATGL',
      profit: '6% inventario',
      invest: '$189.00',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    },
    {
      name: 'CAT CHOW GATITOS F D X 1 5 GR',
      profit: '5% inventario',
      invest: '$210.00',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success',
      space: 'pb-0'
    }
  ];

  profileCard = [
    {
      style: 'bg-primary-dark text-white',
      background: 'bg-primary',
      value: '$203k',
      text: 'Net Profit',
      color: 'text-white',
      value_color: 'text-white'
    },
    {
      background: 'bg-warning',
      avatar_background: 'bg-light-warning',
      value: '$550K',
      text: 'Total Revenue',
      color: 'text-warning'
    }
  ];

  sendInforme() {
  // Lógica para generar/descargar el informe
  console.log("Generando informe...");
  // Ejemplo con un servicio:
  // this.informeService.generarPDF().subscribe(blob => {
  //   saveAs(blob, 'informe-productos.pdf');
  // });

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      console.log("Informe generado.");
    }
    , 2000); // Simulando un retraso de 2 segundos

}
}
