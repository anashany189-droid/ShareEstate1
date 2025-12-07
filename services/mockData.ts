import { Property, PropertyType, InvestmentStatus } from '../types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Luxury Apartment - The New Capital',
    location: 'New Administrative Capital, R7 District',
    type: PropertyType.RESIDENTIAL,
    imageUrl: 'https://picsum.photos/id/122/800/600',
    totalPrice: 4500000,
    fundedAmount: 3200000,
    minInvestment: 10000,
    expectedRoi: 18.5,
    rentalYield: 6.2,
    description: 'A premium 3-bedroom apartment overlooking the Green River. High potential for capital appreciation as the government relocates.',
    amenities: ['Security', 'Parking', 'Gym', 'Green Area'],
    status: InvestmentStatus.FUNDING,
    fundingDeadline: '2024-12-31'
  },
  {
    id: '2',
    title: 'Commercial Unit - Sheikh Zayed',
    location: 'Sheikh Zayed City, Arkan Plaza Area',
    type: PropertyType.COMMERCIAL,
    imageUrl: 'https://picsum.photos/id/192/800/600',
    totalPrice: 12000000,
    fundedAmount: 1200000,
    minInvestment: 50000,
    expectedRoi: 22.0,
    rentalYield: 9.5,
    description: 'Prime retail space in a high-traffic area. Tenant contract secured for 5 years with a multinational coffee chain.',
    amenities: ['High Visibility', 'Finished', 'HVAC'],
    status: InvestmentStatus.FUNDING,
    fundingDeadline: '2025-03-15'
  },
  {
    id: '3',
    title: 'Sea View Villa - North Coast',
    location: 'Ras El Hekma, North Coast',
    type: PropertyType.VACATION,
    imageUrl: 'https://picsum.photos/id/238/800/600',
    totalPrice: 8500000,
    fundedAmount: 8000000,
    minInvestment: 25000,
    expectedRoi: 25.0,
    rentalYield: 12.0,
    description: 'Seasonal rental powerhouse. Fully furnished villa with private pool, walking distance to the beach.',
    amenities: ['Pool', 'Beach Access', 'Furnished', 'Concierge'],
    status: InvestmentStatus.FUNDING,
    fundingDeadline: '2024-10-30'
  },
  {
    id: '4',
    title: 'Office Space - 5th Settlement',
    location: 'New Cairo, 5th Settlement',
    type: PropertyType.ADMINISTRATIVE,
    imageUrl: 'https://picsum.photos/id/48/800/600',
    totalPrice: 5500000,
    fundedAmount: 5500000,
    minInvestment: 20000,
    expectedRoi: 16.0,
    rentalYield: 8.0,
    description: 'Modern office space in a business hub. Fully leased to a software company.',
    amenities: ['Meeting Rooms', 'High Speed Internet', '24/7 Access'],
    status: InvestmentStatus.COMPLETED,
    fundingDeadline: '2024-01-15'
  }
];