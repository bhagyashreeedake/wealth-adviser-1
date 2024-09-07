<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Observable, Subscription } from 'rxjs';
import { switchMap, of } from 'rxjs';
import { DataServiceService } from 'src/app/services/data/data-service.service';
import { IncomeExpenceService } from 'src/app/services/income-expence.service';
import { UsersService } from 'src/app/services/users.service';
import { InvestmentService } from 'src/app/services/investment.service';
import { InsuranceService } from 'src/app/services/insurance.service';
import { LoanService } from 'src/app/services/loan.service';
import { FinancescoreService } from 'src/app/services/financescore.service';
import { ProfileUser } from 'src/app/models/user'; // Import ProfileUser model
=======
// import { Component, OnInit } from '@angular/core';
// import Chart from 'chart.js/auto';
// import { Observable, Subscription } from 'rxjs';
// import { switchMap, of } from 'rxjs';
// import { DataServiceService } from 'src/app/services/data/data-service.service';
// import { IncomeExpenceService } from 'src/app/services/income-expence.service';
// import { UsersService } from 'src/app/services/users.service';
// import { InvestmentService } from 'src/app/services/investment.service';
// import { InsuranceService } from 'src/app/services/insurance.service';
// import { LoanService } from 'src/app/services/loan.service';
// import { FinancescoreService } from 'src/app/services/financescore.service';
// import { ProfileUser } from 'src/app/models/user'; // Import ProfileUser model

// @Component({
//   selector: 'app-charts',
//   templateUrl: './charts.component.html',
//   styleUrls: ['./charts.component.css']
// })
// export class ChartsComponent implements OnInit {
//   totalInitialInvestment: number = 0;
//   totalLoanAmount: number = 0;
//   totalBalance: number = 0;
//   totalIncome: number = 0;
//   totalExpence: number = 0;
//   transactions: any[] = [];
  
//   user$ = this.usersService.currentUserProfile$;
//   incomeexpenceInfo: any[] = [];
//   myDonutChart: any;

//   // Add variables to store user details
//   userName: string = '';
//   userEmail: string = '';
//   userPhone: string = '';
//   userDOB: string = '';
//   userAddress: string = '';

//   constructor(
//     private dataservice: DataServiceService,
//     private usersService: UsersService,
//     private incomeexpenceservice: IncomeExpenceService,
//     private investmentservice: InvestmentService,
//     private insuranceservice: InsuranceService,
//     private loanservice: LoanService,
//     private financescore: FinancescoreService
//   ) {
//     // /this.user$ = this.authService.getCurrentUser(); // Assuming this returns an Observable<ProfileUser | null>
//   }

//   ngOnInit(): void {
//     this.user$.pipe(
//       switchMap((data: ProfileUser | null) => {
//         if (!data || !data.uid) {
//           console.error('User not logged in or UID is missing.');
//           return of(null);
//         }

//         // Store user details
//         this.userName = `${data.firstName} ${data.lastName}`;
//         this.userEmail = data.email || '';
//         this.userPhone = data.phone || '';
//         this.userDOB = data.dateOfBirth || '';
//         this.userAddress = data.address || '';

//         // Clear previous data to avoid mixing with new data
//         this.incomeexpenceInfo = [];
//         this.totalBalance = 0;
//         this.totalIncome = 0;
//         this.totalExpence = 0;
//         this.totalInitialInvestment = 0;
//         this.totalLoanAmount = 0;
//         return this.incomeexpenceservice.getIncomeexpenceByUid(data.uid);
//       })
//     ).subscribe((incomeexpenceData: any) => {
//       if (incomeexpenceData) {
//         this.incomeexpenceInfo.push(incomeexpenceData);
//         this.setFetchedDataIntoForm(incomeexpenceData);
//         this.updateChartData();
//         this.calculateScore(); // Calculate score after setting data
//       } else {
//         console.log('No incomeexpence data found.');
//       }
//     });

//     // Subscribe to other data sources as you did before
//     this.dataservice.totalBalance$.subscribe(totalBalance => {
//       this.totalBalance = totalBalance;
//       this.updateChartData();
//       this.calculateScore(); // Recalculate score on data update
//     });

//     this.dataservice.totalIncome$.subscribe(totalIncome => {
//       this.totalIncome = totalIncome;
//       this.updateChartData();
//       this.calculateScore(); // Recalculate score on data update
//     });

//     this.dataservice.totalExpence$.subscribe(totalExpence => {
//       this.totalExpence = totalExpence;
//       this.updateChartData();
//       this.calculateScore(); // Recalculate score on data update
//     });

//     this.dataservice.totalInitialInvestment$.subscribe(total => {
//       this.totalInitialInvestment = total;
//       this.calculateScore(); // Recalculate score on data update
//     });

//     this.dataservice.totalLoanAmount$.subscribe(total => {
//       this.totalLoanAmount = total;
//       this.calculateScore(); // Recalculate score on data update
//     });

//     this.initChart();
//   }

//   setFetchedDataIntoForm(incomeExpenseData: any) {
//     this.totalBalance = incomeExpenseData.totalBalance;
//     this.totalIncome = incomeExpenseData.totalIncome;
//     this.totalExpence = incomeExpenseData.totalExpense;
//   }

//   calculateScore(): void {
//     this.user$.subscribe((user) => {
//       if (user && user.uid) {
//         const inputs = {
//           totalBalance: this.totalBalance,
//           totalIncome: this.totalIncome,
//           totalExpence: this.totalExpence,
//           totalInitialInvestment: this.totalInitialInvestment,
//           totalLoanAmount: this.totalLoanAmount,
//           activeIncome: this.incomeexpenceInfo[0]?.activeIncome || 0,
//           passiveIncome: this.incomeexpenceInfo[0]?.passiveIncome || 0,
//           otherIncome: this.incomeexpenceInfo[0]?.otherIncome || 0,
//           monthlyExpense: this.incomeexpenceInfo[0]?.monthlyExpense || 0,
//           quarterlyExpense: this.incomeexpenceInfo[0]?.quarterlyExpense || 0,
//           yearlyExpense: this.incomeexpenceInfo[0]?.yearlyExpense || 0,

//           // Include user data in the score calculation
//           userName: this.userName,
//           userEmail: this.userEmail,
//           userPhone: this.userPhone,
//           userDOB: this.userDOB,
//           userAddress: this.userAddress,
//         };

//         const score = this.financescore.calculateFinancialFitnessScore(inputs);
//         console.log(`Financial Fitness Score: ${score}`);
        

//         this.updateMeter(score); // Update the gauge meter with the calculated score

//         this.dataservice.saveOrUpdateFinancialFitnessScore(user.uid, score)
//           .subscribe({
//             next: () => console.log('Financial fitness score saved successfully.'),
//             error: (error) => console.error('Failed to save financial fitness score:', error)
//           });
//       } else {
//         console.error('User not logged in or UID is missing.');
//       }
//     });
//   }

//   updateMeter(score: number): void {
//     const meterArrow = document.querySelector('.scoreMeter .meterArrow') as HTMLElement | null;
//     const meterScore = document.querySelector('.scoreMeter .meterScore .score') as HTMLElement | null;

//     if (meterArrow && meterScore) {
//       const rotation = (score / 10) * 225;
//       meterArrow.style.transform = `rotate(${rotation}deg)`;
//       meterArrow.dataset['score'] = score.toFixed(0);
//       meterScore.textContent = `${score.toFixed(0)}/10`;
//     }
//   }

//   initChart(): void {
//     const ctx = document.getElementById('myChart') as HTMLCanvasElement;
//     this.myDonutChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: {
//         datasets: [{
//           data: [this.totalExpence, this.totalIncome],
//           backgroundColor: ['#ff0000', '#00ff00'],
//         }],
//         labels: ['Expence', 'Income']
//       },
//       options: {}
//     });
//   }

//   updateChartData(): void {
//     if (this.myDonutChart) {
//       this.myDonutChart.data.datasets[0].data = [this.totalExpence, this.totalIncome];
//       this.myDonutChart.update();
//     }
//   }
// }



import { Component, OnInit, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subscription, of, switchMap } from 'rxjs';
import { DataServiceService } from 'src/app/services/data/data-service.service';
import { IncomeExpenceService } from 'src/app/services/income-expence.service';
import { UsersService } from 'src/app/services/users.service';
import { FinancescoreService } from 'src/app/services/financescore.service';
>>>>>>> 1979fa4519242a52498a3de20f0d32c6597a51c4

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
<<<<<<< HEAD
export class ChartsComponent implements OnInit {
  totalInitialInvestment: number = 0;
  totalLoanAmount: number = 0;
  totalBalance: number = 0;
  totalIncome: number = 0;
  totalExpence: number = 0;
  transactions: any[] = [];
  
  user$ = this.usersService.currentUserProfile$;
  incomeexpenceInfo: any[] = [];
  myDonutChart: any;

  // Add variables to store user details
  userName: string = '';
  userEmail: string = '';
  userPhone: string = '';
  userDOB: string = '';
  userAddress: string = '';
=======
export class ChartsComponent implements OnInit, OnDestroy {
  totalInitialInvestment!: number;
  totalLoanAmount!: number;
  totalBalance: number = 0;
  totalIncome: number = 0;
  totalExpence: number = 0;
  userUid!: string;

  private subscriptions: Subscription[] = [];
  myDonutChart: any;
>>>>>>> 1979fa4519242a52498a3de20f0d32c6597a51c4

  constructor(
    private dataservice: DataServiceService,
    private usersService: UsersService,
    private incomeexpenceservice: IncomeExpenceService,
<<<<<<< HEAD
    private investmentservice: InvestmentService,
    private insuranceservice: InsuranceService,
    private loanservice: LoanService,
    private financescore: FinancescoreService
  ) {
    // /this.user$ = this.authService.getCurrentUser(); // Assuming this returns an Observable<ProfileUser | null>
  }

  ngOnInit(): void {
    this.user$.pipe(
      switchMap((data: ProfileUser | null) => {
        if (!data || !data.uid) {
          console.error('User not logged in or UID is missing.');
          return of(null);
        }

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
        console.log('No incomeexpence data found.');
      }
    });

    // Subscribe to other data sources as you did before
    this.dataservice.totalBalance$.subscribe(totalBalance => {
      this.totalBalance = totalBalance;
      this.updateChartData();
      this.calculateScore(); // Recalculate score on data update
    });

    this.dataservice.totalIncome$.subscribe(totalIncome => {
      this.totalIncome = totalIncome;
      this.updateChartData();
      this.calculateScore(); // Recalculate score on data update
    });

    this.dataservice.totalExpence$.subscribe(totalExpence => {
      this.totalExpence = totalExpence;
      this.updateChartData();
      this.calculateScore(); // Recalculate score on data update
    });

    this.dataservice.totalInitialInvestment$.subscribe(total => {
      this.totalInitialInvestment = total;
      this.calculateScore(); // Recalculate score on data update
    });

    this.dataservice.totalLoanAmount$.subscribe(total => {
      this.totalLoanAmount = total;
      this.calculateScore(); // Recalculate score on data update
    });
=======
    private financescore: FinancescoreService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.usersService.currentUserProfile$.pipe(
        switchMap(user => {
          this.userUid = user?.uid || '';
          return user?.uid ? this.incomeexpenceservice.getIncomeexpenceByUid(user.uid) : of(null);
        })
      ).subscribe(incomeExpenceData => {
        if (incomeExpenceData) {
          this.setFetchedDataIntoForm(incomeExpenceData);
          this.calculateScore(incomeExpenceData); // Pass the fetched data as inputs
          this.updateChartData();
        } else {
          console.log('No incomeexpence data found.');
        }
      }),

      this.dataservice.totalBalance$.subscribe(totalBalance => {
        this.totalBalance = totalBalance;
        this.updateChartData();
      }),

      this.dataservice.totalIncome$.subscribe(totalIncome => {
        this.totalIncome = totalIncome;
        this.updateChartData();
      }),

      this.dataservice.totalExpence$.subscribe(totalExpence => {
        this.totalExpence = totalExpence;
        this.updateChartData();
      }),

      this.dataservice.totalInitialInvestment$.subscribe(total => {
        this.totalInitialInvestment = total;
      }),

      this.dataservice.totalLoanAmount$.subscribe(total => {
        this.totalLoanAmount = total;
      })
    );
>>>>>>> 1979fa4519242a52498a3de20f0d32c6597a51c4

    this.initChart();
  }

<<<<<<< HEAD
=======
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

>>>>>>> 1979fa4519242a52498a3de20f0d32c6597a51c4
  setFetchedDataIntoForm(incomeExpenseData: any) {
    this.totalBalance = incomeExpenseData.totalBalance;
    this.totalIncome = incomeExpenseData.totalIncome;
    this.totalExpence = incomeExpenseData.totalExpense;
<<<<<<< HEAD
  }

  calculateScore(): void {
    this.user$.subscribe((user) => {
      if (user && user.uid) {
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

          // Include user data in the score calculation
          userName: this.userName,
          userEmail: this.userEmail,
          userPhone: this.userPhone,
          userDOB: this.userDOB,
          userAddress: this.userAddress,
        };

        const score = this.financescore.calculateFinancialFitnessScore(inputs);
        console.log(`Financial Fitness Score: ${score}`);

        this.updateMeter(score); // Update the gauge meter with the calculated score

        this.dataservice.saveOrUpdateFinancialFitnessScore(user.uid, score)
          .subscribe({
            next: () => console.log('Financial fitness score saved successfully.'),
            error: (error) => console.error('Failed to save financial fitness score:', error)
          });
      } else {
        console.error('User not logged in or UID is missing.');
      }
    });
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
=======
>>>>>>> 1979fa4519242a52498a3de20f0d32c6597a51c4
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
        labels: ['Expence', 'Income']
<<<<<<< HEAD
      },
      options: {}
=======
      }
>>>>>>> 1979fa4519242a52498a3de20f0d32c6597a51c4
    });
  }

  updateChartData(): void {
    if (this.myDonutChart) {
      this.myDonutChart.data.datasets[0].data = [this.totalExpence, this.totalIncome];
      this.myDonutChart.update();
    }
  }
<<<<<<< HEAD
=======

  calculateScore(inputs: any): void {
    const score = this.financescore.calculateFinancialFitnessScore(inputs);
    console.log(`Financial Fitness Score: ${score}`);

    // Save the score in Firebase for the current user
    this.financescore.saveFinancialFitnessScore(this.userUid, score).subscribe({
      next: () => console.log('Score saved successfully'),
      error: err => console.error('Error saving score', err)
    });

    const meterArrow = document.querySelector('.scoreMeter .meterArrow') as HTMLElement | null;
    const meterScore = document.querySelector('.scoreMeter .meterScore .score') as HTMLElement | null;

    const updateMeter = (score: number) => {
      if (meterArrow && meterScore) {
        const rotation = (score / 10) * 225;
        meterArrow.style.transform = `rotate(${rotation}deg)`;
        meterArrow.dataset['score'] = score.toFixed(0);
        meterScore.textContent = `${score.toFixed(0)}/10`;
      }
    };

    setTimeout(() => {
      if (meterArrow) {
        meterArrow.style.transition = 'transform 3s ease-in-out';
        updateMeter(score);
      }
    }, 500);
  }
>>>>>>> 1979fa4519242a52498a3de20f0d32c6597a51c4
}
