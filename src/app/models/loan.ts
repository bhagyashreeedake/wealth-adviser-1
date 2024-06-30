import { LoanCard } from "./loan-card.interface";

export interface ProfileLoan {
  uid: string;
  // loanCards: LoanCard[];// Use LoanCard type
  loanAmount?: number;
  loandisbursmentDate?: Date;
  emiAmount?: number
  emiDate?: Date;
  emiPayingType?: string;
  maturityDate?: Date;
  maturityAmount?: number;
  annualRateOfInterest?: number;
  id: any;
  totalLoanAmount?: number;
}


