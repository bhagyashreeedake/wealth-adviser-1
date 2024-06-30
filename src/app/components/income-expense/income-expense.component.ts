import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionPopupComponent } from '../transaction-popup/transaction-popup.component';
import { DataServiceService } from 'src/app/services/data/data-service.service';
import { Observable, Subscription } from 'rxjs';
import { IncomeExpenceService } from 'src/app/services/income-expence.service';
// import { TransactionPopupComponent } from './transaction-popup/transaction-popup.component';
import { ProfileIncomeExpence } from 'src/app/models/income-expence';
import { forkJoin, of, switchMap } from 'rxjs';
import { uid } from 'chart.js/dist/helpers/helpers.core';
import { UsersService } from 'src/app/services/users.service';

// export interface TransactionData {

//   transactionType: string;
//   incomeType: string;
//   expenseType: string;
//   description: string;
//   amount: number;
//   date: Date;
// }
@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.css']
})


export class IncomeExpenseComponent implements OnInit {
  // activeIncome!: number;
  // passiveIncome!: number;
  // otherIncome!: number;
  // monthlyExpense!: number;
  // quarterlyExpense!: number;
  // yearlyExpense!: number;
  // totalBalance!: number;
  // transactions: any[] = [];
  // incomeTypes: string[] = ['Active Income', 'Passive Income', 'Other Income'];
  // expenseTypes: string[] = ['Monthly Expense', 'Quarterly Expense', 'Yearly Expense'];
  // currentuid: string = ''; // Initialize currentuid
  
  // totalIncome: number = 0;
  // totalExpense: number = 0;
  // totalAmount: number = 0;
  transactions: any[] = [];
  
  user$ = this.usersService.currentUserProfile$;
  currentuid:any
  incomeexpenceInfo:any[]=[];
  data: any;// Define an array to store transactions
  incomeExpenceData: any;
// openTransactionPopup : boolean = false;
  // uid: string = 'your_uid_here'; // Replace with the UID you want to fetch data for
  // userData$!: Observable<any>;

deleteTransaction(transaction: any) {
// Assuming this method deletes a transaction from the array
const index = this.transactions.indexOf(transaction);
if (index !== -1) {
  this.transactions.splice(index, 1);
}
}
addTransaction(transaction: any) {
  this.transactions.push(transaction);
}

// openNewTransactionDialog() {
//   const newTransaction = {
//   date: '2024-04-10', // Replace with actual date
//   type: 'Expense', // Replace with actual type (Income or Expense)
//   amount: 100 // Replace with actual amount
// };
// this.transactions.push(newTransaction);
// }
  activeIncome: number = 0;
  passiveIncome: number = 0;
  otherIncome: number = 0;
  monthlyExpense: number = 0;
  quarterlyExpense: number = 0;
  yearlyExpense: number = 0;
  totalBalance: number = 0;

  // private  totalBalanceSubscription!: Subscription;


  incomeTypes: string[] = ['Active Income', 'Passive Income', 'Other Income'];
  expenseTypes: string[] = ['Monthly Expense', 'Quarterly Expense', 'Yearly Expense'];


  constructor(private dialog: MatDialog, private dataservice:DataServiceService, private incomeexpenceservice: IncomeExpenceService, private usersService: UsersService) { }
  ngOnInit(): void {
    debugger
    // Fetch data for the specific UID when the component initializes
    // this.userData$ = this.incomeexpenceservice.getIncomeExpenseData(this.uid);
    // // Subscribe to changes and handle data or errors
    // this.userData$.subscribe(
    //   data => {
    //     console.log('User data:', data);
    //     // Update your component properties with the fetched data as needed
    //   },
    //   error => {
    //     console.error('Error fetching user data:', error);
    //   }
    // );
  
    
    // this.totalBalanceSubscription = this.dataservice.getlatestTotalBalance().subscribe(totalbalance=>{
    // this.totalBalance= totalbalance
    //    })
       
      //  this.user$.subscribe(data=>{
      //   this.currentuid = data?.uid
      //   console.log("current user id", this.currentuid);
      //   if (this.currentuid) {
      //           this.fetchIncomeExpenseData(this.currentuid); // Fetch data if UID is available
      //         }
      //  })
    
    this.user$.pipe(
      switchMap((data: any) => {
        if (!data || !data.uid) {
          // If user data or UID is not available, return an observable that emits null
          return of(null);
        } 
        return this.incomeexpenceservice.getIncomeexpenceByUid(data.uid);
        
      
      })
    ).subscribe((incomeexpenceData:any) => {
      if (incomeexpenceData) {
        // Handle the insurance data here
        this.setFetchedDataintoform(incomeexpenceData);
        debugger
        this.incomeexpenceInfo.push(incomeexpenceData)

        console.log('Incomeexpence Data:', incomeexpenceData);
        console.log("incomeexpence inside array ", this.incomeexpenceInfo)
        // console.log("id",this.incomeexpenceInfo[0].id)

        // if(this.incomeexpenceInfo){
        //   for(let i=0;i<this.incomeexpenceInfo.length;i++){

        //     this.updateincomeexpence(this.incomeexpenceInfo[i],this.incomeexpenceInfo[i].id)
        //   }
        // }
      } else {
        // Handle case when insurance data is null
        console.log('No incomeexpence data found.');
      }
    });
    
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

  // ngOnInit(): void {
  //   // Fetch current user's UID
  //   this.usersService.currentUserProfile$.subscribe(data => {
  //     this.currentuid = data?.uid || ''; // Assign UID or empty string if not available
  //     if (this.currentuid) {
  //       this.fetchIncomeExpenseData(this.currentuid); // Fetch data if UID is available
  //     }
  //   });
  // }
  
    
  // fetchIncomeExpenseData(uid: string): void {
  //   // Fetch income and expense data from Firestore using the UID
  //   this.incomeexpenceservice.getIncomeexpenceByUid(uid).subscribe((incomeexpenceData: ProfileIncomeExpence | null) => {
      

  //     if (incomeexpenceData) {
  //       // Data found, update component properties
  //       this.updateComponentProperties(incomeexpenceData);
  //       // console.log("incomeexpence final array ",this.)
  //     } else {
  //       // No data found, handle as needed
  //       console.log('No income-expense data found for the user.');
  //     }
  //   });
  // }

  // updateComponentProperties(data: ProfileIncomeExpence): void {
  //   // Update component properties with fetched data
  //   // this.incomeexpenceInfo = []
  //   this.transactions = []; // Clear transactions array
  //   console.log("incomeexpence outside array ", this.transactions)
  //   // Update other properties as needed
  // }
  
//   updateComponentProperties(data: ProfileIncomeExpence): void {
//     // Update component properties with fetched data
//     const updatedData: ProfileIncomeExpence = {
//         ...data, // Copy existing properties from data
//         incomeexpenceInfo: this.incomeexpenceInfo // Add or update incomeexpenceInfo property with the array
//     };
//     console.log("Updated ProfileIncomeExpence object:", updatedData);
//     // Now you can use the updatedData object as needed
// }
    
  
  // constructor(public dialog: MatDialog, private dataservice:DataServiceService) {}
  // ngOnInit(): void {
  //   this.totalBalanceSubscription = this.dataservice.getlatestTotalBalance().subscribe(totalbalance=>{
  //     this.totalBalance= totalbalance
  //   })
  // }

  openTransactionPopup(): void {
    const dialogRef = this.dialog.open(TransactionPopupComponent, {
      width: '300px',
      data: {
        incomeTypes: this.incomeTypes,
        expenseTypes: this.expenseTypes,
        
      } 
    });

  //   {
  //     "type": "Income",
  //     "incomeType": "Active Income",
  //     "expenseType": "",
  //     "description": "hbiu",
  //     "amount": 1000
  // }
  // {
  //   uid: string;
  //   activeIncome: number;
  //   passiveIncome: number;
  //   otherIncome: number;
  //   monthlyExpense: number;
  //   quarterlyExpense: number;
  //   yearlyExpense: number;
  //   totalBalance: number;
  //   totalIncome:number;
  //   totalExpense:number
  // }
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.type === 'Income') {
          this.handleIncomeTransaction(result);
        } else if (result.type === 'Expense') {
          this.handleExpenseTransaction(result);
        }

        // this.updateincomeexpence(result.type,result.amount);
        let a:ProfileIncomeExpence = this.getalldata()
        console.log('income,ecpense result', result)
        this.incomeexpenceservice.addIncomeexpence(a)
      }
    });

    // dialogRef.afterClosed().subscribe((result: TransactionData) => {
    //   if (result) {
    //     this.transactions = [...this.transactions, result]; // Concatenate new transaction with existing array
      
    // // Add the new transaction to the transactions array
        
    //     console.log("this is data from dialog", result);
    //     console.log('this is transaction Array', this.transactions)
    //   }

    //   if (result) {
    //     if (result.transactionType === 'income') {
    //       this.totalIncome += result.amount;
    //     } else if (result.transactionType === 'expense') {
    //       this.totalExpense += result.amount;
    //     }
    //     this.totalAmount = this.totalIncome - this.totalExpense;
    //   }
    // });
  }
  getalldata(){


    let a:ProfileIncomeExpence= {
      uid: '',
      activeIncome: 0,
      passiveIncome: 0,
      otherIncome: 0,
      monthlyExpense: 0,
      quarterlyExpense: 0,
      yearlyExpense: 0,
      totalBalance: 0,
      totalIncome: 0,
      totalExpense: 0
    }
    a.activeIncome = this.activeIncome;
    a.passiveIncome = this.passiveIncome;
    a.otherIncome = this.otherIncome;
    a.monthlyExpense = this.monthlyExpense;
    a.quarterlyExpense = this.quarterlyExpense;
    a.yearlyExpense=this.yearlyExpense;
    a.totalBalance = this.getTotalBalance();
    a.totalIncome= this.getTotalIncome();
    a.totalExpense = this.getTotalExpense()
    a.uid= this.currentuid

    console.log("total info" , a)
    return a;
  }

  handleIncomeTransaction(data: any): void {
    if (data.incomeType === 'Active Income') {
      this.activeIncome += data.amount;
    } else if (data.incomeType === 'Passive Income') {
      this.passiveIncome += data.amount;
    } else if (data.incomeType === 'Other Income') {
      this.otherIncome += data.amount;
    }
    // this.calculateTotalBalance();
  }
  updateincomeexpence(type: any, amount:any){

    debugger
    if(type == 'Income'){
      this.dataservice.addIncome(amount)
    }else if(type =='Expense'){
      this.dataservice.addExpense(amount)
    }
  }
  handleExpenseTransaction(data: any): void {
    if (data.expenseType === 'Monthly Expense') {
      this.monthlyExpense += data.amount;
    } else if (data.expenseType === 'Quarterly Expense') {
      this.quarterlyExpense += data.amount;
    } else if (data.expenseType === 'Yearly Expense') {
      this.yearlyExpense += data.amount;
    }
    // this.calculateTotalBalance();
  }

  // calculateTotalBalance(): void {
  //   this.totalBalance = this.activeIncome + this.passiveIncome + this.otherIncome - this.monthlyExpense - this.quarterlyExpense - this.yearlyExpense;
  // }

  getTotalIncome(): number {
    return this.activeIncome + this.passiveIncome + this.otherIncome;
  }

  getTotalExpense(): number {
    return this.monthlyExpense + this.quarterlyExpense + this.yearlyExpense;
  }

  getTotalBalance(): number{
    const totalIncome = this.getTotalIncome();
    const totalExpense = this.getTotalExpense();
    return totalIncome - totalExpense;
  }

  getIncomeValue(type: string): number {
    if (type === 'Active Income') {
      return this.activeIncome;
    } else if (type === 'Passive Income') {
      return this.passiveIncome;
    } else if (type === 'Other Income') {
      return this.otherIncome;
    }
    return 0;
  }

  getExpenseValue(type: string): number {
    if (type === 'Monthly Expense') {
      return this.monthlyExpense;
    } else if (type === 'Quarterly Expense') {
      return this.quarterlyExpense;
    } else if (type === 'Yearly Expense') {
      return this.yearlyExpense;
    }
    return 0;
  }

  
}



