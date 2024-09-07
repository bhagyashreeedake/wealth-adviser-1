import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataServiceService } from 'src/app/services/data/data-service.service';
import { IncomeExpenceService } from 'src/app/services/income-expence.service';
import { UsersService } from 'src/app/services/users.service';
import { InvestmentService } from 'src/app/services/investment.service';
import { InsuranceService } from 'src/app/services/insurance.service';
import { LoanService } from 'src/app/services/loan.service';
import { FinancescoreService } from 'src/app/services/financescore.service';
import { ProfileUser } from 'src/app/models/user';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  totalInitialInvestment: number = 0;
  totalLoanAmount: number = 0;
  totalBalance: number = 0;
  totalIncome: number = 0;
  totalExpence: number = 0;
  transactions: any[] = [];
  
  user$: Observable<ProfileUser | null>;
  incomeexpenceInfo: any[] = [];
  myDonutChart: any;

  userName: string = '';
  userEmail: string = '';
  userPhone: string = '';
  userDOB: string = '';
  userAddress: string = '';
  currentUID: string = '';  // Store UID

  constructor(
    private dataservice: DataServiceService,
    private usersService: UsersService,
    private incomeexpenceservice: IncomeExpenceService,
    private investmentservice: InvestmentService,
    private insuranceservice: InsuranceService,
    private loanservice: LoanService,
    private financescore: FinancescoreService
  ) {
    this.user$ = this.usersService.currentUserProfile$;
  }

  ngOnInit(): void {
    this.user$.pipe(
      switchMap((data: ProfileUser | null) => {
        if (!data || !data.uid) {
          return [];
        }

        this.currentUID = data.uid;  // Store the UID

        // Store user details
        this.userName = `${data.firstName} ${data.lastName}`;
        this.userEmail = data.email || '';
        this.userPhone = data.phone || '';
        this.userDOB = data.dateOfBirth || '';
        this.userAddress = data.address || '';

        // Clear previous data to avoid mixing with new data
        this.incomeexpenceInfo = [];
        this.totalBalance = 0;
        this.totalIncome = 0;
        this.totalExpence = 0;
        this.totalInitialInvestment = 0;
        this.totalLoanAmount = 0;

        return this.incomeexpenceservice.getIncomeexpenceByUid(data.uid);
      })
    ).subscribe((incomeexpenceData: any) => {
      if (incomeexpenceData) {
        this.incomeexpenceInfo.push(incomeexpenceData);
        this.setFetchedDataIntoForm(incomeexpenceData);
        this.updateChartData();
        this.calculateScore(); // Calculate score after setting data
      } else {
        console.log('No income-expense data found.');
      }
    });

    // Subscribe to other data sources as before
    this.dataservice.totalBalance$.subscribe(totalBalance => {
      this.totalBalance = totalBalance;
      this.updateChartData();
      this.calculateScore();
    });

    this.dataservice.totalIncome$.subscribe(totalIncome => {
      this.totalIncome = totalIncome;
      this.updateChartData();
      this.calculateScore();
    });

    this.dataservice.totalExpence$.subscribe(totalExpence => {
      this.totalExpence = totalExpence;
      this.updateChartData();
      this.calculateScore();
    });

    this.dataservice.totalInitialInvestment$.subscribe(total => {
      this.totalInitialInvestment = total;
      this.calculateScore();
    });

    this.dataservice.totalLoanAmount$.subscribe(total => {
      this.totalLoanAmount = total;
      this.calculateScore();
    });

    this.initChart();
  }

  setFetchedDataIntoForm(incomeExpenseData: any) {
    this.totalBalance = incomeExpenseData.totalBalance;
    this.totalIncome = incomeExpenseData.totalIncome;
    this.totalExpence = incomeExpenseData.totalExpense;
  }

  calculateScore(): void {
    const inputs = {
      totalBalance: this.totalBalance,
      totalIncome: this.totalIncome,
      totalExpence: this.totalExpence,
      totalInitialInvestment: this.totalInitialInvestment,
      totalLoanAmount: this.totalLoanAmount,
      activeIncome: this.incomeexpenceInfo[0]?.activeIncome || 0,
      passiveIncome: this.incomeexpenceInfo[0]?.passiveIncome || 0,
      otherIncome: this.incomeexpenceInfo[0]?.otherIncome || 0,
      monthlyExpense: this.incomeexpenceInfo[0]?.monthlyExpense || 0,
      quarterlyExpense: this.incomeexpenceInfo[0]?.quarterlyExpense || 0,
      yearlyExpense: this.incomeexpenceInfo[0]?.yearlyExpense || 0,

      userName: this.userName,
      userEmail: this.userEmail,
      userPhone: this.userPhone,
      userDOB: this.userDOB,
      userAddress: this.userAddress,
    };

  const score = this.financescore.calculateFinancialFitnessScore(inputs);
  console.log(`Financial Fitness Score: ${score}`);

  // Debug UID
  console.log(`Current UID: ${this.currentUID}`);

  // Save the score for the current UID
  this.financescore.saveFinancialFitnessScore(this.currentUID, score).subscribe({
  // const ref = doc(this.firestore, 'financialfitnessscore', user.uid);
  //   return from(setDoc(ref, user));
    next: () => {
      console.log('Score saved successfully.');
    },
    error: (error) => {
      console.error('Error saving score:', error);
    }
  });

    this.updateMeter(score);
  }

  updateMeter(score: number): void {
    const meterArrow = document.querySelector('.scoreMeter .meterArrow') as HTMLElement | null;
    const meterScore = document.querySelector('.scoreMeter .meterScore .score') as HTMLElement | null;

    if (meterArrow && meterScore) {
      const rotation = (score / 10) * 225;
      meterArrow.style.transform = `rotate(${rotation}deg)`;
      meterArrow.dataset['score'] = score.toFixed(0);
      meterScore.textContent = `${score.toFixed(0)}/10`;
    }
  }

  initChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.myDonutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.totalExpence, this.totalIncome],
          backgroundColor: ['#ff0000', '#00ff00'],
        }],
        labels: ['Expense', 'Income']
      },
      options: {}
    });
  }

  updateChartData(): void {
    if (this.myDonutChart) {
      this.myDonutChart.data.datasets[0].data = [this.totalExpence, this.totalIncome];
      this.myDonutChart.update();
    }
  }
}



