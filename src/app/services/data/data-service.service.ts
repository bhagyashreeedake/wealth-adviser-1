import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  [x: string]: any;

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
  

  constructor() { }

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
    // Assume you have separate methods to handle investment, premium, and maturity
    this.addExpense(initialinvestmentAmount);
    this.addExpense(regularinvestmentAmount);
    this.addIncome(maturityAmount);
    this.addInitialamount(totalInitialInvestment)
  }

  public getlatestTotalIncome(){
    return this.income$;
  }

  public getlatestTotalExpence(){
    return this.expense$;
  }

  public getlatestTotalBalance(){
    return this.totalBalance$
  }

  public getlatestTotalInitialamount(){
    return this.totalInitialamont$
  }

  private updateTotalBalance() {
    const totalBalance = this.incomeSubject.value - this.expenseSubject.value;
    this.totalBalanceSubject.next(totalBalance);
  }

  
}
