// angular import
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

// project import

// third party
import { NgApexchartsModule, ChartComponent, ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-chart-data-month',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './chart-data-month.component.html',
  styleUrl: './chart-data-month.component.scss'
})
export class ChartDataMonthComponent implements OnInit {
  // public props
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions!: Partial<ApexOptions>;
  amount = 156000;
  btnActive!: string;

  // life cycle event
  ngOnInit() {
    this.btnActive = 'year';
    this.chartOptions = {
      chart: {
        type: 'line',
        height: 90,
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#FFF'],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      series: [
        {
          name: 'series1',
          data: [0, 0, 0, 0, 0, 0,0, 0]
        }
      ],
      yaxis: {
        min: 5,
        max: 95
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        marker: {
          show: false
        }
      }
    };
  }

  handleKeyDown(event: KeyboardEvent, value: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleActive(value);
      event.preventDefault(); // Prevent default scrolling for the spacebar key
    }
  }

  // public method
  toggleActive(value: string) {
    this.btnActive = value;
    this.chartOptions.series = [
      {
        name: 'series1',
        data: value === 'month' ? [0, 0, 0, 0, 0, 5, 10, 69] : [0, 0, 0, 0, 0, 5, 10, 69]
      }
    ];
    this.amount = value === 'month' ? 156000 : 156000;
  }
}
