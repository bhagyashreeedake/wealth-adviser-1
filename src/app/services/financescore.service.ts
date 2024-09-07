import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancescoreService {

  constructor() { }

  calculateFinancialFitnessScore(data: any): number {
    let score = 0;

	// Condition 1: Compare active income and passive income
    if (data.activeIncome > data.passiveIncome) {
      score += 1;
    }

    // Condition 2: Compare total expense and total income
    if (data.totalExpence <= (0.5 * data.totalIncome)) {
      score += 1;
    }

    // Condition 3: Compare emergency fund (investment with id=1) and total income
    if (data.investments && data.investments[1] && data.investments[1].initialInvestmentAmount >= (6 * data.totalIncome)) {
      score += 1;
    }

    // Condition 4: Compare cover amount (insurance with id=1) and total income
    if (data.insurances && data.insurances[1] && data.insurances[1].coverAmount >= (20 * data.totalIncome)) {
      score += 1;
    }

    // Condition 5: Check specific insurance cover amount (insurance with id=2)
    if (data.insurances && data.insurances[2] && data.insurances[2].coverAmount > 0 && data.insurances[2].coverAmount < 2000000) {
      score += 1;
    }

    
    if (data.totalBalance > data.totalLoanAmount) {
      score += 1;
    }
    if (data.totalInitialInvestment > data.totalExpence) {
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
