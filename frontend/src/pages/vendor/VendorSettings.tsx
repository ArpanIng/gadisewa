import React, { useState } from 'react';

export default function VendorSettings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
       <div className="mb-6">
          <h1 className="text-2xl font-bold">Vendor Settings</h1>
          <p className="text-slate-500 text-sm">Configure your business profile, shipping, and billing details.</p>
       </div>

       <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
             <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                {['Business Profile', 'Shipping Config', 'Tax & Compliance', 'API & Integrations', 'Notifications'].map(tab => {
                   const key = tab.split(' ')[0].toLowerCase();
                   return (
                      <button 
                        key={key} 
                        onClick={() => setActiveTab(key)}
                        className={`w-full text-left px-4 py-3 text-sm font-medium border-l-4 transition-colors ${activeTab === key ? 'border-purple-500 bg-slate-50 dark:bg-slate-800 text-purple-700 dark:text-purple-400' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
                      >
                        {tab}
                      </button>
                   );
                })}
             </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
             {activeTab === 'business' && (
                <div className="space-y-6">
                   <h2 className="text-xl font-bold border-b border-slate-200 dark:border-slate-700 pb-4">Business Profile</h2>
                   
                   <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                         <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                      </div>
                      <div>
                         <h3 className="font-bold">Company Logo</h3>
                         <p className="text-sm text-slate-500 mb-3">Upload your brand logo for invoices and network listing.</p>
                         <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium hover:bg-slate-200">Upload New</button>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                         <label className="block text-sm font-medium mb-1.5">Company Name</label>
                         <input type="text" defaultValue="AutoParts Distributor Ltd." className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-purple-500" />
                      </div>
                      <div>
                         <label className="block text-sm font-medium mb-1.5">Support Email</label>
                         <input type="email" defaultValue="support@autoparts.com" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-purple-500" />
                      </div>
                      <div>
                         <label className="block text-sm font-medium mb-1.5">Support Phone</label>
                         <input type="text" defaultValue="+91 98000 12345" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-purple-500" />
                      </div>
                      <div className="md:col-span-2">
                         <label className="block text-sm font-medium mb-1.5">Warehouse Address</label>
                         <textarea rows={3} defaultValue="Unit 42, Industrial Estate, Mumbai, MH, 400001" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-purple-500"></textarea>
                      </div>
                   </div>
                </div>
             )}

             {activeTab === 'shipping' && (
                <div className="space-y-6">
                   <h2 className="text-xl font-bold border-b border-slate-200 dark:border-slate-700 pb-4">Shipping Configuration</h2>
                   
                   <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                         <div>
                            <h4 className="font-bold">Standard Delivery</h4>
                            <p className="text-sm text-slate-500">3-5 Business Days</p>
                         </div>
                         <div className="flex items-center gap-4">
                            <span className="font-bold">₹150.00</span>
                            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                                <input type="checkbox" id="toggle1" className="peer absolute opacity-0 w-0 h-0" defaultChecked />
                                <label htmlFor="toggle1" className="block w-full h-full bg-slate-300 dark:bg-slate-600 rounded-full cursor-pointer peer-checked:bg-purple-600 transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-6"></label>
                            </div>
                         </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                         <div>
                            <h4 className="font-bold">Express Shipping</h4>
                            <p className="text-sm text-slate-500">Next Day Delivery</p>
                         </div>
                         <div className="flex items-center gap-4">
                            <span className="font-bold">₹350.00</span>
                             <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                                <input type="checkbox" id="toggle2" className="peer absolute opacity-0 w-0 h-0" defaultChecked />
                                <label htmlFor="toggle2" className="block w-full h-full bg-slate-300 dark:bg-slate-600 rounded-full cursor-pointer peer-checked:bg-purple-600 transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-6"></label>
                            </div>
                         </div>
                      </div>

                      <div className="mt-6">
                          <label className="block text-sm font-medium mb-1.5">Free Shipping Threshold</label>
                          <div className="relative">
                             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                             <input type="number" defaultValue="5000" className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-purple-500" />
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Orders above this amount will have free standard shipping.</p>
                      </div>
                   </div>
                </div>
             )}

             {activeTab === 'tax' && (
                 <div className="space-y-6">
                    <h2 className="text-xl font-bold border-b border-slate-200 dark:border-slate-700 pb-4">Tax & Compliance</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <label className="block text-sm font-medium mb-1.5">GST Number</label>
                          <input type="text" defaultValue="27AAAAA0000A1Z5" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-purple-500" />
                       </div>
                       <div>
                          <label className="block text-sm font-medium mb-1.5">PAN Number</label>
                          <input type="text" defaultValue="ABCDE1234F" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-purple-500" />
                       </div>
                       <div className="md:col-span-2">
                           <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                               <input type="checkbox" className="w-5 h-5 rounded text-purple-600" defaultChecked />
                               <div>
                                   <p className="font-medium text-sm">Automate E-Invoice Generation</p>
                                   <p className="text-xs text-slate-500">Automatically generate IRN for B2B transactions above ₹50k.</p>
                               </div>
                           </label>
                       </div>
                    </div>
                 </div>
             )}

             <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-md transition-all">Save Changes</button>
             </div>
          </div>
       </div>
    </div>
  );
}