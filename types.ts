export enum PropertyType {
  RESIDENTIAL = 'Residential',
  COMMERCIAL = 'Commercial',
  ADMINISTRATIVE = 'Administrative',
  VACATION = 'Vacation'
}

export enum InvestmentStatus {
  FUNDING = 'Funding',
  COMPLETED = 'Completed',
  SOLD = 'Sold'
}

export interface Property {
  id: string;
  title: string;
  location: string;
  type: PropertyType;
  imageUrl: string;
  totalPrice: number;
  fundedAmount: number;
  minInvestment: number;
  expectedRoi: number; // Annual percentage
  rentalYield: number; // Annual percentage
  description: string;
  amenities: string[];
  status: InvestmentStatus;
  fundingDeadline: string;
}

export interface UserInvestment {
  id: string;
  propertyId: string;
  amountInvested: number;
  purchaseDate: string;
  currentValue: number;
}

export interface UserProfile {
  name: string;
  walletBalance: number;
  totalInvested: number;
  totalReturns: number;
}