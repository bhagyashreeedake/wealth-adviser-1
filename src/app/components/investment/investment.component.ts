import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvesstmentDialogComponent } from '../invesstment-dialog/invesstment-dialog.component';
import { DataServiceService } from 'src/app/services/data/data-service.service';
import { forkJoin, of, switchMap } from 'rxjs';
import { InvestmentService } from 'src/app/services/investment.service';
import { ProfileInvestment } from 'src/app/models/investment';
import { uid } from 'chart.js/dist/helpers/helpers.core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent {
  [x: string]: any;
  // Define variables to hold investment data
  initialinvestmentAmount!: number;
  initialinvestmentDate!: Date;
  regularinvestmentAmount!: number
  regularinvestmentDate!: Date;
  investmentType!: string;
  maturityDate!: Date;
  maturityAmount!: number;
  annualRateOfReturn!: number;
  id: any;
  totalInitialInvestment: number = 0; 
  user$ = this.usersService.currentUserProfile$;
  investmentInfo:any[]=[];
  data: any;// Initialize total initial investment
  // emergencyFund!: number;
  // realEstateValue!: number
  // monthlySIP!: number;
  // debtInvestment!: number;
  // equityInvestment!: number
  // goldBondInvestment!: number;
  // savingsInvestment!: number;

  constructor(private dialog: MatDialog, private dataservice:DataServiceService, private investmentservice: InvestmentService, private usersService: UsersService) { }
  ngOnInit(): void {
    debugger
    
    this.user$.pipe(
      switchMap((data: any) => {
        if (!data || !data.uid) {
          // If user data or UID is not available, return an observable that emits null
          return of(null);
        } 
        return this.investmentservice.getInvestmentByUid(data.uid, '1');
      
      })
    ).subscribe((investmentData:any) => {
      if (investmentData) {
        // Handle the insurance data here
        debugger
        this.investmentInfo.push(investmentData)
        console.log('Investment Data:', investmentData);
        console.log("investment inside array ", this.investmentInfo)
        console.log("id",this.investmentInfo[0].id)

        if(this.investmentInfo){
          for(let i=0;i<this.investmentInfo.length;i++){

            this.updateInvestments(this.investmentInfo[i],this.investmentInfo[i].id)
          }
        }
      } else {
        // Handle case when insurance data is null
        console.log('No investment data found.');
      }
    });
 
 
  }

  openInvestmentDialog(id: number): void {
    const dialogRef = this.dialog.open(InvesstmentDialogComponent, {
      width: '500px',
      data: {
        initialinvestmentAmount: this.initialinvestmentAmount,
        initialinvestmentDate: this.initialinvestmentDate,
        regularinvestmentAmount: this.regularinvestmentAmount,
        regularinvestmentDate: this.regularinvestmentDate,
        investmentType: this.investmentType,
        maturityDate: this.maturityDate,
        maturityamount: this.maturityAmount,
        annualRateOfReturn: this.annualRateOfReturn,
        id:id
        // emergencyFund: this.emergencyFund,
        // realEstateValue: this.realEstateValue,
        // monthlySIP: this.monthlySIP,
        // debtInvestment: this.debtInvestment,
        // equityInvestment: this.equityInvestment,
        // goldBondInvestment: this.goldBondInvestment,
        // savingsInvestment: this.savingsInvestment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateInvestments(result, id);
      }
    });
  }

  updateInvestments(data: any, id: number): void {
    // Update investment data based on the result from the dialog
    this.initialinvestmentAmount = data.initialinvestmentAmount;
    this.initialinvestmentDate = data.initialinvestmentDate;
    this.regularinvestmentAmount = data.regularinvestmentAmount;
    this.regularinvestmentDate = data.regularinvestmentDate;
    this.investmentType = data.investmentType;
    this.maturityDate = data.maturityDate;
    this.maturityAmount = data.maturityAmount;
    this.annualRateOfReturn = data.annualRateOfReturn;
    this.totalInitialInvestment += this.initialinvestmentAmount;
    this['dataservice'].setTotalInitialInvestment(this.totalInitialInvestment);


    // this.totalInitialInvestment += this.initialinvestmentAmount;

    // Find the small card with the matching id and update its textRows
  const smallCardIndex = this.smallCards.findIndex(card => card.id === id);
  if (smallCardIndex !== -1) {
    this.smallCards[smallCardIndex].textRows.push(
      "Initial investment Amount Rs." + this.initialinvestmentAmount,
      "Initila investment Date: " + this.initialinvestmentDate,
      "Regular investment Amount Rs." + this.regularinvestmentAmount,
      "Regular investment Date: " + this.regularinvestmentDate,
      "Investment Type: " + this.investmentType,
      "Maturity Date: " + this.maturityDate,
      "Maturity Amount: " + this.maturityAmount,
      "Rate Of Return In %: " + this.annualRateOfReturn
    );
  }
    // this.emergencyFund = data.emergencyFund;
    // this.realEstateValue = data.realEstateValue;
    // this.monthlySIP = data.monthlySIP;
    // this.debtInvestment = data.debtInvestment;
    // this.equityInvestment = data.equityInvestment;
    // this.goldBondInvestment = data.goldBondInvestment;
    // this.savingsInvestment = data.savingsInvestment;
    // this.smallCards[0].textRows.push("actual Rs."+this.emergencyFund)
    // this.smallCards[1].textRows.push("actual Rs."+this.realEstateValue)
    // this.smallCards[2].textRows.push("actual Rs."+this.monthlySIP)
    // this.smallCards[3].textRows.push("actual Rs."+this.debtInvestment)
    // this.smallCards[4].textRows.push("actual Rs."+this.equityInvestment)
    // this.smallCards[5].textRows.push("actual Rs."+this.goldBondInvestment)
    // this.smallCards[6].textRows.push("actual Rs."+this.savingsInvestment)
  }
   

  heading = 'Investment';
  smallCards: { id: number; textRows: string[] }[] = [
    { id: 1, textRows:  ['Expected Rs. 50000000/-', 'Emergency Fund'] },
    { id: 2, textRows: ['Expected Rs. 10000000/-', 'Mutual Funds'] },
    { id: 3, textRows: ['Expected Rs. 20000000/-', 'Equity'] },
    { id: 4, textRows: ['Expected Rs. 40000000/-', 'Debt'] },
    { id: 5, textRows: ['Expected Rs. 30000000/-', 'Gold'] },
    { id: 6, textRows: ['Expected Rs. 400000/-', 'Real Estate/Properties'] },
    { id: 7, textRows: ['Expected Rs. 6000000/-', 'NPS/PPF'] }
  ];

  addSmallCard() {
    this.smallCards.push({
      id: this.smallCards.length + 1,
      textRows: [`Card ${this.smallCards.length + 1}.1`, `Card ${this.smallCards.length + 1}.2`, `Card ${this.smallCards.length + 1}.3`]
    });
  }

  cardClickHandler(cardText: string) {
    alert(`Clicked: ${cardText}`);
  }

  
  // onSubmit(initialinvestmentAmount: number, regularinvestmentAmount: number, maturityAmount: number) {
  //   this.dataservice.addInvestment(initialinvestmentAmount, regularinvestmentAmount, maturityAmount);
  // }
}

