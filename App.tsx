import React, { useState, useEffect } from 'react';
import { Property, UserProfile, UserInvestment } from './types';
import { MOCK_PROPERTIES } from './services/mockData';
import PropertyCard from './components/PropertyCard';
import PropertyDetails from './components/PropertyDetails';
import Dashboard from './components/Dashboard';
import { Home, PieChart, Wallet, User as UserIcon, Building2 } from './components/Icons';
import { getMarketInsights } from './services/geminiService';

type ViewState = 'MARKETPLACE' | 'DASHBOARD' | 'DETAILS';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('MARKETPLACE');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  // User State (Mocking a logged-in user)
  const [user, setUser] = useState<UserProfile>({
    name: 'Ahmed Hassan',
    walletBalance: 250000,
    totalInvested: 0,
    totalReturns: 0
  });

  const [investments, setInvestments] = useState<UserInvestment[]>([]);
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [marketInsights, setMarketInsights] = useState<string>('');

  useEffect(() => {
    // Load some initial insights
    getMarketInsights().then(setMarketInsights);
  }, []);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setView('DETAILS');
  };

  const handleInvest = (amount: number) => {
    if (!selectedProperty) return;

    // 1. Update User Wallet
    setUser(prev => ({
      ...prev,
      walletBalance: prev.walletBalance - amount,
      totalInvested: prev.totalInvested + amount,
      totalReturns: prev.totalReturns // Returns don't increase immediately
    }));

    // 2. Create Investment Record
    const newInvestment: UserInvestment = {
      id: Math.random().toString(36).substr(2, 9),
      propertyId: selectedProperty.id,
      amountInvested: amount,
      purchaseDate: new Date().toISOString(),
      currentValue: amount // Starts at cost basis
    };
    setInvestments(prev => [...prev, newInvestment]);

    // 3. Update Property Funding Status
    setProperties(prev => prev.map(p => 
      p.id === selectedProperty.id 
        ? { ...p, fundedAmount: p.fundedAmount + amount } 
        : p
    ));

    // 4. Feedback & Redirect
    alert(`Successfully invested ${amount.toLocaleString()} EGP in ${selectedProperty.title}!`);
    setView('DASHBOARD');
    setSelectedProperty(null);
  };

  const NavItem = ({ active, icon: Icon, label, onClick }: any) => (
    <button 
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-emerald-50 text-emerald-700 font-semibold' 
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('MARKETPLACE')}>
            <div className="bg-emerald-600 p-2 rounded-lg">
                <Building2 className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">Estathmer</span>
          </div>

          <nav className="hidden md:flex space-x-2">
            <NavItem 
              active={view === 'MARKETPLACE' || view === 'DETAILS'} 
              icon={Home} 
              label="Marketplace" 
              onClick={() => setView('MARKETPLACE')} 
            />
            <NavItem 
              active={view === 'DASHBOARD'} 
              icon={PieChart} 
              label="My Portfolio" 
              onClick={() => setView('DASHBOARD')} 
            />
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-xs text-slate-500">Wallet Balance</span>
                <span className="font-bold text-emerald-600">{user.walletBalance.toLocaleString()} EGP</span>
            </div>
            <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 border border-slate-200">
                <UserIcon size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {view === 'MARKETPLACE' && (
          <div className="space-y-8 animate-fade-in">
             {/* Hero / Banner */}
             <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-3xl font-bold mb-4">Invest in Premium Egyptian Real Estate from 10,000 EGP</h1>
                    <p className="text-emerald-100 mb-6 text-lg">Join thousands of investors pooling funds to own high-yield properties in the New Capital, North Coast, and more.</p>
                    <div className="flex space-x-4">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                            <p className="text-sm text-emerald-100">Market Insight (AI)</p>
                            <p className="font-medium text-white italic">"{marketInsights || "Loading market trends..."}"</p>
                        </div>
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10">
                    <Building2 size={300} />
                </div>
             </div>

             {/* Listings */}
             <div>
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Active Opportunities</h2>
                        <p className="text-slate-500">Curated high-growth properties open for funding.</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map(property => (
                        <PropertyCard 
                            key={property.id} 
                            property={property} 
                            onClick={handlePropertyClick} 
                        />
                    ))}
                </div>
             </div>
          </div>
        )}

        {view === 'DETAILS' && selectedProperty && (
            <PropertyDetails 
                property={selectedProperty} 
                user={user}
                onInvest={handleInvest}
                onBack={() => setView('MARKETPLACE')}
            />
        )}

        {view === 'DASHBOARD' && (
            <Dashboard 
                user={user} 
                investments={investments} 
                properties={properties} 
            />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 text-sm">© 2024 Estathmer. All rights reserved.</p>
            <p className="text-slate-400 text-xs mt-2">Investments carry risks. Historical returns do not guarantee future performance.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;