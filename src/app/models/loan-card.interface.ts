export interface LoanCard {
    id: number;
    textRows: string[];
    loanAmount?: number; // Optional property for loan amount
    loandisbursmentDate?: Date; // Optional property for loan disbursement date
    emiAmount?: number; // Optional property for EMI amount
    emiDate?: Date; // Optional property for EMI date
    emiPayingType?: string; // Optional property for EMI paying type
    maturityDate?: Date; // Optional property for maturity date
    maturityAmount?: number; // Optional property for maturity amount
    annualRateOfInterest?: number; // Optional property for annual rate of interest
  }