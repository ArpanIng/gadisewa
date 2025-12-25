import React, { useState } from 'react';

const expenses = [
  { id: 1, date: '24 Oct, 2024', category: 'Rent', vendor: 'Landlord', amount: '₹25,000', method: 'Bank Transfer' },
  { id: 2, date: '22 Oct, 2024', category: 'Utilities', vendor: 'Electricity Board', amount: '₹4,500', method: 'UPI' },
  { id: 3, date: '20 Oct, 2024', category: 'Inventory', vendor: 'AutoParts Ltd', amount: '₹12,000', method: 'Card' },
];

export default function Expenses() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
       <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
             <h1 className="text-2xl font-bold">Expenses</h1>
             <p className="text-slate-500 text-sm">Track operational costs.</p>
          </div>
          <button onClick={() => setShowModal(true)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
             <span className="material-symbols-outlined">remove</span> Record Expense
          </button>
       </div>

       <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                   <th className="p-4">Date</th>
                   <th className="p-4">Category</th>
                   <th className="p-4">Vendor</th>
                   <th className="p-4">Method</th>
                   <th className="p-4 text-right">Amount</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {expenses.map(exp => (
                   <tr key={exp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 text-slate-500">{exp.date}</td>
                      <td className="p-4">
                          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-medium border border-slate-200 dark:border-slate-700">{exp.category}</span>
                      </td>
                      <td className="p-4 font-medium">{exp.vendor}</td>
                      <td className="p-4 text-slate-500">{exp.method}</td>
                      <td className="p-4 text-right font-bold text-slate-900 dark:text-white">{exp.amount}</td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>

       {showModal && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
               <div className="bg-white dark:bg-[#1e293b] w-full max-w-md rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700">
                   <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                       <h3 className="font-bold text-lg">Add Expense</h3>
                       <button onClick={() => setShowModal(false)}><span className="material-symbols-outlined text-slate-400">close</span></button>
                   </div>
                   <form className="p-6 space-y-4">
                       <div>
                           <label className="block text-sm font-medium mb-1">Date</label>
                           <input type="date" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent" />
                       </div>
                       <div>
                           <label className="block text-sm font-medium mb-1">Category</label>
                           <select className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent">
                               <option>Rent</option>
                               <option>Utilities</option>
                               <option>Inventory</option>
                               <option>Salaries</option>
                               <option>Marketing</option>
                               <option>Other</option>
                           </select>
                       </div>
                       <div>
                           <label className="block text-sm font-medium mb-1">Vendor / Payee</label>
                           <input type="text" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent" placeholder="Who was paid?" />
                       </div>
                       <div>
                           <label className="block text-sm font-medium mb-1">Amount</label>
                           <input type="number" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent" placeholder="0.00" />
                       </div>
                       <div className="pt-4 flex justify-end gap-3">
                           <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium">Cancel</button>
                           <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-bold hover:bg-primary-700">Save Expense</button>
                       </div>
                   </form>
               </div>
           </div>
       )}
    </div>
  );
}