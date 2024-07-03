import { Component, OnInit } from '@angular/core';
import { LoanDialogComponent } from '../loan-dialog/loan-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataServiceService } from 'src/app/services/data/data-service.service';
import { Observable, catchError, concat, concatMap, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { LoanService } from 'src/app/services/loan.service';
import { ProfileLoan } from 'src/app/models/loan';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  loanAmount!: number;
  loandisbursmentDate!: Date;
  emiAmount!: number;
  emiDate!: Date;
  emiPayingType!: string;
  maturityDate!: Date;
  maturityAmount!: number;
  annualRateOfInterest!: number;
  id: any;
  totalLoanAmount: number = 0;
  user$ = this.usersService.currentUserProfile$;
  loanInfo: ProfileLoan[] = [];
  smallCards: { id: number; textRows: string[] }[] = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    textRows: []
  }));
  currentUserSubscription: any;
  constructor(private dialog: MatDialog, private dataservice: DataServiceService, private usersService: UsersService, private loanservice: LoanService) { }
  ngOnInit(): void {
    debugger;
  
    this.user$.pipe(
      switchMap((data: any) => {
        if (!data || !data.uid) {
          // If user data or UID is not available, return an observable that emits an empty array
          return of([]);
        }
  
        // Define a recursive function to fetch insurance data
        const fetchLoanData = (uid: string, index: number): Observable<any[]> => {
          return this.loanservice.getLoanByUid(uid, index.toString()).pipe(
            switchMap((loanData: any) => {
              if (loanData) {
                // If data is found, fetch the next data recursively
                return fetchLoanData(uid, index + 1).pipe(
                  map((nextData: any[]) => [loanData, ...nextData])
                );
              } else {
                // If no data is found, return an empty array
                return of([]);
              }
            })
          );
        };
  
        // Start the recursive fetching with the initial index
        return fetchLoanData(data.uid, 1);
      })
    ).subscribe((allLoanData: any[]) => {
      if (allLoanData.length > 0) {
        // Handle the array of insurance data here
        debugger;
        this.loanInfo.push(...allLoanData);
        console.log('Loan Data:', allLoanData);
        console.log("loan inside array ", this.loanInfo);
        console.log("id", this.loanInfo[0].id);
  
        if (this.loanInfo) {
          for (let i = 0; i < this.loanInfo.length; i++) {
            this.updateLoan(this.loanInfo[i], this.loanInfo[i].id);
          }
        }
      } else {
        // Handle case when no insurance data is found
        console.log('No loan data found.');
      }
    });
  }
  // ngOnInit(): void {
  //   // this.currentUserSubscription = this.usersService.currentUser$?.subscribe((user: { uid: any }) => {
  //   //   if (user && user.uid) {
  //   //     // Fetch loan data for each small card
  //   //     for (let i = 1; i <= 6; i++) {
  //   //       this.fetchLoanData(user.uid, i);
  //   //     }
  //   //   }
  //   // });
  
    
  //   // this.fetchLoanData();
  // //   this.fetchLoanDataForId(1);
  // this.user$.pipe(
  //   tap(user => console.log('User data:', user)), 
  //   concatMap((data: any) => {
  //     if (!data || !data.uid) {
  //       return of([]);
  //     }
      
  //     const uid = data.uid;
  //     const observables: Observable<ProfileLoan | null>[] = [];
  //     for (let i = 1; i <6; i++) {
        
  //       // return this.loanservice.getLoanByUidAndId(data.uid, i.toString());
  //       observables.push(this.loanservice.getLoanByUidAndId(uid, i.toString()));
  //     }
  //     // return forkJoin(observables);
  //      return concat(...observables);
  //   }),
  //   catchError(error => {
  //     console.error('Error fetching loan data:', error);
  //     return of([]); // Return observable that emits an empty array to continue the chain
  //   })
  // ).subscribe((loanData: any) => {
  //   console.log('Fetched loan data:', loanData);
  //   // fetchedLoanData.push(loanData);
  //   // if (loanData && loanData.length > 0) {
  //   // this.loanInfo.push(loanData)
  //   // console.log('loan Data:', loanData);
  //   // console.log("loan inside array ", this.loanInfo)
  //   // // console.log("id",this.loanInfo[0].id)
  //   // loanData.forEach((loan:any, index: number) => {
  //     // let loan: any; 
  //     if (loanData) {
  //       // const id = index + 1; // Assuming id starts from 1
  //       // this.updateSmallCard(id, loan);
  //       // this.updateSmallCard(index + 1, loan); // Update small card data for each loan
  //       const id = parseInt(loanData.id); // Assuming id is a string, convert it to a number
  //       this.updateSmallCard(id, loanData);
  //     }
  //   });
  // }
  // fetchLoanData() {
  //   this.loanservice.getLoanByUid('your-uid-here').subscribe(
  //     (data: ProfileLoan[]) => {
  //       if (data.length > 0) {
  //       this.loanInfo = data; // Assign fetched loan data to component property
  //       console.log('Fetched loan data:', this.loanInfo); // Log fetched data for debugging
  //       } else {
  //       console.log('No loan data found for the specified UID.');
  //     }
  //     },
  //     (error) => {
  //       console.error('Error fetching loan data:', error); // Log error if fetching data fails
  //     }
  //   );
  // }

  addSmallCard(): void {
    // Add a new small card
    const newId = this.smallCards.length + 1;
    this.smallCards.push({
      id: newId,
      textRows: [`Expected Loan Rs. 0`, 'New Loan']
    });
    // Fetch loan data for the new small card
    this.usersService.currentUser$.subscribe((user: { uid: string; }) => {
      if (user && user.uid) {
        this.fetchLoanData(user.uid, newId);
      }
    });
  }

  fetchLoanData(uid: string, id: number): void {
    // Fetch loan data for the given UID and ID
    this.loanservice.getLoanByUidAndId(uid, id.toString()).subscribe((loanData: ProfileLoan | null) => {
      if (loanData) {
        // Update small card with fetched loan data
        const smallCardIndex = parseInt(id.toString()) - 1; // Adjust index to match array index
        console.log("smallcard index value", smallCardIndex)
        if (smallCardIndex >= 0 && smallCardIndex < this.smallCards.length) {
          this.smallCards[smallCardIndex].textRows = [
            `Loan Amount: ${loanData.loanAmount}`,
            // Add other loan properties here
          ];
        } else {
          console.error('Invalid small card index:', smallCardIndex);
        }
      } else {
        console.log('No loan data found for UID:', uid, 'and ID:', id);
      }
      
      return loanData; // Return the fetched loan data
    });
  
  }

  updateSmallCard(id: number, loanData: ProfileLoan): void {
    // Find the small card with the matching ID and update its textRows
    const smallCardIndex = this.smallCards.findIndex(card => card.id === id);
    if (smallCardIndex !== -1) {
      this.smallCards[smallCardIndex].textRows = [
        `Loan Amount Rs. ${loanData.loanAmount}`,
        `Loan Disbursement Date: ${loanData.loandisbursmentDate}`,
        `EMI Amount Rs. ${loanData.emiAmount}`,
        `EMI Date: ${loanData.emiDate}`,
        `EMI Pay Type: ${loanData.emiPayingType}`,
        `Maturity Date: ${loanData.maturityDate}`,
        `Maturity Amount: ${loanData.maturityAmount}`,
        `Rate Of Interest In %: ${loanData.annualRateOfInterest}`
      ];
    }
  }
  // fetchLoanDataForId(id: number): void {
  //   // Generate the UID based on the ID value
  //   const uid = 'i03bnS3jJJYstb2ZEoxDUj0RasJ3' + id.toString();
  //   console.log("uid number is ", uid)
  //   // Fetch loan data using the generated UID
  //   this.loanservice.getLoanByUid(uid).subscribe(
  //     (data: ProfileLoan []) => {
  //       if (data) {
  //         // Loan data found, handle it accordingly
  //         console.log('Fetched loan data:', data);
  //       } else {
  //         console.log('No loan data found for the specified UIDID combination.');
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching loan data:', error);
  //     }
  //   );
  // }
  openLoanDialog(id: number): void {
    const dialogRef = this.dialog.open(LoanDialogComponent, {
      width: '500px',
      data: {
        loanAmount: this.loanAmount,
        loandisbursmentDate: this.loandisbursmentDate,
        emiAmount: this.emiAmount,
        emiDate: this.emiDate,
        emiPayingType: this.emiPayingType,
        maturityDate: this.maturityDate,
        maturityamount: this.maturityAmount,
        annualRateOfInterest: this.annualRateOfInterest,
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result after closing the loans component", result)
      if (result) {
        this.updateLoan(result, id);
      }
    });
  }

  updateSmallCards(): void {
    this.loanInfo.forEach(loan => {
      const smallCardIndex = this.smallCards.findIndex(card => card.id === loan.id);
      if (smallCardIndex !== -1) {
        this.smallCards[smallCardIndex].textRows = [
          `Loan Amount Rs. ${loan.loanAmount}`,
          `Loan disbursment Date: ${loan.loandisbursmentDate}`,
          `EMI Amount Rs. ${loan.emiAmount}`,
          `EMI Date: ${loan.emiDate}`,
          `EMI Pay Type: ${loan.emiPayingType}`,
          `Maturity Date: ${loan.maturityDate}`,
          `Maturity Amount: ${loan.maturityAmount}`,
          `Rate Of Interest In %: ${loan.annualRateOfInterest}`
        ];
        // Update total loan amount
        // this.totalLoanAmount += loan.loanAmount;
      }
    });
    // Update total loan amount in data service
    this.dataservice.setTotalLoanAmount(this.totalLoanAmount);
  }

  updateLoan(data: ProfileLoan, id: number | undefined): void {
    // Update investment data based on the result from the dialog
    // this.loanAmount = data.loanAmount;
    // this.loandisbursmentDate = data.loandisbursmentDate;
    // this.emiAmount = data.emiAmount;
    // this.emiDate = data.emiDate;
    // this.emiPayingType = data.emiPayingType;
    // this.maturityDate = data.maturityDate;
    // this.maturityAmount = data.maturityAmount;
    // this.annualRateOfInterest = data.annualRateOfInterest;
    // this.totalLoanAmount += this.loanAmount;
    // this.dataservice.setTotalLoanAmount(this.totalLoanAmount);

    this.loanAmount = data.loanAmount ?? 0;
    this.loandisbursmentDate = data.loandisbursmentDate ?? new Date();
    this.emiAmount = data.emiAmount ?? 0;
    this.emiDate = data.emiDate ?? new Date();
    this.emiPayingType = data.emiPayingType ?? '';
    this.maturityDate = data.maturityDate ?? new Date();
    this.maturityAmount = data.maturityAmount ?? 0;
    this.annualRateOfInterest = data.annualRateOfInterest ?? 0;
    this.totalLoanAmount += this.loanAmount;
    this.dataservice.setTotalLoanAmount(this.totalLoanAmount);
    // if (id !== undefined) {
    // Find the small card with the matching id and update its textRows
    const smallCardIndex = this.smallCards.findIndex(card => card.id === (id ?? -1));
    if (smallCardIndex !== -1) {
      this.smallCards[smallCardIndex].textRows = [
        "Loan Amount Rs." + this.loanAmount,
        "Loan disbursment Date: " + this.loandisbursmentDate,
        "EMI Amount Rs." + this.emiAmount,
        "EMI Date: " + this.emiDate,
        "EMI Pay Type: " + this.emiPayingType,
        "Maturity Date: " + this.maturityDate,
        "Maturity Amount: " + this.maturityAmount,
        "Rate Of Interest In %: " + this.annualRateOfInterest
      ];
    }
  }
  // }

  heading = 'Loans';
  // smallCards: { id: number; textRows: string[] }[] = [
  //   { id: 1, textRows: ['Ecpected Loan Rs. 50000000/-', 'Home Loan'] },
  //   { id: 2, textRows: ['Expected Loan Rs. 10000000/-', 'Education Loan'] },
  //   { id: 3, textRows: ['Expected Loan Rs. 20000000/-', 'Car Loan'] },
  //   { id: 4, textRows: ['Expected Loan Rs. 40000000/-', 'Personal Loan'] },
  //   { id: 5, textRows: ['Expected Loan Rs. 30000000/-', 'Business Loan'] },
  //   // { id: 6, textRows: ['Expected Loan Rs. 400000/-', 'Real Estate/Properties'] },
  //   // { id: 7, textRows: ['Expected Loan Rs. 6000000/-', 'NPS/PPF'] }
  // ];

  // addSmallCard() {
  //   this.smallCards.push({
  //     id: this.smallCards.length + 1,
  //     textRows: [`Card ${this.smallCards.length + 1}.1`, `Card ${this.smallCards.length + 1}.2`, `Card ${this.smallCards.length + 1}.3`]
  //   });
  // }

  cardClickHandler(cardText: string) {
    alert(`Clicked: ${cardText}`);
  }

}












// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Observable, of, concat, forkJoin } from 'rxjs';
// import { catchError, concatMap, tap } from 'rxjs/operators';
// import { LoanDialogComponent } from '../loan-dialog/loan-dialog.component';
// import { DataServiceService } from 'src/app/services/data/data-service.service';
// import { LoanService } from 'src/app/services/loan.service';
// import { ProfileLoan } from 'src/app/models/loan';
// import { UsersService } from 'src/app/services/users.service';

// @Component({
//   selector: 'app-loans',
//   templateUrl: './loans.component.html',
//   styleUrls: ['./loans.component.css']
// })
// export class LoansComponent implements OnInit {

//   totalLoanAmount: number = 0;
//   user$ = this.usersService.currentUserProfile$;
//   smallCards: { id: number; textRows: string[] }[] = Array.from({ length: 6 }, (_, index) => ({
//     id: index + 1,
//     textRows: []
//   }));
//   loanAmount: number | undefined;
//   loandisbursmentDate: Date | undefined;
//   emiAmount: number | undefined;
//   emiDate: Date | undefined;
//   annualRateOfInterest: number | undefined;
//   maturityDate: Date | undefined;
//   maturityAmount: number | undefined;
//   emiPayingType: string | undefined;

//   constructor(private dialog: MatDialog, private dataservice: DataServiceService, private usersService: UsersService, private loanservice: LoanService) { }

//   ngOnInit(): void {
//     this.user$.pipe(
//       tap(user => console.log('User data:', user)),
//       concatMap(user => {
//         if (!user || !user.uid) {
//           return of([]);
//         }
  
//         const uid = "user.uid";
//         const observables: Observable<ProfileLoan | null>[] = [];
//         for (let i = 1; i <= 6; i++) {
//           observables.push(this.loanservice.getLoanByUidAndId(uid, i.toString()));
//         }
//         return forkJoin(observables); // Use forkJoin to combine the observables
//       }),
//       catchError(error => {
//         console.error('Error fetching loan data:', error);
//         return of([]);
//       })
//     ).subscribe((loanDataArray: (ProfileLoan | null)[]) => {
//       loanDataArray.forEach(loanData => {
//         if (loanData) {
//           const id = parseInt(loanData.id);
//           this.updateSmallCard(id, loanData);
//         }
//       });
//     });
//   }
  

//   addSmallCard(): void {
//     const newId = this.smallCards.length + 1;
//     this.smallCards.push({
//       id: newId,
//       textRows: [`Expected Loan Rs. 0`, 'New Loan']
//     });
//     this.usersService.currentUser$.subscribe((user: { uid: string }) => {
//       if (user && user.uid) {
//         this.fetchLoanData(user.uid, newId);
//       }
//     });
//   }

//   fetchLoanData(uid: string, id: number): void {
//     this.loanservice.getLoanByUidAndId(uid, id.toString()).subscribe((loanData: ProfileLoan | null) => {
//       if (loanData) {
//         this.updateSmallCard(id, loanData);
//       }
//     });
//   }

//   updateSmallCard(id: number, loanData: ProfileLoan): void {
//     const smallCardIndex = this.smallCards.findIndex(card => card.id === id);
//     if (smallCardIndex !== -1) {
//       this.smallCards[smallCardIndex].textRows = [
//         `Loan Amount Rs. ${loanData.loanAmount}`,
//         `Loan Disbursement Date: ${loanData.loandisbursmentDate}`,
//         `EMI Amount Rs. ${loanData.emiAmount}`,
//         `EMI Date: ${loanData.emiDate}`,
//         `EMI Pay Type: ${loanData.emiPayingType}`,
//         `Maturity Date: ${loanData.maturityDate}`,
//         `Maturity Amount: ${loanData.maturityAmount}`,
//         `Rate Of Interest In %: ${loanData.annualRateOfInterest}`
//       ];
//     }
//   }
  

//   openLoanDialog(id: number): void {
//     const dialogRef = this.dialog.open(LoanDialogComponent, {
//       width: '500px',
//       data: {
//         id: id
//       }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.updateLoan(result, id);
//       }
//     });
//   }

//   updateLoan(data: ProfileLoan, id: number): void {
//     this.loanAmount = data.loanAmount ?? 0;
//     this.loandisbursmentDate = data.loandisbursmentDate ?? new Date();
//     this.emiAmount = data.emiAmount ?? 0;
//     this.emiDate = data.emiDate ?? new Date();
//     this.emiPayingType = data.emiPayingType ?? '';
//     this.maturityDate = data.maturityDate ?? new Date();
//     this.maturityAmount = data.maturityAmount ?? 0;
//     this.annualRateOfInterest = data.annualRateOfInterest ?? 0;
//     this.totalLoanAmount += this.loanAmount;
//     this.dataservice.setTotalLoanAmount(this.totalLoanAmount);

//     const smallCardIndex = this.smallCards.findIndex(card => card.id === id);
//     if (smallCardIndex !== -1) {
//       this.smallCards[smallCardIndex].textRows = [
//         `Loan Amount Rs. ${this.loanAmount}`,
//         `Loan disbursment Date: ${this.loandisbursmentDate}`,
//         `EMI Amount Rs. ${this.emiAmount}`,
//         `EMI Date: ${this.emiDate}`,
//         `EMI Pay Type: ${this.emiPayingType}`,
//         `Maturity Date: ${this.maturityDate}`,
//         `Maturity Amount: ${this.maturityAmount}`,
//         `Rate Of Interest In %: ${this.annualRateOfInterest}`
//       ];
//     }
//   }

//   heading = 'Loans';
// }
