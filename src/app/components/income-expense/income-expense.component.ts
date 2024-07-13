import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionPopupComponent } from '../transaction-popup/transaction-popup.component';
import { DataServiceService } from 'src/app/services/data/data-service.service';
import { Observable, Subscription, of } from 'rxjs';
import { IncomeExpenceService } from 'src/app/services/income-expence.service';
import { ProfileIncomeExpence } from 'src/app/models/income-expence';
import { switchMap } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.css']
})
export class IncomeExpenseComponent implements OnInit {
  transactions: any[] = [];
  user$ = this.usersService.currentUserProfile$;
  currentuid: any;
  incomeexpenceInfo: any[] = [];
  incomeExpenceData: any;
  activeIncome: number = 0;
  passiveIncome: number = 0;
  otherIncome: number = 0;
  monthlyExpense: number = 0;
  quarterlyExpense: number = 0;
  yearlyExpense: number = 0;
  totalBalance: number = 0;
  incomeTypes: string[] = ['Active Income', 'Passive Income', 'Other Income'];
  expenseTypes: string[] = ['Monthly Expense', 'Quarterly Expense', 'Yearly Expense'];
  notifications: string[] = []; // Add this line


  constructor(private dialog: MatDialog, private dataservice: DataServiceService, private incomeexpenceservice: IncomeExpenceService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.user$.pipe(
      switchMap((data: any) => {
        if (!data || !data.uid) {
          return of(null);
        }
        this.currentuid = data.uid;
        return this.incomeexpenceservice.getIncomeexpenceByUid(data.uid);
      })
    ).subscribe((incomeexpenceData: any) => {
      if (incomeexpenceData) {
        this.setFetchedDataintoform(incomeexpenceData);
        this.incomeexpenceInfo.push(incomeexpenceData);
        console.log('Incomeexpence Data:', incomeexpenceData);
        this.checkFinancialConditions(); // Call the method here
      } else {
        console.log('No incomeexpence data found.');
      }
    });
  }

  setFetchedDataintoform(incomeexpenceData: any) {
    this.quarterlyExpense = incomeexpenceData.quarterlyExpense;
    this.monthlyExpense = incomeexpenceData.monthlyExpense;
    this.otherIncome = incomeexpenceData.otherIncome;
    this.passiveIncome = incomeexpenceData.passiveIncome;
    this.yearlyExpense = incomeexpenceData.yearlyExpense;
    this.activeIncome = incomeexpenceData.activeIncome;
    this.totalBalance = incomeexpenceData.totalBalance;
  }

  checkFinancialConditions() {
    this.notifications = []; // Clear existing notifications

    if (this.activeIncome > this.passiveIncome) {
      this.notifications.push('Your active income is greater than your passive income. Consider increasing your passive income.');
    }

    if (this.totalBalance < 0) {
      this.notifications.push('Your total balance is negative. Consider reducing your expenses.');
    }

    if (this.getTotalIncome() < this.getTotalExpense()) {
      this.notifications.push('Your total income is less than your total expense. Consider increasing your income sources.');
    }
  }

  openTransactionPopup(): void {
    const dialogRef = this.dialog.open(TransactionPopupComponent, {
      width: '300px',
      data: {
        incomeTypes: this.incomeTypes,
        expenseTypes: this.expenseTypes,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.type === 'Income') {
          this.handleIncomeTransaction(result);
        } else if (result.type === 'Expense') {
          this.handleExpenseTransaction(result);
        }

        let a: ProfileIncomeExpence = this.getalldata();
        this.incomeexpenceservice.updateIncomeexpence(a).subscribe(() => {
          console.log('Income/Expense data updated successfully.');
        });
      }
    });
  }

  getalldata(): ProfileIncomeExpence {
    return {
      uid: this.currentuid,
      activeIncome: this.activeIncome,
      passiveIncome: this.passiveIncome,
      otherIncome: this.otherIncome,
      monthlyExpense: this.monthlyExpense,
      quarterlyExpense: this.quarterlyExpense,
      yearlyExpense: this.yearlyExpense,
      totalBalance: this.getTotalBalance(),
      totalIncome: this.getTotalIncome(),
      totalExpense: this.getTotalExpense()
    };
  }

  handleIncomeTransaction(data: any): void {
    if (data.incomeType === 'Active Income') {
      this.activeIncome += data.amount;
    } else if (data.incomeType === 'Passive Income') {
      this.passiveIncome += data.amount;
    } else if (data.incomeType === 'Other Income') {
      this.otherIncome += data.amount;
    }
  }

  handleExpenseTransaction(data: any): void {
    if (data.expenseType === 'Monthly Expense') {
      this.monthlyExpense += data.amount;
    } else if (data.expenseType === 'Quarterly Expense') {
      this.quarterlyExpense += data.amount;
    } else if (data.expenseType === 'Yearly Expense') {
      this.yearlyExpense += data.amount;
    }
  }

  getTotalIncome(): number {
    return this.activeIncome + this.passiveIncome + this.otherIncome;
  }

  getTotalExpense(): number {
    return this.monthlyExpense + this.quarterlyExpense + this.yearlyExpense;
  }

  getTotalBalance(): number {
    const totalIncome = this.getTotalIncome();
    const totalExpense = this.getTotalExpense();
    return totalIncome - totalExpense;
  }

  getIncomeValue(type: string): number {
    if (type === 'Active Income') {
      return this.activeIncome;
    } else if (type === 'Passive Income') {
      return this.passiveIncome;
    } else if (type === 'Other Income') {
      return this.otherIncome;
    }
    return 0;
  }

  getExpenseValue(type: string): number {
    if (type === 'Monthly Expense') {
      return this.monthlyExpense;
    } else if (type === 'Quarterly Expense') {
      return this.quarterlyExpense;
    } else if (type === 'Yearly Expense') {
      return this.yearlyExpense;
    }
    return 0;
  }

  deleteTransaction(transaction: any) {
    const index = this.transactions.indexOf(transaction);
    if (index !== -1) {
      this.transactions.splice(index, 1);
      this.updateChart();
    }
  }

  

  // // Update chart data
   updateChart() {
  //  this.doughnutChartData = [this.getTotalIncome(), this.getTotalExpense()];
  }
}