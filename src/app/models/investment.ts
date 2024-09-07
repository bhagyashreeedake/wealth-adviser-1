// export interface ProfileInvestment {
//     uid: string;
//     initialinvestmentAmount?: number;
//     initialinvestmentDate?: Date;
//     regularinvestmentAmount?: number
//     regularinvestmentDate?: Date;
//     investmentType?: string;
//     maturityDate?: Date;
//     maturityAmount?: number;
//     annualRateOfReturn?: number;
//     id?: any;
//     totalInitialInvestment?: number;
//   }


  export interface ProfileInvestment {
    uid: string;
    initialinvestmentAmount?: number;
    initialinvestmentDate?: Date;
    regularinvestmentAmount?: number;
    regularinvestmentDate?: Date;
    investmentType?: string;
    maturityDate?: Date;
    maturityAmount?: number;
    annualRateOfReturn?: number;
    id?: any;
    totalInitialInvestment?: number;
    fitnessScore?: number; // Add this line
  }