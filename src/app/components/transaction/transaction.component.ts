import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionPopupComponent } from '../transaction-popup/transaction-popup.component';
import { NewTransactionDialogComponent } from '../new-transaction-dialog/new-transaction-dialog.component';
// import { TransactionDialogComponent } from '..Components/transaction-dialog/transaction-dialog.component'; // Import TransactionData interface



export interface TransactionData {
  transactionType: string;
  incomeType: string;
  expenseType: string;
  description: string;
  amount: number;
  date: Date;

  
}


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  totalIncome: number = 0;
  totalExpense: number = 0;
  totalAmount: number = 0;
  transactions: TransactionData[] = []; // Initialize with your transaction data structure

  displayedColumns: string[] = ['transactionType', 'description', 'amount', 'date', 'actions'];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    // Initialize transactions data
  }

  opentransactionpopup(): void{
    const dialogRef = this.dialog.open(TransactionPopupComponent, {
      width: '500px',
  });

  // openNewTransactionDialog(): void {
  //   const dialogRef = this.dialog.open(NewTransactionDialogComponent, {
  //     width: '500px',
  //     // Add any necessary data or configuration here
  //   });

    dialogRef.afterClosed().subscribe((result: TransactionData) => {
      if (result) {
        this.transactions = [...this.transactions, result]; // Concatenate new transaction with existing array
      
    // Add the new transaction to the transactions array
        
        console.log("this is data from dialog", result);
        console.log('this is transaction Array', this.transactions)
      }

      if (result) {
        if (result.transactionType === 'income') {
          this.totalIncome += result.amount;
        } else if (result.transactionType === 'expense') {
          this.totalExpense += result.amount;
        }
        this.totalAmount = this.totalIncome - this.totalExpense;
      }
    });
  }

  deleteTransaction(transaction: TransactionData): void {
    const index = this.transactions.indexOf(transaction);
    if (index !== -1) {
        this.transactions.splice(index, 1);
        this.transactions = [...this.transactions];
    }
 }

}