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
    if (data.totalInitialInvestment > data.totalExpence) {
      score += 1;
    }
    if (data.coverAmount > 100000) {  // Example for insurance cover amount
      score += 1;
    }
    // Example: Adjust score based on user data
    if (data.userDOB) {
      const age = this.calculateAge(data.userDOB);
      if (age > 30) {
        score += 1;
      }
    }

    console.log(`Calculated Score: ${score}`);
    return score;
  }

  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  saveFinancialFitnessScore(uid: string, score: number): Observable<void> {
    console.log(`Saving Financial Fitness Score for UID ${uid}: ${score}`);
    // Replace with actual implementation to save score in Firestore
    return of();
  }
}
