
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataServiceService } from 'src/app/services/data/data-service.service';
import { ProfileInvestment } from 'src/app/models/investment';
import { InvestmentService } from 'src/app/services/investment.service';
import { UsersService } from 'src/app/services/users.service';
import { privateDecrypt } from 'crypto';

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
      private dataservice:DataServiceService,
      private investmentservice: InvestmentService,
      private usersService: UsersService
    ) { }
  
    ngOnInit(): void {
      // Initialize form data with the received data
      this.formData = { ...this.data };
    }
  
    submitForm(): void {
      let uid: string;
    debugger
      this.user$.subscribe((data: any) => {
        uid = data.uid;
        console.log("formdata",this.formData)
        console.log("info we sending tofirestore" , { uid, ...this.formData })
        const investmentData = {
          uid: uid, // Assuming you have access to user$ and it contains uid
          initialinvestmentAmount: this.formData.initialinvestmentAmount,
          initialinvestmentDate: this.formData.initialinvestmentDate,
          regularinvestmentAmount: this.formData.regularinvestmentAmount,
          regularinvestmentDate: this.formData.regularinvestmentDate,
          investmentType: this.formData.investmentType,
          maturityDate: this.formData.maturityDate,
          maturityamount: this.formData.maturityAmount,
          annualRateOfReturn: this.formData.annualRateOfReturn,
          id: this.data.id
      };
      console.log("insurancedatsa", investmentData)
        this.investmentservice.addInvestment(investmentData, this.data.id);
        this.dialogRef.close(this.formData);
      // this.dialogRef.close(this.formData);
      // this.dataservice.addInvestment(this.formData.initialinvestmentAmount,this.formData.regularinvestmentAmount,this.formData.maturityAmount);
    });
  }
  
    cancel(): void {
      this.dialogRef.close();
    }
  }


