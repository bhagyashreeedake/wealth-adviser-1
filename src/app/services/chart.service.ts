import { Injectable } from '@angular/core';
// import { combineLatest, Observable, of } from 'rxjs';
// import { map, switchMap } from 'rxjs/operators';
// import {  } from '@angular/router';
import { DocumentReference } from '@angular/fire/firestore';

import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { filter, from, map, Observable, of, switchMap, combineLatest} from 'rxjs';
import { AuthService } from './auth.service';
import { InsuraanceDialogComponent } from '../components/insuraance-dialog/insuraance-dialog.component';
import { ProfileUser } from '../models/user';
import { uid } from 'chart.js/dist/helpers/helpers.core';
import { Data } from '@angular/router';
import { IncomeExpenseComponent } from '../components/income-expense/income-expense.component';
import { InsuranceComponent } from '../components/insurance/insurance.component';
import { InvestmentComponent } from '../components/investment/investment.component';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// interface ComponentData {
//   // Define the structure of your data submitted from components
//   uid: string;
//   IncomeExpenseComponent: string;
//   InsuranceComponent: string;
//   InvestmentComponent: string;
//   LoansComponent: string;
//   // ... other data fields
// }




@Injectable({
  providedIn: 'root'
})
// let data: any;
export class ChartService {

  combinedData$!: any;  

  constructor(private firestore: Firestore, private authService: AuthService) {}
  // combinedData$: Observable<ComponentData[]> | undefined;

  // fetchAllData(): void {
  //   this.authService.currentUser$.subscribe(user => {
  //     if (user) { // Check if user is logged in
  //       const uid = user.uid; // Access the UID from the user object

  //       // Get references to documents based on your folder structure
  //       // const userDocRef: DocumentReference<any> = this.firestore.collection('users').doc(userId);
  //       // return userDocRef.valueChanges();
  //       // const userRef = this.firestore.doc<ComponentData>(`users/${uid}`);
  //       const userRef = doc(this.firestore, 'users', uid)
  //       // const investmentRef = this.firestore.doc<ComponentData>(`investment/${uid}`);
  //       // const investmentRef = doc(this.firestore, 'investment', uid)
  //       // const insuranceRef = this.firestore.doc<ComponentData>(`insurance/${uid}`);
  //       // const insuranceRef = doc(this.firestore, 'insurance', uid)
  //       // const incomeExpenseRef = this.firestore.doc<ComponentData>(`incomeExpense/${uid}`);
  //       // const incomeExpenseRef = doc(this.firestore, 'incomeExpense', uid)
  //       const incomeExpenseRef = doc(this.firestore, 'incomeexpence', uid);
        
  //       console.log("income expence information", incomeExpenseRef)

  //       // const loanRef = doc(this.firestore, 'loan', uid)

  //       let a = {
  //         userinfo: userRef,
  //         // invesmentinfo:investmentRef,
  //         // insuranceinfo: insuranceRef,
  //         incomeexpenceinfo: incomeExpenseRef,
  //         // loaninfo: loanRef
  //       }
  //       console.log("totalinformation",a)
  //       // Combine observables using combineLatest
  //       // this.combinedData$ = combineLatest([
  //       //   userRef.valueChanges(),
  //       //   investmentRef.valueChanges(),
  //       //   insuranceRef.valueChanges(),
  //       //   incomeExpenseRef.valueChanges(),
  //       // ])
  //         // .pipe(
  //         //   map(datasets => datasets.filter(data => !!data)) // Filter out null/undefined values
  //         // );
  //     } else {
  //       // Handle case where user is not logged in (e.g., display error message)
  //     }
  //   });
  // }

  async fetchAllData(): Promise<void> {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        const uid = user.uid;
  
        // Get references to documents based on your folder structure
        const userRef = doc(this.firestore, 'users', uid);
        const incomeExpenseRef = doc(this.firestore, 'incomeexpence', uid);
        
        const insuranceRef = doc(this.firestore, 'insurance', uid);
        const investmentRef = doc(this.firestore, 'investment', uid);
        const loanRef = doc(this.firestore, 'loan', uid);
  
        // Fetch data from user collection (separate calls for clarity)

        // getDoc(userRef).then(userDocSnapshot => {
          //         const userInfo = userDocSnapshot.data();
          //         console.log("userref value",userRef)
        getDoc(userRef)
            .then(userSnapshot => {
              if (userSnapshot.exists()) {
                const userinfo = userSnapshot.data();
                console.log("User data:", userinfo);
                // Use the fetched userData
              } else {
                console.log("User document not found");
              }
            })
            .catch(error => {
              console.error("Error fetching user data:", error);
            });

            getDoc(investmentRef)
            .then(investmentSnapshot => {
              if (investmentSnapshot.exists()) {
                const investmentinfo = investmentSnapshot.data();
                console.log("investment data:", investmentinfo);
                // Use the fetched userData
              } else {
                console.log("investment document not found");
              }
            })
            .catch(error => {
              console.error("Error fetching invesstment data:", error);
            });


            getDoc(loanRef)
            .then(loanSnapshot => {
              if (loanSnapshot.exists()) {
                const loaninfo = loanSnapshot.data();
                console.log("loan data:", loaninfo);
                // Use the fetched userData
              } else {
                console.log("loan document not found");
              }
            })
            .catch(error => {
              console.error("Error fetching loan data:", error);
            });
  
  
  
        // Fetch data from income expense collection
        getDoc(incomeExpenseRef)
            .then(incomeSnapshot => {
              if (incomeSnapshot.exists()) {
                const incomeExpenseInfo = incomeSnapshot.data();
                console.log("income expence information", incomeExpenseInfo);
                // Use the fetched incomeExpenseData
                // // Now you can access properties within the incomeExpenseData object
                // const income = incomeExpenseData['income']; // Assuming "income" is a property
                // const expense = incomeExpenseData['expense']; // Assuming "expense" is a property
                // console.log("income value", incomeExpenseData['income'])
              } else {
                console.log("Income expense document not found");
              }
            })
            .catch(error => {
              console.error("Error fetching income expense data:", error);
            });

            getDoc(insuranceRef)
            .then(insuranceSnapshot => {
              if (insuranceSnapshot.exists()) {
                const insuranceinfo = insuranceSnapshot.data();
                console.log("Insurance data:", insuranceinfo)
                // Use the fetched insuranceData
              } else {
                console.log("Insurance document not found");
              }
            })
            .catch(error => {
              console.error("Error fetching insurance data:", error);
            });

            let a = {
                      userinfo: userRef,
                      investmentinfo:investmentRef,
                      insuranceinfo: insuranceRef,
                      incomeexpenceInfo: incomeExpenseRef,
                      loaninfo: loanRef
                    }
                    console.log("totalinformation",a)
                    console.log("inccomeexpenceinfo value", userRef)
                    // Combine observables using combineLatest
                    // this.combinedData$ = combineLatest([
                    //   userRef.valueChanges(),
                    //   investmentRef.valueChanges(),
                    //   insuranceRef.valueChanges(),
                    //   incomeExpenseRef.valueChanges(),
                    // ])
                      // .pipe(
                      //   map(datasets => datasets.filter(data => !!data)) // Filter out null/undefined values
                      // );
                  } else {
                    // Handle case where user is not logged in (e.g., display error message)
                  }
                });
              }
            }
        // /Fetch data from insurance collection
        
  //     }
  //   });
  // }

  // fetchAllData(): void {
  //   console.log('fetchAllData called');

  //   debugger
  //   this.combinedData$ = this.authService.currentUser$.pipe(
  //   map(user => {
  //   this.authService.currentUser$.subscribe(user => {
  //     console.log('currentUser$', user);

  //     if (user) {
  //       console.log('Setting up combinedData$');

  //       const uid = user.uid;

  //       // Create document references
  //       const userRef = doc(this.firestore, 'users', uid);
  //       const investmentRef = doc(this.firestore, 'investment', uid);
  //       const insuranceRef = doc(this.firestore, 'insurance', uid);
  //       const incomeExpenseRef = doc(this.firestore, 'incomeexpence', uid);
  //       const loanRef = doc(this.firestore, 'loan', uid);

  //       // Convert document references to data streams
  //       // const userObs = docData(userRef);
  //       // const investmentObs = docData(investmentRef);
  //       // const insuranceObs = docData(insuranceRef);
  //       // const incomeExpenseObs = docData(incomeExpenseRef);
  //       // const loanObs = docData(loanRef);

  //       getDoc(userRef).then(userDocSnapshot => {
  //         const userInfo = userDocSnapshot.data();
  //         console.log("userref value",userRef)
  //       getDoc(insuranceRef).then(insuranceDocSnapshot => {
  //           const insuranceInfo = insuranceDocSnapshot.data();
  //       getDoc(incomeExpenseRef).then(incomeExpenseDocSnapshot => {
  //             const incomeexpenseInfo = incomeExpenseDocSnapshot.data();
  //       getDoc(loanRef).then(loanDocSnapshot => {
  //               const loanInfo = loanDocSnapshot.data();
      
  //       getDoc(investmentRef).then(investmentDocSnapshot => {
  //           const investmentInfo = investmentDocSnapshot.data();

  //         console.log("userinfo value",userInfo)
  //       // Combine observables into a single observable stream
  //       // this.combinedData$ = combineLatest([
  //       //   userObs,
  //       //   investmentObs,
  //       //   insuranceObs,
  //       //   incomeExpenseObs,
  //       //   loanObs
  //       // ]).pipe(
  //       //   map(([userInfo, investmentInfo, insuranceInfo, incomeExpenseInfo, loanInfo]) => ({
  //       this.combinedData$ = {    
  //           userInfo,
  //           investmentInfo,
  //           insuranceInfo,
  //           incomeexpenseInfo,
  //           loanInfo
             
  //         }
  //         console.log("combined data value",this.combinedData$)
  //       });
  //     });
    
  //     })
  //       });
  //     });
        
  //     } else {
  //       // Optionally handle the case where the user is not logged in
  //       console.error('User not logged in');
  //     }
  //   });
  
  //   }));
  
  // // });

  // }
  // fetchAllData(uid: string): Promise<any> { // Accepts uid as an argument
  //   const userRef = doc(this.firestore, 'users', uid);
  //   const investmentRef = doc(this.firestore, 'investment', uid);
  //   const insuranceRef = doc(this.firestore, 'insurance', uid);
  //   const incomeExpenseRef = doc(this.firestore, 'incomeexpence', uid);
  //   const loanRef = doc(this.firestore, 'loan', uid);

  //   // Fetch data using getDoc or docData
  //   return Promise.all([
  //     getDoc(userRef),
  //     getDoc(investmentRef),
  //     getDoc(insuranceRef),
  //     getDoc(incomeExpenseRef),
  //     getDoc(loanRef)
  //   ]).then(docSnapshots => {
  //     const fetchedData = docSnapshots.map(snapshot => snapshot.data());
  //     return { // Combine fetched data into a single object
  //       userInfo: fetchedData[0],
  //       investmentInfo: fetchedData[1],
  //       insuranceInfo: fetchedData[2],
  //       incomeExpenseInfo: fetchedData[3],
  //       loanInfo: fetchedData[4]
  //     };
  //   });
  // }
// }


