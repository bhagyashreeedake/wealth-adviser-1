import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { untilDestroyed } from '@ngneat/until-destroy';
import { of, switchMap, tap } from 'rxjs';
import { ProfileInsurance } from 'src/app/models/insurance';
import { InsuranceService } from 'src/app/services/insurance.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-insuraance-dialog',
  templateUrl: './insuraance-dialog.component.html',
  styleUrls: ['./insuraance-dialog.component.css']
})
export class InsuraanceDialogComponent implements OnInit {

  formData: any = {};
  user$ = this.usersService.currentUserProfile$;
  currentUserInsurance: ProfileInsurance | null = null;
  currentinsurance$: any;

  

  
    constructor(
      public dialogRef: MatDialogRef<InsuraanceDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private insuranceservice: InsuranceService,
      private usersService: UsersService
    ) { }
  
    ngOnInit(): void {
      // this.user$.pipe(
      //   switchMap((data: any) => {
      //     if (!data || !data.uid) {
      //       // If user data or UID is not available, return an observable that emits null
      //       return of(null);
      //     }
      //     // Otherwise, return the observable returned by getInsuranceByUid
      //     return this.insuranceservice.getInsuranceByUid(data.uid);
      //   })
      // ).subscribe((insuranceData) => {
      //   if (insuranceData) {
      //     // Handle the insurance data here
      //     console.log('Insurance Data:', insuranceData);
      //   } else {
      //     // Handle case when insurance data is null
      //     console.log('No insurance data found.');
      //   }
      // });
    
      // Copy form data from input data
      this.formData = { ...this.data };
    }
    
  
    submitForm(): void {
      

      let uid: string;
    
      this.user$.subscribe((data: any) => {
        uid = data.uid;
        console.log("formdata",this.formData)
        console.log("info we sending tofirestore" , { uid, ...this.formData })
        const insuranceData = {
          uid: uid, // Assuming you have access to user$ and it contains uid
          coverAmount: this.formData.coverAmount,
          insuredDate: this.formData.insuredDate,
          premiumAmount: this.formData.premiumAmount,
          premiumDate: this.formData.premiumDate,
          premiumPayingType: this.formData.premiumPayingType,
          maturityDate: this.formData.maturityDate,
          annualRateOfReturn: this.formData.annualRateOfReturn,
          maturityAmount: this.formData.maturityAmount,
          id: this.data.id
      };
      console.log("insurancedatsa", insuranceData)
        this.insuranceservice.addInsurance(insuranceData, this.data.id);
        this.dialogRef.close(this.formData);
      });
    }
      
    cancel(): void {
      this.dialogRef.close();
    }
  }



