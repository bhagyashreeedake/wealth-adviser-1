// import { Component, OnInit } from '@angular/core';
// // import { FinancescoreService } from './financescore.service';
// import { FinancescoreService } from '../services/financescore.service';
// @Component({
//   selector: 'app-financial-score',
//  templateUrl: './financialScore.component.html',
//   styleUrls: ['./financial-score.component.css']
// })
// export class FinancialScoreComponent implements OnInit {
//   financialScore: number;

//   constructor(private financescoreService: FinancescoreService) {}

//   ngOnInit() {
//     this.financescoreService.getFinancialFitnessScoreForUser().subscribe(
//       score => {
//         this.financialScore = score;
//       },
//       error => {
//         console.error('Error fetching financial score:', error);
//       }
//     );
//   }
// }
