import React from 'react';

const ReportCard = ({ title, desc, icon, color }: any) => (
  <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all cursor-pointer group">
    <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
       <span className={`material-symbols-outlined text-2xl ${color.replace('bg-', 'text-')}`}>{icon}</span>
    </div>
    <h3 className="font-bold text-lg mb-1 group-hover:text-primary-600 transition-colors">{title}</h3>
    <p className="text-sm text-slate-500">{desc}</p>
  </div>
);

export default function Reports() {
  return (
    <div className="space-y-8">
       <div className="flex justify-between items-center">
          <div>
             <h1 className="text-2xl font-bold">Reports & Analytics</h1>
             <p className="text-slate-500 text-sm">Generate and view detailed performance reports.</p>
          </div>
          <select className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm outline-none">
             <option>This Month</option>
             <option>Last Quarter</option>
             <option>Year to Date</option>
          </select>
       </div>

       <div className="space-y-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Financial Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             <ReportCard title="Profit & Loss" desc="Detailed revenue and expense breakdown." icon="attach_money" color="bg-green-500" />
             <ReportCard title="Tax Summary" desc="GST/Tax collected and paid output." icon="receipt_long" color="bg-blue-500" />
             <ReportCard title="Sales Report" desc="Daily sales and revenue trends." icon="trending_up" color="bg-purple-500" />
             <ReportCard title="Expense Report" desc="Operational costs and overheads." icon="money_off" color="bg-red-500" />
          </div>
       </div>

       <div className="space-y-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Operational Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             <ReportCard title="Job Performance" desc="Completion times and mechanic efficiency." icon="engineering" color="bg-orange-500" />
             <ReportCard title="Inventory Movement" desc="Stock in/out and valuation." icon="inventory" color="bg-teal-500" />
             <ReportCard title="Customer Retention" desc="New vs returning customer analysis." icon="group" color="bg-indigo-500" />
             <ReportCard title="Inventory Valuation" desc="Current value of stock on hand." icon="account_balance" color="bg-emerald-500" />
          </div>
       </div>
    </div>
  );
}