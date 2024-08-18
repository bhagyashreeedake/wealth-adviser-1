import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancescoreService {

  constructor() { }

  calculateFinancialFitnessScore(data: any): number {
    let score = 0;

    // Sample Logic - Modify according to your needs
    if (data.activeIncome > data.passiveIncome) {
      score += 1;
    }
    if (data.totalBalance > data.totalLoanAmount) {
      score += 1;
    }
    if (data.initialInvestment > data.totalExpence) {
      score += 1;
    }
    if (data.coverAmount > 100000) {  // Example for insurance cover amount
      score += 1;
    }

    console.log(`Calculated Score: ${score}`); // Debugging
    return score;
  }

  saveFinancialFitnessScore(uid: string, score: number): Observable<void> {
    console.log(`Saving Financial Fitness Score for UID ${uid}: ${score}`); // Debugging
    // Replace with actual implementation to save score in Firestore
    return of(); // Placeholder, replace with actual save logic
  }
}
