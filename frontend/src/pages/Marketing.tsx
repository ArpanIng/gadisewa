import React from 'react';

export default function Marketing() {
  return (
    <div className="space-y-6">
       <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
             <h1 className="text-2xl font-bold">Marketing</h1>
             <p className="text-slate-500 text-sm">Engage with your customers and boost retention.</p>
          </div>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
             <span className="material-symbols-outlined">campaign</span> New Campaign
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
               <div className="flex justify-between items-start mb-2">
                   <p className="text-sm text-slate-500 font-medium">Active Campaigns</p>
                   <span className="material-symbols-outlined text-green-500">check_circle</span>
               </div>
               <p className="text-2xl font-bold">2</p>
           </div>
           <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
               <div className="flex justify-between items-start mb-2">
                   <p className="text-sm text-slate-500 font-medium">SMS Sent</p>
                   <span className="material-symbols-outlined text-blue-500">sms</span>
               </div>
               <p className="text-2xl font-bold">1,240</p>
           </div>
           <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
               <div className="flex justify-between items-start mb-2">
                   <p className="text-sm text-slate-500 font-medium">Avg. Rating</p>
                   <span className="material-symbols-outlined text-yellow-500">star</span>
               </div>
               <p className="text-2xl font-bold">4.8</p>
           </div>
           <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
               <div className="flex justify-between items-start mb-2">
                   <p className="text-sm text-slate-500 font-medium">Points Redeemed</p>
                   <span className="material-symbols-outlined text-purple-500">loyalty</span>
               </div>
               <p className="text-2xl font-bold">850</p>
           </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
               <h3 className="font-bold mb-4">Quick Broadcast</h3>
               <div className="space-y-4">
                   <textarea className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 outline-none text-sm" rows={3} placeholder="Type your message here..."></textarea>
                   <div className="flex gap-4">
                       <label className="flex items-center gap-2 text-sm">
                           <input type="radio" name="channel" className="text-primary-600" defaultChecked /> SMS
                       </label>
                       <label className="flex items-center gap-2 text-sm">
                           <input type="radio" name="channel" className="text-green-600" /> WhatsApp
                       </label>
                   </div>
                   <div className="pt-2">
                       <p className="text-xs text-slate-500 mb-2">Target Audience: All Active Customers (120)</p>
                       <button className="w-full py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-900">Send Broadcast</button>
                   </div>
               </div>
           </div>

           <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
               <h3 className="font-bold mb-4">Recent Reviews</h3>
               <div className="space-y-4">
                   {[1, 2].map(i => (
                       <div key={i} className="flex gap-3 items-start p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                           <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">JD</div>
                           <div>
                               <div className="flex items-center gap-2">
                                   <p className="font-bold text-sm">John Doe</p>
                                   <div className="flex text-yellow-500 text-[10px] gap-0.5">
                                       <span className="material-symbols-outlined filled text-xs">star</span>
                                       <span className="material-symbols-outlined filled text-xs">star</span>
                                       <span className="material-symbols-outlined filled text-xs">star</span>
                                       <span className="material-symbols-outlined filled text-xs">star</span>
                                       <span className="material-symbols-outlined filled text-xs">star</span>
                                   </div>
                               </div>
                               <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">"Great service! Quick turnaround."</p>
                           </div>
                       </div>
                   ))}
                   <button className="text-sm text-primary-600 font-medium hover:underline w-full text-center">View All Reviews</button>
               </div>
           </div>
       </div>
    </div>
  );
}