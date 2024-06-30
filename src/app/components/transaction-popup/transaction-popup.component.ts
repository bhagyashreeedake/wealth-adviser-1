import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileIncomeExpence } from 'src/app/models/income-expence';
import { IncomeExpenceService } from 'src/app/services/income-expence.service';
import { UsersService } from 'src/app/services/users.service';
import { DataServiceService } from 'src/app/services/data/data-service.service';

@Component({
  selector: 'app-transaction-popup',
  templateUrl: './transaction-popup.component.html',
  styleUrls: ['./transaction-popup.component.css']
})

// export class NewTransactionDialogComponent implements OnInit {
//   transaction: any = {
//     date: new Date(), // Set default date to today
//     type: 'income' // Default transaction type to income
//   };
export class TransactionPopupComponent implements OnInit{
  // transaction: any ={
  //   date: new Date(),
  //   transactionType: 'income'
  // }

  transactionType: string = 'Income';
  incomeType: string = '';
  expenseType: string = '';
  description: string = '';
  amount: number = 0;
  date!: Date;

  formData: any = {};
  user$ = this.usersService.currentUserProfile$;
  currentUserIncomeexpence: ProfileIncomeExpence | null = null;
  currentincomeexpence$: any;
  

  constructor(
    public dialogRef: MatDialogRef<TransactionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataservice:DataServiceService,
    private usersService: UsersService,
    private incomeexpence: IncomeExpenceService
  ) {}

  ngOnInit(): void {
    // Initialize form data with the received data
    this.formData = { ...this.data };
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

  updateincomeexpence(){
    debugger
    if(this.transactionType == 'Income'){
      this.dataservice.addIncome(this.amount)
    }else{
      this.dataservice.addExpense(this.amount)
    }
  }
//   submitTransaction(): void {
//     this.dialogRef.close(this.transaction);
//   }
}
