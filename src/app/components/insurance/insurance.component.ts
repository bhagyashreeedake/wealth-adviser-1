import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InsuraanceDialogComponent } from '../insuraance-dialog/insuraance-dialog.component';
import { forkJoin, of, switchMap, EMPTY, Observable, from, map } from 'rxjs';
import { InsuranceService } from 'src/app/services/insurance.service';
import { UsersService } from 'src/app/services/users.service';
import { ProfileInsurance } from 'src/app/models/insurance';
import { uid } from 'chart.js/dist/helpers/helpers.core';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {
  coverAmount!: number;
  insuredDate!: Date;
  premiumAmount!: number
  premiumDate!: Date;
  premiumPayingType!: string;
  maturityDate!: Date;
  maturityAmount!: number;
  annualRateOfReturn!: number;
  id: any;
  user$ = this.usersService.currentUserProfile$;
  insuranceInfo:any[]=[];
  data: any;
  index: any;


  constructor(private dialog: MatDialog, private insuranceservice:InsuranceService, private usersService :UsersService) { }
  // ngOnInit(): void {
  //   debugger
    
  //   this.user$.pipe(
  //     switchMap((data: any) => {
  //       if (!data || !data.uid) {
  //         // If user data or UID is notany available, return an observable that emits null
  //         return of(null);
  //       } 

  //         return this.insuranceservice.getInsuranceByUid(data.uid, '2');
        
  //     })
  //   ).subscribe((insuranceData:any) => {
  //     if (insuranceData) {
  //       // Handle the insurance data here
  //       debugger
  //       this.insuranceInfo.push(insuranceData)
  //       console.log('Insurance Data:', insuranceData);
  //       console.log("insurance inside array ", this.insuranceInfo)
  //       console.log("id",this.insuranceInfo[0].id)

  //       if(this.insuranceInfo){
  //         for(let i=0;i<this.insuranceInfo.length;i++){

  //           this.updateInsurance(this.insuranceInfo[i],this.insuranceInfo[i].id)
  //         }
  //       }
  //     } else {
  //       // Handle case when insurance data is null
  //       console.log('No insurance data found.');
  //     }
  //   });
  // }

  ngOnInit(): void {
    debugger;
  
    this.user$.pipe(
      switchMap((data: any) => {
        if (!data || !data.uid) {
          // If user data or UID is not available, return an observable that emits an empty array
          return of([]);
        }
  
        // Define a recursive function to fetch insurance data
        const fetchInsuranceData = (uid: string, index: number): Observable<any[]> => {
          return this.insuranceservice.getInsuranceByUid(uid, index.toString()).pipe(
            switchMap((insuranceData: any) => {
              if (insuranceData) {
                // If data is found, fetch the next data recursively
                return fetchInsuranceData(uid, index + 1).pipe(
                  map((nextData: any[]) => [insuranceData, ...nextData])
                );
              } else {
                // If no data is found, return an empty array
                return of([]);
              }
            })
          );
        };
  
        // Start the recursive fetching with the initial index
        return fetchInsuranceData(data.uid, 1);
      })
    ).subscribe((allInsuranceData: any[]) => {
      if (allInsuranceData.length > 0) {
        // Handle the array of insurance data here
        debugger;
        this.insuranceInfo.push(...allInsuranceData);
        console.log('Insurance Data:', allInsuranceData);
        console.log("insurance inside array ", this.insuranceInfo);
        console.log("id", this.insuranceInfo[0].id);
  
        if (this.insuranceInfo) {
          for (let i = 0; i < this.insuranceInfo.length; i++) {
            this.updateInsurance(this.insuranceInfo[i], this.insuranceInfo[i].id);
          }
        }
      } else {
        // Handle case when no insurance data is found
        console.log('No insurance data found.');
      }
    });
  }
  
  

  // ngOnInit(): void {
  //   this.user$.pipe(
  //     switchMap((data: any) => {
  //       if (!data || !data.uid) {
  //         return of(null);
  //       }
  //       return this.insuranceservice.getInsuranceByUid(data.uid, '');
  //     })
  //   ).pipe(
  //     switchMap((insuranceData: any) => {
  //       if (insuranceData) {
  //         this.insuranceInfo = insuranceData;
  //         console.log('Insurance Info with Small Cards:', this.insuranceInfo);
  //         return from(this.insuranceInfo.map((item: any) => this.insuranceservice.getInsuranceByid(item.id)));
          
  //       } else {
  //         return of(null);
  //       }
  //     })
  //   ).subscribe((dynamicStringValues: any[]) => {
  //     if (dynamicStringValues) {
  //       this.insuranceInfo.forEach((item: any, index: number) => {
  //         item.dynamicStringValue = dynamicStringValues[Math.min(index, this.smallCards.length - 1)];
  //         console.log('Insurance Info with Small Cards:', this.insuranceInfo);
  //       });
  //     }
  //     this.insuranceInfo.forEach((item: any, index: number) => {
  //       this.updateInsurance(item, item.id);
  //     });
  //   });
  // }

  

  openInsuraanceDialog(id: number): void {
    
    const dialogRef = this.dialog.open(InsuraanceDialogComponent, {
      width: '500px',
      data: {
        coverAmount: this.coverAmount,
        insuredDate: this.insuredDate,
        premiumAmount: this.premiumAmount,
        premiumDate: this.premiumDate,
        premiumPayingType: this.premiumPayingType,
        maturityDate: this.maturityDate,
        maturityamount: this.maturityAmount,
        annualRateOfReturn: this.annualRateOfReturn,
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result after closing the insurance component", result)
      if (result) {
        this.updateInsurance(result, id);
      }
    });
  }

  updateInsurance(data: any, id: number): void {
    debugger
    // Update investment data based on the result from the dialog
    this.coverAmount = data.coverAmount;
    this.insuredDate = data.insuredDate;
    this.premiumAmount = data.premiumAmount;
    this.premiumDate = data.premiumDate;
    this.premiumPayingType = data.premiumPayingType;
    this.maturityDate = data.maturityDate;
    this.maturityAmount = data.maturityAmount;
    this.annualRateOfReturn = data.annualRateOfReturn;

    // Find the small card with the matching id and update its textRows
  const smallCardIndex = this.smallCards.findIndex(card => card.id === id);
  if (smallCardIndex !== -1) {
    this.smallCards[smallCardIndex].textRows.push(
      "Cover Amount Rs." + this.coverAmount,
      "Insured Date: " + this.insuredDate,
      "Premium Amount Rs." + this.premiumAmount,
      "Premium Date: " + this.premiumDate,
      "Premium Pay Type: " + this.premiumPayingType,
      "Maturity Date: " + this.maturityDate,
      "Maturity Amount: " + this.maturityAmount,
      "Rate Of Return In %: " + this.annualRateOfReturn
    );
  }
    
  }
   

  heading = 'Insurance';
  smallCards: { id: number; textRows: string[] }[] = [
    { id: 1, textRows:  ['Expected Cover Rs. 50000000/-', 'Term Insurance'] },    
    { id: 2, textRows: ['Expected Cover Rs. 10000000/-', 'Mediclaim Policy'] },
    { id: 3, textRows: ['Expected Cover Rs. 20000000/-', 'Equity'] },
    // { id: 4, textRows: ['Expected Rs. 40000000/-', 'Debt'] },
    // { id: 5, textRows: ['Expected Rs. 30000000/-', 'Gold'] },
    // { id: 6, textRows: ['Expected Rs. 400000/-', 'Real Estate/Properties'] },
    // { id: 7, textRows: ['Expected Rs. 6000000/-', 'NPS/PPF'] }
  ];

  addSmallCard() {
    this.smallCards.push({
      id: this.smallCards.length + 1,
      textRows: [`Card ${this.smallCards.length + 1}.1`, `Card ${this.smallCards.length + 1}.2`, `Card ${this.smallCards.length + 1}.3`]
    });
  }

  cardClickHandler(cardText: string) {
    alert(`Clicked: ${cardText}`);
  }
}

function push(arg0: Observable<ProfileInsurance | null>): any {
  throw new Error('Function not implemented.');
}

