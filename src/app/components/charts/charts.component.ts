import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
// import { Subscription } from 'rxjs';
import { DataServiceService } from 'src/app/services/data/data-service.service';
import { Observable, Subscription } from 'rxjs';
import { IncomeExpenceService } from 'src/app/services/income-expence.service';
// import { TransactionPopupComponent } from './transaction-popup/transaction-popup.component';
import { ProfileIncomeExpence } from 'src/app/models/income-expence';
import { forkJoin, of, switchMap } from 'rxjs';
import { uid } from 'chart.js/dist/helpers/helpers.core';
import { UsersService } from 'src/app/services/users.service';
import { InvestmentService } from 'src/app/services/investment.service';
import { InsuranceService } from 'src/app/services/insurance.service';
import { LoanService } from 'src/app/services/loan.service';
import { FinancescoreService } from 'src/app/services/financescore.service';
import { ChartService } from 'src/app/services/chart.service';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit {
  totalInitialInvestment!: number;
  totalLoanAmount!: number;
  totalIncome!:number
  totalExpence!:number 
  // totalBalance!:number 
  transactions: any[] = [];
  
  user$ = this.usersService.currentUserProfile$;
  currentuid:any
  incomeexpenceInfo:any[]=[];
  data: any;// Define an array to store transactions
  incomeExpenceData: any;
  // totalInitialamount!: number
  private totalIncomeSubscription!: Subscription;
  private  totalexpencesubscription!: Subscription;
  private  totalBalanceSubscription!: Subscription;
  private totalInitialInvestmentSubscription!: Subscription;
  private totalLoanamountSubscription!: Subscription;
  myDonutChart: any;
  // usersService: any;
  activeIncome: number = 0;
  passiveIncome: number = 0;
  otherIncome: number = 0;
  monthlyExpense: number = 0;
  quarterlyExpense: number = 0;
  yearlyExpense: number = 0;
  totalBalance: number = 0;

  // private subscription: Subscription = new Subscription();

  // /export class ChartsComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();
  combinedData: any;
    uid: any;
  

  constructor(private dataservice:DataServiceService, private usersService:UsersService, private incomeexpenceservice: IncomeExpenceService, private invesmentservice: InvestmentService, private insuranceservice:InsuranceService, private loanservice:LoanService, private financescore: FinancescoreService, private chartservice: ChartService) {this.chartservice.fetchAllData() }
  calculateScore(inputs: any): void {
    const score = this.financescore.calculateFinancialFitnessScore(inputs);
    console.log(`Financial Fitness Score: ${score}`);
    // Now you can use this score to update your meter gauge component
  }

  
  ngOnInit(): void {
    // this.usersService.currentUser$.subscribe((user: { uid: any; }) => {
    //   if (user) {
    //     const uid = user.uid; // Extract the uid from the user object
        
    //     this.chartservice.fetchAllData(uid) // Call fetchAllData with the uid
    //       .then(combinedData => {
    //         this.combinedData = combinedData;
    //         console.log('Combined data:', this.combinedData);
    //         // Use the combinedData in your component logic
    //         console.log('ngOnInit', this.chartservice.combinedData$);
    //       })
    //       .catch(error => {
    //         console.error('Error fetching combined data:', error);
    //       });
    //   }
    // });
  

    // this.chartservice.fetchAllData()
    console.log('ngOnInit', this.chartservice.combinedData$);
    this.totalBalance = this.chartservice.combinedData$.this.incomeexpenceinfo.totalBalance;
    this.subscription = this.chartservice.combinedData$.subscribe((data: any) => {
      console.log('Combined data:', data);
      this.data = data;
      // Now you can assign this data to a component property (optional)
      // this.data = data;
    });
    // this.subscription.add(
    //   this.chartservice.combinedData$.subscribe(
    //     data => {
    //       console.log('Combined data:', data);
    //       this.data = data;
    //       // You can also assign this data to a component property
    //     },
    //     error => {
    //       console.error('Error fetching combined data:', error);
    //     }
    //   )
    // );
    // ngOnDestroy() {
    //   this.subscription.unsubscribe();
    // }
 
    // this.user$.pipe(
    //   switchMap((data: any) => {
    //     if (!data || !data.uid) {
    //       // If user data or UID is not available, return an observable that emits null
    //       return of(null);
    //     } 
    //     return this.incomeexpenceservice.getIncomeexpenceByUid(data.uid);
        
      
    //   })
    // ).subscribe((incomeexpenceData:any) => {
    //   if (incomeexpenceData) {
    //     // Handle the insurance data here
    //     // this.setFetchedDataintoform(incomeexpenceData);
    //     debugger
    //     this.incomeexpenceInfo.push(incomeexpenceData)

    //     console.log('Incomeexpence Data:', incomeexpenceData);
    //     console.log("incomeexpence inside array ", this.incomeexpenceInfo)
    //     // console.log("id",this.incomeexpenceInfo[0].id)

    //     // if(this.incomeexpenceInfo){
    //     //   for(let i=0;i<this.incomeexpenceInfo.length;i++){

    //     //     this.updateincomeexpence(this.incomeexpenceInfo[i],this.incomeexpenceInfo[i].id)
    //     //   }
    //     // }
    //   } else {
    //     // Handle case when insurance data is null
    //     console.log('No incomeexpence data found.');
    //   }
    // });
    // this.setFetchedDataintoform(this.totalBalance)
   
    // // const totalBalance = this.incomeExpenceData[6];
    // // console.log('totalbalannce value is', totalBalance)
    // this.dataservice.totalInitialInvestment$.subscribe(total => {
    //   this.totalInitialInvestment = total;
    // })

    // this.dataservice.totalLoanAmount$.subscribe(total => {
    //   this.totalLoanAmount = total;
    // })

    // this.totalIncomeSubscription = this.dataservice.getlatestTotalIncome().subscribe(income=>{
    //   this.totalIncome = income;
    //   console.log('income', this.totalIncome)
    //   this.updateChartData();

    // })
    // // this.totalInitialamountSubscription = this.dataservice.getlatestTotalInitialamount().subscribe(totalInitialamount=>{
    // //   this.totalInitialamount = totalInitialamount
    // //   // /console.log('income', this.totalIncome)
    // //   // this.updateChartData();

    // // })

    // this.totalexpencesubscription = this.dataservice.getlatestTotalExpence().subscribe(expence=>{
    //   this.totalExpence = expence;
    //   console.log('expence', this.totalExpence)
    //   this.updateChartData();
    // })

    // // this.totalBalanceSubscription = this.dataservice.getlatestTotalBalance().subscribe(totalbalance=>{
    // //   this.totalBalance= totalbalance
    // // })
    // let expence = this.dataservice.getlatestTotalExpence()
    // Initialize your DOM-related operations in ngOnInit
    document.addEventListener('DOMContentLoaded', () => {
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

      // Initial animation with a predefined score (e.g., 8)
      const initialScore = 10;  // Set the initial score here
      // window.updateInitialScore = (score: number) => {
      //   updateMeter(score);
      // };

      // Delay the initial animation to allow smooth transition
      setTimeout(() => {
        if (meterArrow) {
          meterArrow.style.transition = 'transform 3s ease-in-out';
          updateMeter(initialScore);
        }
      }, 500); 

      
    });
    this.initChart();

    this.calculateScore("")
    console.log('calculated score', this.calculateScore);

  }

  setFetchedDataintoform(incomeexpenceData: any) {
    //   {
    //     "totalBalance": 250000,
    //     "totalIncome": 250000,
    //     "quarterlyExpense": 0,
    //     "uid": "i03bnS3jJJYstb2ZEoxDUj0RasJ3",
    //     "monthlyExpense": 0,
    //     "otherIncome": 0,
    //     "passiveIncome": 250000,
    //     "totalExpense": 0,
    //     "yearlyExpense": 0,
    //     "activeIncome": 0
    // }
      this.quarterlyExpense = incomeexpenceData.quarterlyExpense;
      this.monthlyExpense=incomeexpenceData.monthlyExpense;
      this.otherIncome= incomeexpenceData.otherIncome;
      this.passiveIncome=incomeexpenceData.passiveIncome;
      this.yearlyExpense=incomeexpenceData.yearlyExpense;
      this.activeIncome=incomeexpenceData.activeIncome;
      this.totalBalance = incomeexpenceData.totalBalance;
      
    }

    setFetchedDataIntoForm(incomeExpenseData: any) {
      this.totalBalance = incomeExpenseData.totalBalance;
      console.log('totalbalannce value is', this.totalBalance)
  }
  

  initChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    let chartnumbers:number[] = [];
    chartnumbers.push(this.totalExpence);
    chartnumbers.push(this.totalIncome);
    this.myDonutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
        data: [this.totalExpence, this.totalIncome],
          backgroundColor: ['#ff0000', '#00ff00'],
          // Additional dataset properties if needed
        }],
        labels: ['Expence', 'Income']
      },
      options: {
        // Chart options such as title, legend, etc.
      }
    });
  }
  updateChartData(): void {
    if (this.myDonutChart) {
      this.myDonutChart.data.datasets[0].data = [this.totalExpence, this.totalIncome];
      this.myDonutChart.update();
    }
  }
  
  
}
