import { Component } from '@angular/core';
import { EChartsOption, SeriesOption } from 'echarts';
import { TransactionService } from '../../../../services/transactions.service';
import { TRANSACTION_EXPENSE, TRANSACTION_INCOME } from '../transaction/constants';
// export const TRANSACTION_EXPENSE = 'EXPENSE';
// export const TRANSACTION_INCOME = 'INCOME';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  categoryChartOptions: EChartsOption = {
    legend: {},
    title: {
      text: 'Dépenses par catégorie',
      bottom: '0',
      left: 'center',
    },
    series: [],
  };

  chartOption: EChartsOption = {
    legend: {},
    title: {
      text: 'Les transactions par type',
      bottom: '0',
      left: 'center',
    },
    color:['#C40C0C', '#41B06E'],
    dataset: {
      source: [],
    },
    series: [
      {
        type: 'pie',
        id: 'pie',
        radius: '70%',
        emphasis: {
          focus: 'self',
        },
        label: {
          formatter: (params: any) => {
            return `${params.name}: ${params.value.value} (${params.percent}%)`;
          } 
        }
      },
    ],
  };
  transactions = [];
  chargesValues = [['Dépenses'], ['Revenu']];
  loading: boolean = true;

  constructor(private transactionsService: TransactionService) {
    this.transactionsService.getAll().subscribe((transactions) => {
      this.transactions = transactions;
      const initialValue = 0;
      const charges = {
        name: 'Dépenses',
        value: transactions.reduce(
          (accumulator:any, transaction:any) => {
            if (transaction.type === TRANSACTION_EXPENSE)
              return accumulator + transaction.amount

            return accumulator;
          },
          initialValue,
        )
      };
      const income = {
        name: 'Revenu',
        value: transactions.reduce(
          (accumulator:any, transaction:any) => {
            if (transaction.type === TRANSACTION_INCOME)
              return accumulator + transaction.amount

            return accumulator;
          },
          initialValue,
        )
      };
      
      this.chartOption.dataset = {
        source: [charges,income],
      };

      const seriesPerCategory:any = {};
      // Group transaction by id
      transactions.forEach((transaction: any) => {
        if(transaction.type === TRANSACTION_INCOME)
          return;

        const categoryId = transaction.category.id;
        if(seriesPerCategory[categoryId]) {
          seriesPerCategory[categoryId].value += transaction.amount; 
        }
        else
          seriesPerCategory[categoryId] = {
            name: transaction.category.name,
            value: transaction.amount,
            itemStyle: {
              color: transaction.category.color
            }
          }
      });

      const categoriesSerie: SeriesOption = {
        type: 'pie',
        id: 'pie',
        radius: '70%',
        emphasis: {
          focus: 'self',
        },
        data: Object.values(seriesPerCategory),
        label: {
          formatter: (params: any) => {
            return `${params.name}: ${params.value} (${params.percent}%)`;
          } 
        }
      }
      this.categoryChartOptions.series = [categoriesSerie];


      this.loading = false;
    });
  }

  loadChart() {}
}
