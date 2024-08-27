// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class FinancescoreService {

//   constructor() { }

//   calculateFinancialFitnessScore(data: any): number {
//     let score = 0;

//     // Sample Logic - Modify according to your needs
//     if (data.activeIncome > data.passiveIncome) {
//       score += 1;
//     }
//     if (data.totalBalance > data.totalLoanAmount) {
//       score += 1;
//     }
//     if (data.totalInitialInvestment > data.totalExpence) {
//       score += 1;
//     }
//     if (data.coverAmount > 100000) {  // Example for insurance cover amount
//       score += 1;
//     }
//     // Example: Adjust score based on user data
//     if (data.userDOB) {
//       const age = this.calculateAge(data.userDOB);
//       if (age > 30) {
//         score += 1;
//       }
//     }

//     console.log(`Calculated Score: ${score}`);
//     return score;
//   }

//   calculateAge(dob: string): number {
//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();

//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }

//     return age;
//   }
  

//   saveFinancialFitnessScore(uid: string, score: number): Observable<void> {
//     console.log(`Saving Financial Fitness Score for UID ${uid}: ${score}`);
//     // Replace with actual implementation to save score in Firestore
//     return of();
//   }
// }




import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancescoreService {

  constructor(private firestore: Firestore) { }

  calculateFinancialFitnessScore(inputs: any): number {
    let Financial_Fitness_Score = 0;

    const {
        Income_Sources,
        Passive_income,
        Active_income,
        dependant,
        expenditure,
        Loan,
        emergency_fund,
        Total_Investment,
        Investment,
        savings,
        Health_insurance,
        Term_insurance,
        Total_Income
    } = inputs;

    if (Active_income <= Passive_income) {
        Financial_Fitness_Score += 1;
    }

    if (dependant >= 2 && Income_Sources <= 1) {
        // Do nothing, as this condition does not affect the score
    } else {
        Financial_Fitness_Score += 1;
    }

    if (expenditure <= 0.5 * Total_Income) {
        Financial_Fitness_Score += 1;
    }

    if (Loan === "y") {
        // Calculate Total Loan AMT and Total Loan EMI
        // Update Financial_Fitness_Score accordingly
    } else {
        Financial_Fitness_Score += 1;
    }

    if (emergency_fund <= Total_Income * 6) {
        Financial_Fitness_Score += 1;
    }

    if (Health_insurance > 0 && Health_insurance <= 2000000) {
        Financial_Fitness_Score += 1;
    }

    if (Term_insurance >= 20 * Total_Income) {
        Financial_Fitness_Score += 1;
    }

    return Financial_Fitness_Score;
  }

  saveFinancialFitnessScore(uid: string, score: number): Observable<void> {
    const ref = doc(this.firestore, 'financialFitnessScores', uid);
    return from(setDoc(ref, { uid, score }));
  }
}