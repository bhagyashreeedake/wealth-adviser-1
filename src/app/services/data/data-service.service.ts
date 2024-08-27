import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private incomeSubject = new BehaviorSubject<number>(0);
  private expenseSubject = new BehaviorSubject<number>(0);
  private totalBalanceSubject = new BehaviorSubject<number>(0);
  private totalInitialamountsubject = new BehaviorSubject<number>(0); 
  private totalInitialInvestmentSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalInitialInvestment$: Observable<number> = this.totalInitialInvestmentSubject.asObservable();
  private totalLoanAmountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalLoanAmount$: Observable<number> = this.totalLoanAmountSubject.asObservable();

  income$ = this.incomeSubject.asObservable();
  expense$ = this.expenseSubject.asObservable();
  totalBalance$ = this.totalBalanceSubject.asObservable();
  totalInitialamont$ = this.totalInitialamountsubject.asObservable();
  totalIncome$ = this.incomeSubject.asObservable();
  totalExpence$ = this.expenseSubject.asObservable();
  
  constructor(private firestore: Firestore) { }

  setTotalInitialInvestment(total: number): void {
    this.totalInitialInvestmentSubject.next(total);
  }

  setTotalLoanAmount(total: number): void {
    this.totalLoanAmountSubject.next(total);
  }

  addIncome(amount: number) {
    this.incomeSubject.next(this.incomeSubject.value + amount);
    this.updateTotalBalance();
  }

  addExpense(amount: number) {
    this.expenseSubject.next(this.expenseSubject.value + amount);
    this.updateTotalBalance();
  }

  addInitialamount(amount: number) {
    this.totalInitialamountsubject.next(this.totalInitialamountsubject.value + amount);
  }

  addInvestment(initialinvestmentAmount: number, regularinvestmentAmount: number, maturityAmount: number, totalInitialInvestment: number) {
    this.addExpense(initialinvestmentAmount);
    this.addExpense(regularinvestmentAmount);
    this.addIncome(maturityAmount);
    this.addInitialamount(totalInitialInvestment);
  }

  public getlatestTotalIncome() {
    return this.income$;
  }

  public getlatestTotalExpence() {
    return this.expense$;
  }

  public getlatestTotalBalance() {
    return this.totalBalance$;
  }

  public getlatestTotalInitialamount() {
    return this.totalInitialamont$;
  }

  private updateTotalBalance() {
    const totalBalance = this.incomeSubject.value - this.expenseSubject.value;
    this.totalBalanceSubject.next(totalBalance);
  }

  // Method to save or update the financial fitness score in Firestore
  saveOrUpdateFinancialFitnessScore(uid: string, score: number): Observable<void> {
    const scoreData = { score, lastUpdated: new Date() };
    const scoreDocRef = doc(this.firestore, `financialfitnessscore/${uid}`);

    return new Observable<void>(observer => {
      // Check if the document exists
      getDoc(scoreDocRef).then(docSnapshot => {
        if (!docSnapshot.exists()) {
          // If document does not exist, create it
          setDoc(scoreDocRef, scoreData, { merge: true })
            .then(() => {
              console.log(`Financial fitness score for UID ${uid} created and saved successfully.`);
              observer.next();
              observer.complete();
            })
            .catch(error => {
              console.error('Error creating document:', error);
              observer.error(error);
            });
        } else {
          // If document exists, update it
          setDoc(scoreDocRef, scoreData, { merge: true })
            .then(() => {
              console.log(`Financial fitness score for UID ${uid} updated successfully.`);
              observer.next();
              observer.complete();
            })
            .catch(error => {
              console.error('Error updating document:', error);
              observer.error(error);
            });
        }
      }).catch(error => {
        console.error('Error checking document existence:', error);
        observer.error(error);
      });
    }).pipe(
      catchError(error => {
        console.error('Error in saveOrUpdateFinancialFitnessScore:', error);
        return of(); // Return an observable to keep the stream alive
      })
    );
  }
}
