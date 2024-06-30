import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-transaction-dialog',
  templateUrl: './new-transaction-dialog.component.html',
  styleUrls: ['./new-transaction-dialog.component.css']
})
export class NewTransactionDialogComponent implements OnInit {
  transaction: any = {
    date: new Date(), // Set default date to today
    type: 'income' // Default transaction type to income
  };

  constructor(
    public dialogRef: MatDialogRef<NewTransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  submitTransaction(): void {
    this.dialogRef.close(this.transaction);
  }
}

