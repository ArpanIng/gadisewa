import React from 'react';

const transactions = [
  { id: 'TRN-00124', date: '2024-05-20', category: 'Service', desc: 'Oil change and filter replacement', customer: 'John Doe', amount: 150.00, method: 'Card', status: 'Paid', jobRef: 'JOB-0987' },
  { id: 'TRN-00123', date: '2024-05-19', category: 'Parts Sale', desc: 'Sold 4 new tires', customer: 'Jane Smith', amount: 800.00, method: 'Bank Transfer', status: 'Paid', jobRef: 'JOB-0986' },
  { id: 'TRN-00122', date: '2024-05-19', category: 'Service', desc: 'Brake pad replacement', customer: 'Mike Johnson', amount: 250.00, method: 'Cash', status: 'Paid', jobRef: 'JOB-0985' },
  { id: 'TRN-00121', date: '2024-05-18', category: 'Other', desc: 'Sub-let parking space', customer: 'Local Biz Co.', amount: 100.00, method: 'Bank Transfer', status: 'N/A', jobRef: 'N/A' },
];

export default function Financials() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
         <h1 className="text-3xl font-bold">Income Transactions</h1>
         <button className="bg-primary-500 text-white px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-primary-600 flex items-center gap-2">
            <span className="material-symbols-outlined">add</span> Add Income
         </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 text-sm font-medium">Total Revenue</p>
            <p className="text-2xl font-bold mt-1">$15,450 <span className="text-green-500 text-sm font-medium ml-2">+5.2%</span></p>
         </div>
         <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
             <p className="text-slate-500 text-sm font-medium">Net Profit</p>
             <p className="text-2xl font-bold mt-1">$7,220 <span className="text-green-500 text-sm font-medium ml-2">+12.5%</span></p>
         </div>
         <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
             <p className="text-slate-500 text-sm font-medium">Receivables</p>
             <p className="text-2xl font-bold mt-1">$4,150</p>
             <p className="text-xs text-slate-500">8 Invoices</p>
         </div>
         <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
             <p className="text-slate-500 text-sm font-medium">Payables Due</p>
             <p className="text-2xl font-bold mt-1">$1,800</p>
             <p className="text-xs text-orange-500">Due this week</p>
         </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700">
         <div className="relative flex-1 min-w-[200px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input type="text" placeholder="Search by Customer, ID..." className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
         </div>
         <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700">
            <span className="material-symbols-outlined text-base">calendar_today</span> Date Range
         </button>
         <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700">
            <span className="material-symbols-outlined text-base">category</span> Category
         </button>
         <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700">
            <span className="material-symbols-outlined text-base">download</span> Export
         </button>
      </div>

      {/* Transaction Table */}
      <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                     <th className="p-4">Date</th>
                     <th className="p-4">Transaction ID</th>
                     <th className="p-4">Category</th>
                     <th className="p-4">Customer/Source</th>
                     <th className="p-4">Description</th>
                     <th className="p-4">Method</th>
                     <th className="p-4">Amount</th>
                     <th className="p-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {transactions.map(trn => (
                     <tr key={trn.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="p-4 text-slate-500">{trn.date}</td>
                        <td className="p-4 font-mono text-xs text-slate-500">{trn.id}</td>
                        <td className="p-4">
                           <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                             trn.category === 'Service' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 
                             trn.category === 'Parts Sale' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                             'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                           }`}>
                             {trn.category}
                           </span>
                        </td>
                        <td className="p-4 font-medium text-slate-900 dark:text-white">{trn.customer}</td>
                        <td className="p-4 text-slate-500">{trn.desc}</td>
                        <td className="p-4 text-slate-500">{trn.method}</td>
                        <td className="p-4 font-semibold text-slate-900 dark:text-white">${trn.amount.toFixed(2)}</td>
                        <td className="p-4 text-right">
                           <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><span className="material-symbols-outlined">more_vert</span></button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}