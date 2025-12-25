import React from 'react';

const customers = [
  { id: 1, name: 'Jane Doe', contact: '+1 (555) 123-4567', email: 'jane.doe@example.com', vehicles: 2, jobs: 8, lastVisit: '2023-10-15', tier: 'Gold', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'John Smith', contact: '+1 (555) 987-6543', email: 'john.smith@example.com', vehicles: 1, jobs: 12, lastVisit: '2023-11-01', tier: 'Silver', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Alice Johnson', contact: '+1 (555) 234-5678', email: 'alice.j@example.com', vehicles: 1, jobs: 5, lastVisit: '2023-09-22', tier: 'Bronze', avatar: 'https://i.pravatar.cc/150?u=3' },
];

export default function Customers() {
  return (
    <div className="space-y-6">
       <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">Customers</h1>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
             <span className="material-symbols-outlined text-lg">add</span>
             Add New Customer
          </button>
       </div>

       {/* Search & Filters */}
       <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex gap-4">
          <div className="flex-1 relative">
             <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
             <input type="text" placeholder="Search by name, phone, vehicle..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
          <div className="flex gap-2">
             <button className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"><span className="material-symbols-outlined text-slate-600 dark:text-slate-300">filter_list</span></button>
             <button className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"><span className="material-symbols-outlined text-slate-600 dark:text-slate-300">download</span></button>
          </div>
       </div>

       {/* Customer List */}
       <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-700">
                <tr>
                   <th className="p-4">Customer Name</th>
                   <th className="p-4">Contact</th>
                   <th className="p-4 text-center">Vehicles</th>
                   <th className="p-4 text-center">Total Jobs</th>
                   <th className="p-4">Last Visit</th>
                   <th className="p-4">Loyalty Tier</th>
                   <th className="p-4 text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {customers.map(cust => (
                   <tr key={cust.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4">
                         <div className="flex items-center gap-3">
                            <img src={cust.avatar} alt="" className="w-10 h-10 rounded-full" />
                            <div>
                               <p className="font-bold text-slate-900 dark:text-white hover:underline cursor-pointer">{cust.name}</p>
                               <p className="text-xs text-slate-500">{cust.email}</p>
                            </div>
                         </div>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">{cust.contact}</td>
                      <td className="p-4 text-center"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">{cust.vehicles}</span></td>
                      <td className="p-4 text-center font-bold">{cust.jobs}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">{cust.lastVisit}</td>
                      <td className="p-4">
                         <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            cust.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                            cust.tier === 'Silver' ? 'bg-slate-200 text-slate-800' :
                            'bg-orange-100 text-orange-800'
                         }`}>
                            <span className="material-symbols-outlined text-[14px]">star</span>
                            {cust.tier}
                         </span>
                      </td>
                      <td className="p-4 text-right">
                         <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500"><span className="material-symbols-outlined">more_vert</span></button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
}