import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataServiceService } from 'src/app/services/data/data-service.service';
import { ProfileInvestment } from 'src/app/models/investment';
import { InvestmentService } from 'src/app/services/investment.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-invesstment-dialog',
  templateUrl: './invesstment-dialog.component.html',
  styleUrls: ['./invesstment-dialog.component.css']
})
export class InvesstmentDialogComponent implements OnInit {
  formData: any = {};
  user$ = this.usersService.currentUserProfile$;
  currentUserInvestment: ProfileInvestment | null = null;
  currentinvestment$: any;

  constructor(
    public dialogRef: MatDialogRef<InvesstmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataservice: DataServiceService,
    private investmentservice: InvestmentService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    // Initialize form data with the received data
    this.formData = { 
      ...this.data,
      linkGoal: this.data.linkGoal || 'no', // Default to 'no' if not provided
      goalName: this.data.goalName || null,
      goalAmount: this.data.goalAmount || null,
      goalMaturityDate: this.data.goalMaturityDate || null,
      goalLoanAmount: this.data.goalLoanAmount || null,
      goalInsuranceAmount: this.data.goalInsuranceAmount || null,
      goalIncomeExpenseAmount: this.data.goalIncomeExpenseAmount || null
    };
  }

  submitForm(): void {
    let uid: string;

    this.user$.subscribe((data: any) => {
      uid = data.uid;

      const investmentData: any = {
        uid: uid, // User ID from the subscription
        initialinvestmentAmount: this.formData.initialinvestmentAmount,
        initialinvestmentDate: this.formData.initialinvestmentDate,
        regularinvestmentAmount: this.formData.regularinvestmentAmount,
        regularinvestmentDate: this.formData.regularinvestmentDate,
        investmentType: this.formData.investmentType,
        maturityDate: this.formData.maturityDate,
        maturityAmount: this.formData.maturityAmount,
        annualRateOfReturn: this.formData.annualRateOfReturn,
        id: this.data.id
      };

      if (this.formData.linkGoal === 'yes') {
        // Include goal-related fields if the goal is linked
        investmentData.goalName = this.formData.goalName;
        investmentData.goalAmount = this.formData.goalAmount;
        investmentData.goalMaturityDate = this.formData.goalMaturityDate;
        investmentData.goalLoanAmount = this.formData.goalLoanAmount;
        investmentData.goalInsuranceAmount = this.formData.goalInsuranceAmount;
        investmentData.goalIncomeExpenseAmount = this.formData.goalIncomeExpenseAmount;
      }

      console.log("Investment Data to be sent to Firestore:", investmentData);
      this.investmentservice.addInvestment(investmentData, this.data.id);
      this.dialogRef.close(this.formData);
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
