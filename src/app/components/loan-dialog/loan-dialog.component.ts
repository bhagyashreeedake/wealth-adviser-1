import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileLoan } from 'src/app/models/loan';
import { LoanService } from 'src/app/services/loan.service';
import { UsersService } from 'src/app/services/users.service';
import { DataServiceService } from 'src/app/services/data/data-service.service';

@Component({
  selector: 'app-loan-dialog',
  templateUrl: './loan-dialog.component.html',
  styleUrls: ['./loan-dialog.component.css']
})
export class LoanDialogComponent implements OnInit {

  formData: any = {};
  user$ = this.usersService.currentUserProfile$;
  currentUserLoan: ProfileLoan | null = null;
  currentloan$: any;
  
  constructor(
    public dialogRef: MatDialogRef<LoanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataservice:DataServiceService,
    private loanservice: LoanService,
    private usersService: UsersService  
  ) { }

  ngOnInit(): void {
    // Initialize form data with the received data
    this.formData = { ...this.data };
  }

  submitForm(): void {
    let uid: string;
  
    this.user$.subscribe((data: any) => {
      uid = data.uid;
      console.log("formdata",this.formData)
      console.log("info we sending tofirestore" , { uid, ...this.formData })
      const loanData = {
        uid: uid, // Assuming you have access to user$ and it contains uid
        loanAmount: this.formData.loanAmount,
        loandisbursmentDate: this.formData.loandisbursmentDate,
        emiAmount: this.formData.emiAmount,
        emiDate: this.formData.emiDate,
        emiPayingType: this.formData.emiPayingType,
        maturityDate: this.formData.maturityDate,
        maturityamount: this.formData.maturityAmount,
        annualRateOfInterest: this.formData.annualRateOfInterest,
        loanCards: [], 
        id: this.data.id
    };
    // console.log("insurancedatsa", investmentData)
      this.loanservice.addLoan(loanData, this.data.id);
      this.dialogRef.close(this.formData);
    // this.dialogRef.close(this.formData);
    // this.dataservice.addInvestment(this.formData.initialinvestmentAmount,this.formData.regularinvestmentAmount,this.formData.maturityAmount);
  });
}

  cancel(): void {
    this.dialogRef.close();
  }
}


