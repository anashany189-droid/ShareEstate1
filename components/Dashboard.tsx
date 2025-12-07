import React from 'react';
import { UserProfile, UserInvestment, Property } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { TrendingUp, Wallet, Building2, PieChart as PieIcon } from './Icons';

interface DashboardProps {
  user: UserProfile;
  investments: UserInvestment[];
  properties: Property[];
}

const COLORS = ['#059669', '#3b82f6', '#f59e0b', '#6366f1'];

const Dashboard: React.FC<DashboardProps> = ({ user, investments, properties }) => {

  const dataDistribution = investments.map(inv => {
    const prop = properties.find(p => p.id === inv.propertyId);
    return {
      name: prop?.type || 'Unknown',
      value: inv.currentValue
    };
  }).reduce((acc: any[], curr) => {
    const existing = acc.find(item => item.name === curr.name);
    if (existing) {
      existing.value += curr.value;
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, []);

  const projectGrowth = [
    { name: 'Jan', returns: 0 },
    { name: 'Feb', returns: user.totalReturns * 0.1 },
    { name: 'Mar', returns: user.totalReturns * 0.25 },
    { name: 'Apr', returns: user.totalReturns * 0.4 },
    { name: 'May', returns: user.totalReturns * 0.7 },
    { name: 'Jun', returns: user.totalReturns },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <Wallet size={20} />
            </div>
            <h3 className="text-slate-500 font-medium">Total Balance</h3>
          </div>
          <p className="text-2xl font-bold text-slate-800">{user.walletBalance.toLocaleString()} EGP</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Building2 size={20} />
            </div>
            <h3 className="text-slate-500 font-medium">Invested Assets</h3>
          </div>
          <p className="text-2xl font-bold text-slate-800">{user.totalInvested.toLocaleString()} EGP</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-slate-500 font-medium">Total Returns</h3>
          </div>
          <p className="text-2xl font-bold text-slate-800">+{user.totalReturns.toLocaleString()} EGP</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
             <PieIcon size={18} className="text-slate-400"/>
             <h3 className="font-bold text-slate-800">Portfolio Allocation</h3>
          </div>
          <div className="h-64">
            {dataDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dataDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value.toLocaleString()} EGP`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
                <div className="flex h-full items-center justify-center text-slate-400">
                    No active investments
                </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
             <TrendingUp size={18} className="text-slate-400"/>
             <h3 className="font-bold text-slate-800">Projected Returns (6 Months)</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectGrowth}>
                <XAxis dataKey="name" fontSize={12} stroke="#94a3b8" />
                <YAxis fontSize={12} stroke="#94a3b8" tickFormatter={(v) => `${v/1000}k`} />
                <Tooltip formatter={(value: number) => `${value.toLocaleString()} EGP`} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="returns" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Active Investments List */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Your Properties</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Invested</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Current Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {investments.map((inv) => {
                const prop = properties.find(p => p.id === inv.propertyId);
                return (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-md object-cover" src={prop?.imageUrl} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{prop?.title}</div>
                          <div className="text-sm text-slate-500">{prop?.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(inv.purchaseDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right font-medium">
                      {inv.amountInvested.toLocaleString()} EGP
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 text-right font-bold">
                      {inv.currentValue.toLocaleString()} EGP
                    </td>
                  </tr>
                );
              })}
              {investments.length === 0 && (
                <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                        You haven't invested in any properties yet.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;