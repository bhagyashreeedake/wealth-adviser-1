// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class FinancescoreService {

//   constructor() { }

//   calculateFinancialFitnessScore(inputs: any): number {
//     let Financial_Fitness_Score = 0;

//     const {
//         Income_Sources,
//         Passive_income,
//         Active_income,
//         dependant,
//         expenditure,
//         Loan,
//         emergency_fund,
//         Total_Investment,
//         Investment,
//         // Investment2,
//         // Investment3,
//         // Investment4,
//         // investment5,
//         savings,
//         Health_insurance,
//         Term_insurance,
//         Total_Income
//     } = inputs;

//     if (Active_income <= Passive_income) {
//         Financial_Fitness_Score += 1;
//     }

//     if (dependant >= 2 && Income_Sources <= 1) {
//         // Do nothing, as this condition does not affect the score
//     } else {
//         Financial_Fitness_Score += 1;
//     }

//     if (expenditure <= 0.5 * Total_Income) {
//         Financial_Fitness_Score += 1;
//     }

//     if (Loan === "y") {
//         // Calculate Total Loan AMT and Total Loan EMI
//         // Update Financial_Fitness_Score accordingly
//     } else {
//         Financial_Fitness_Score += 1;
//     }

//     if (emergency_fund <= Total_Income * 6) {
//         Financial_Fitness_Score += 1;
//     }

//     // const Total_Investment =  Investment + savings;
//     // const Total_investment = Investment2 + Investment3 + Investment4 + investment5;

//     // Calculate Investment percentages and update Financial_Fitness_Score

//     if (Health_insurance > 0 && Health_insurance <= 2000000) {
//         Financial_Fitness_Score += 1;
//     }

//     if (Term_insurance >= 20 * Total_Income) {
//         Financial_Fitness_Score += 1;
//     }

//     return Financial_Fitness_Score;
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
