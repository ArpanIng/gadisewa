import React, { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-slate-500 text-sm">Manage your garage preferences and configuration.</p>
       </div>

       <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
             <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                {['General', 'Business Profile', 'Tax & Billing', 'Notifications', 'Security', 'Integrations'].map(tab => (
                   <button 
                     key={tab} 
                     onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                     className={`w-full text-left px-4 py-3 text-sm font-medium border-l-4 transition-colors ${activeTab === tab.toLowerCase().split(' ')[0] ? 'border-primary-500 bg-slate-50 dark:bg-slate-800 text-primary-700 dark:text-primary-400' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
                   >
                     {tab}
                   </button>
                ))}
             </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
             {activeTab === 'general' && (
                <div className="space-y-6">
                   <h2 className="text-xl font-bold border-b border-slate-200 dark:border-slate-700 pb-2">General Settings</h2>
                   <div className="grid grid-cols-1 gap-4">
                      <div>
                         <label className="block text-sm font-medium mb-1">Currency</label>
                         <select className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none">
                            <option>INR (₹)</option>
                            <option>USD ($)</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-sm font-medium mb-1">Time Zone</label>
                         <select className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none">
                            <option>(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-sm font-medium mb-1">Date Format</label>
                         <select className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none">
                            <option>DD/MM/YYYY</option>
                            <option>MM/DD/YYYY</option>
                         </select>
                      </div>
                   </div>
                </div>
             )}

             {activeTab === 'business' && (
                <div className="space-y-6">
                   <h2 className="text-xl font-bold border-b border-slate-200 dark:border-slate-700 pb-2">Business Profile</h2>
                   <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400">Logo</div>
                      <button className="text-sm text-primary-600 font-medium hover:underline">Change Logo</button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                         <label className="block text-sm font-medium mb-1">Garage Name</label>
                         <input type="text" defaultValue="GadiSewa Main Garage" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none" />
                      </div>
                      <div>
                         <label className="block text-sm font-medium mb-1">Contact Phone</label>
                         <input type="text" defaultValue="+91 98765 43210" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none" />
                      </div>
                      <div>
                         <label className="block text-sm font-medium mb-1">Email</label>
                         <input type="email" defaultValue="admin@gadisewa.com" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none" />
                      </div>
                      <div className="md:col-span-2">
                         <label className="block text-sm font-medium mb-1">Address</label>
                         <textarea rows={3} defaultValue="123 Motor Lane, Auto City" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none"></textarea>
                      </div>
                   </div>
                </div>
             )}

             {activeTab === 'tax' && (
                 <div className="space-y-6">
                    <h2 className="text-xl font-bold border-b border-slate-200 dark:border-slate-700 pb-2">Tax & Billing</h2>
                    <div className="space-y-4">
                       <div>
                          <label className="block text-sm font-medium mb-1">GST/Tax Number</label>
                          <input type="text" defaultValue="27ABCDE1234F1Z5" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none" />
                       </div>
                       <div className="flex items-center justify-between py-2">
                          <span className="font-medium text-sm">Default Tax Rate</span>
                          <input type="text" defaultValue="18%" className="w-20 p-1.5 text-right rounded border border-slate-300 dark:border-slate-600 bg-transparent" />
                       </div>
                       <div className="flex items-center gap-2">
                          <input type="checkbox" className="w-4 h-4 rounded text-primary-600" defaultChecked />
                          <span className="text-sm">Prices are tax inclusive by default</span>
                       </div>
                    </div>
                 </div>
             )}

             <div className="mt-8 flex justify-end">
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md transition-all">Save Changes</button>
             </div>
          </div>
       </div>
    </div>
  );
}