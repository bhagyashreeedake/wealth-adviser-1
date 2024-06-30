export interface ProfileInsurance {
    uid: string;
    coverAmount?: number;
    insuredDate?: Date;
    premiumAmount?: number
    premiumDate?: Date;
    premiumPayingType?: string;
    maturityDate?: Date;
    maturityAmount?: number;
    annualRateOfReturn?: number;
  }