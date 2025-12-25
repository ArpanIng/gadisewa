import React from 'react';

const invoices = [
  { id: 'INV-1001', date: '24 Oct, 2024', customer: 'John Doe', amount: '₹4,500', status: 'Paid' },
  { id: 'INV-1002', date: '23 Oct, 2024', customer: 'Jane Smith', amount: '₹12,000', status: 'Pending' },
  { id: 'INV-1003', date: '22 Oct, 2024', customer: 'Mike Ross', amount: '₹8,500', status: 'Overdue' },
];

export default function Invoices() {
  return (
    <div className="space-y-6">
       <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
             <h1 className="text-2xl font-bold">Invoices</h1>
             <p className="text-slate-500 text-sm">Manage billing and payments.</p>
          </div>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
             <span className="material-symbols-outlined">add</span> Create Invoice
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
               <p className="text-xs font-bold text-slate-500 uppercase">Total Receivables</p>
               <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">₹24,500</p>
           </div>
           <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
               <p className="text-xs font-bold text-slate-500 uppercase">Paid This Month</p>
               <p className="text-2xl font-bold mt-1 text-green-600">₹1,45,000</p>
           </div>
           <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
               <p className="text-xs font-bold text-slate-500 uppercase">Overdue</p>
               <p className="text-2xl font-bold mt-1 text-red-500">₹8,500</p>
           </div>
       </div>

       <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                   <th className="p-4">Invoice #</th>
                   <th className="p-4">Date</th>
                   <th className="p-4">Customer</th>
                   <th className="p-4">Amount</th>
                   <th className="p-4">Status</th>
                   <th className="p-4 text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {invoices.map(inv => (
                   <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-mono text-xs">{inv.id}</td>
                      <td className="p-4 text-slate-500">{inv.date}</td>
                      <td className="p-4 font-medium">{inv.customer}</td>
                      <td className="p-4 font-bold">{inv.amount}</td>
                      <td className="p-4">
                         <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            inv.status === 'Paid' ? 'bg-green-100 text-green-700' :
                            inv.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                         }`}>
                            {inv.status}
                         </span>
                      </td>
                      <td className="p-4 text-right">
                         <button className="text-slate-400 hover:text-primary-600 p-1"><span className="material-symbols-outlined">download</span></button>
                         <button className="text-slate-400 hover:text-slate-600 p-1"><span className="material-symbols-outlined">visibility</span></button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
}