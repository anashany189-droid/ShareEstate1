import React from 'react';
import { Property, InvestmentStatus } from '../types';
import { MapPin, TrendingUp, User } from './Icons';

interface PropertyCardProps {
  property: Property;
  onClick: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  const progress = Math.min((property.fundedAmount / property.totalPrice) * 100, 100);
  
  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => onClick(property)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-slate-700">
          {property.type}
        </div>
        {property.status === InvestmentStatus.COMPLETED && (
            <div className="absolute top-3 left-3 bg-emerald-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                Fully Funded
            </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{property.title}</h3>
                <div className="flex items-center text-slate-500 text-sm">
                <MapPin size={14} className="mr-1" />
                {property.location}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 my-4">
            <div className="bg-slate-50 p-2 rounded-lg">
                <span className="text-xs text-slate-500 block">Est. Annual ROI</span>
                <div className="flex items-center text-emerald-600 font-bold">
                    <TrendingUp size={14} className="mr-1" />
                    {property.expectedRoi}%
                </div>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg">
                <span className="text-xs text-slate-500 block">Min. Investment</span>
                <div className="flex items-center text-slate-700 font-bold">
                    <User size={14} className="mr-1" />
                    {property.minInvestment.toLocaleString()} EGP
                </div>
            </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Funded: {Math.round(progress)}%</span>
            <span>Target: {property.totalPrice.toLocaleString()} EGP</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${progress >= 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;