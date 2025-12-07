import React, { useState } from 'react';
import { Property, UserProfile } from '../types';
import { analyzeProperty } from '../services/geminiService';
import ReactMarkdown from 'react-markdown'; // Actually, let's process manually to avoid extra dep if possible, but basic line breaks are fine.
import { 
    MapPin, 
    TrendingUp, 
    User, 
    Info, 
    CheckCircle, 
    Sparkles, 
    Loader2, 
    ArrowRight 
} from './Icons';

interface PropertyDetailsProps {
  property: Property;
  user: UserProfile;
  onInvest: (amount: number) => void;
  onBack: () => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, user, onInvest, onBack }) => {
  const [investAmount, setInvestAmount] = useState<number>(property.minInvestment);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const progress = Math.min((property.fundedAmount / property.totalPrice) * 100, 100);

  const handleAiAnalysis = async () => {
    setLoadingAi(true);
    const result = await analyzeProperty(property);
    setAiAnalysis(result);
    setLoadingAi(false);
    setAnalyzed(true);
  };

  const handleInvestClick = () => {
    if (investAmount > user.walletBalance) {
        alert("Insufficient funds in wallet.");
        return;
    }
    if (investAmount < property.minInvestment) {
        alert(`Minimum investment is ${property.minInvestment} EGP`);
        return;
    }
    onInvest(investAmount);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-fade-in-up">
      <div className="relative h-64 md:h-80">
        <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors"
        >
          ← Back to Marketplace
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-emerald-600 font-semibold text-sm mb-2">
                <span className="uppercase tracking-wide">{property.type}</span>
                <span>•</span>
                <span>{property.status}</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{property.title}</h1>
            <div className="flex items-center text-slate-500">
              <MapPin size={18} className="mr-2" />
              {property.location}
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">Property Highlights</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
                {property.description}
            </p>
            <div className="grid grid-cols-2 gap-4">
                {property.amenities.map(amenity => (
                    <div key={amenity} className="flex items-center text-slate-600 text-sm">
                        <CheckCircle size={16} className="text-emerald-500 mr-2" />
                        {amenity}
                    </div>
                ))}
            </div>
          </div>

          {/* AI Advisor Section */}
          <div className="border border-indigo-100 bg-indigo-50/50 rounded-xl p-6">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-indigo-900">
                    <Sparkles size={20} className="text-indigo-600" />
                    <h3 className="font-bold text-lg">Estathmer AI Advisor</h3>
                </div>
                {!analyzed && (
                    <button 
                        onClick={handleAiAnalysis}
                        disabled={loadingAi}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center disabled:opacity-50"
                    >
                        {loadingAi ? <Loader2 className="animate-spin mr-2" size={16}/> : null}
                        {loadingAi ? 'Analyzing...' : 'Analyze Opportunity'}
                    </button>
                )}
             </div>
             
             {analyzed && (
                 <div className="prose prose-sm prose-indigo text-slate-700 bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                     <div className="whitespace-pre-line">
                        {aiAnalysis}
                     </div>
                 </div>
             )}
             {!analyzed && !loadingAi && (
                 <p className="text-slate-500 text-sm">Get an instant AI-powered risk assessment and potential yield analysis for this property using Gemini.</p>
             )}
          </div>
        </div>

        {/* Sidebar Investment Panel */}
        <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 sticky top-6">
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-slate-500 mb-2">
                        <span>Funded: {Math.round(progress)}%</span>
                        <span className="font-medium text-slate-700">{property.fundedAmount.toLocaleString()} / {property.totalPrice.toLocaleString()} EGP</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
                        <div 
                        className={`h-2 rounded-full ${progress >= 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} 
                        style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-emerald-50 p-3 rounded-lg">
                            <span className="block text-xs text-emerald-600 font-semibold uppercase">Expected ROI</span>
                            <span className="block text-xl font-bold text-emerald-800">{property.expectedRoi}%</span>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <span className="block text-xs text-blue-600 font-semibold uppercase">Rental Yield</span>
                            <span className="block text-xl font-bold text-blue-800">{property.rentalYield}%</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Investment Amount (EGP)</label>
                        <div className="relative">
                            <input 
                                type="number" 
                                value={investAmount}
                                onChange={(e) => setInvestAmount(Number(e.target.value))}
                                min={property.minInvestment}
                                step={1000}
                                className="block w-full pl-3 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition-colors font-medium text-slate-900"
                            />
                            <span className="absolute right-4 top-3 text-slate-400 text-sm font-medium">EGP</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Minimum: {property.minInvestment.toLocaleString()} EGP</p>
                    </div>

                    <div className="pt-2">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-500">Available Wallet</span>
                            <span className="font-bold text-slate-800">{user.walletBalance.toLocaleString()} EGP</span>
                        </div>
                        <button 
                            onClick={handleInvestClick}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-lg transition-colors shadow-lg shadow-emerald-600/20 flex items-center justify-center"
                        >
                            Invest Now <ArrowRight size={18} className="ml-2"/>
                        </button>
                    </div>
                    <p className="text-xs text-center text-slate-400">
                        By investing, you agree to the Terms of Service.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;