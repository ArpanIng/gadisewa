import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function JobDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('service');

  const jobData = {
    id: id,
    status: 'In Progress',
    customer: {
        name: 'John Doe',
        phone: '+1 (555) 123-4567',
        email: 'john.doe@example.com',
        avatar: 'https://i.pravatar.cc/150?u=1',
        rating: 4.8,
        visits: 12
    },
    vehicle: {
        model: 'Toyota Camry 2021',
        plate: 'ABC-123',
        vin: 'JN8...4592',
        color: 'Silver',
        fuel: 'Petrol',
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?auto=format&fit=crop&q=80&w=300'
    },
    timeline: [
        { time: '10:30 AM', date: '24 Oct', title: 'Job Created', user: 'Admin' },
        { time: '11:00 AM', date: '24 Oct', title: 'Vehicle Inspected', user: 'Mike Ross' },
        { time: '11:15 AM', date: '24 Oct', title: 'Service Started', user: 'Mike Ross', active: true },
    ]
  };

  return (
    <div className="flex flex-col h-full gap-6">
       {/* Header */}
       <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="flex items-center gap-4">
             <Link to="/jobs" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
             </Link>
             <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">{jobData.id}</h1>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold uppercase tracking-wide">In Progress</span>
                </div>
                <p className="text-slate-500 text-sm mt-1">Created on 24 Oct, 2024 at 10:30 AM</p>
             </div>
          </div>
          <div className="flex gap-2">
             <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                <span className="material-symbols-outlined">print</span> Print
             </button>
             <button className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 shadow-sm flex items-center gap-2">
                <span className="material-symbols-outlined">check</span> Mark Complete
             </button>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-0">
          {/* Left Column: Customer & Vehicle */}
          <div className="space-y-6">
             {/* Customer Card */}
             <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400">person</span> Customer Details
                </h3>
                <div className="flex items-start gap-4">
                   <img src={jobData.customer.avatar} className="w-12 h-12 rounded-full" alt="" />
                   <div>
                      <h4 className="font-bold text-lg">{jobData.customer.name}</h4>
                      <div className="flex items-center gap-1 text-yellow-500 text-sm my-1">
                         <span className="material-symbols-outlined text-sm filled">star</span> {jobData.customer.rating}
                      </div>
                      <div className="space-y-1 mt-2 text-sm text-slate-600 dark:text-slate-400">
                         <p className="flex items-center gap-2"><span className="material-symbols-outlined text-base">call</span> {jobData.customer.phone}</p>
                         <p className="flex items-center gap-2"><span className="material-symbols-outlined text-base">mail</span> {jobData.customer.email}</p>
                      </div>
                   </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between text-sm">
                   <span className="text-slate-500">Total Visits</span>
                   <span className="font-bold">{jobData.customer.visits}</span>
                </div>
             </div>

             {/* Vehicle Card */}
             <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400">directions_car</span> Vehicle Info
                </h3>
                <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                   <img src={jobData.vehicle.image} className="w-full h-full object-cover" alt="" />
                   <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-bold backdrop-blur-sm">
                      {jobData.vehicle.plate}
                   </div>
                </div>
                <div className="space-y-2 text-sm">
                   <div className="flex justify-between">
                      <span className="text-slate-500">Model</span>
                      <span className="font-medium">{jobData.vehicle.model}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-slate-500">VIN</span>
                      <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{jobData.vehicle.vin}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-slate-500">Fuel Info</span>
                      <span className="font-medium">{jobData.vehicle.fuel}</span>
                   </div>
                </div>
             </div>

             {/* Timeline */}
             <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
                 <h3 className="font-bold text-slate-900 dark:text-white mb-4">Job Progress</h3>
                 <div className="space-y-6 relative pl-2">
                    <div className="absolute top-2 left-[19px] bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
                    {jobData.timeline.map((item, idx) => (
                       <div key={idx} className="relative pl-8">
                          <div className={`absolute left-3 top-1 w-4 h-4 rounded-full border-2 border-white dark:border-[#1e293b] ${item.active ? 'bg-blue-500 ring-2 ring-blue-200' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{item.time} • {item.user}</p>
                       </div>
                    ))}
                 </div>
             </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="lg:col-span-2 flex flex-col bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
             {/* Tabs */}
             <div className="flex border-b border-slate-200 dark:border-slate-700">
                {['service', 'parts', 'billing', 'media'].map(tab => (
                   <button 
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`flex-1 py-4 text-sm font-medium capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-primary-500 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                   >
                     {tab} Details
                   </button>
                ))}
             </div>
             
             <div className="flex-1 p-6 overflow-y-auto">
                {activeTab === 'service' && (
                   <div className="space-y-6">
                      <div className="flex justify-between items-center">
                         <h3 className="font-bold text-lg">Requested Services</h3>
                         <button className="text-primary-600 text-sm font-medium hover:underline">+ Add Service</button>
                      </div>
                      <div className="space-y-4">
                         {[{name: 'Oil Change', status: 'Completed', cost: 500}, {name: 'Brake Inspection', status: 'In Progress', cost: 1200}].map((s, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                     <span className="material-symbols-outlined">build</span>
                                  </div>
                                  <div>
                                     <p className="font-bold text-slate-900 dark:text-white">{s.name}</p>
                                     <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">{s.status}</span>
                                  </div>
                               </div>
                               <p className="font-bold">₹{s.cost}</p>
                            </div>
                         ))}
                      </div>
                      <div>
                         <h3 className="font-bold text-lg mb-2">Technician Notes</h3>
                         <textarea className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 text-sm" placeholder="Add detailed notes here..."></textarea>
                      </div>
                   </div>
                )}
                {activeTab === 'parts' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg">Parts & Consumables</h3>
                            <button className="bg-primary-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary-600">Add Parts</button>
                        </div>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
                                <tr>
                                    <th className="p-3 rounded-l-lg">Part Name</th>
                                    <th className="p-3">Qty</th>
                                    <th className="p-3">Unit Price</th>
                                    <th className="p-3 rounded-r-lg text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-slate-100 dark:border-slate-700">
                                    <td className="p-3">5W-30 Synthetic Oil (1L)</td>
                                    <td className="p-3">4</td>
                                    <td className="p-3">₹800</td>
                                    <td className="p-3 text-right">₹3,200</td>
                                </tr>
                                <tr className="border-b border-slate-100 dark:border-slate-700">
                                    <td className="p-3">Oil Filter (OF-123)</td>
                                    <td className="p-3">1</td>
                                    <td className="p-3">₹350</td>
                                    <td className="p-3 text-right">₹350</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === 'billing' && (
                    <div className="space-y-6">
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                           <h3 className="font-bold text-lg mb-4">Invoice Preview</h3>
                           <div className="space-y-2 text-sm">
                              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                 <span>Total Labor</span>
                                 <span>₹1,700.00</span>
                              </div>
                              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                 <span>Total Parts</span>
                                 <span>₹3,550.00</span>
                              </div>
                              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                 <span>Additional Charges</span>
                                 <span>₹0.00</span>
                              </div>
                              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                 <span>Discount</span>
                                 <span className="text-green-500">- ₹0.00</span>
                              </div>
                              <div className="flex justify-between text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                                 <span>Subtotal</span>
                                 <span>₹5,250.00</span>
                              </div>
                              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                 <span>Tax (18%)</span>
                                 <span>₹945.00</span>
                              </div>
                              <div className="flex justify-between font-bold text-lg text-slate-900 dark:text-white border-t border-slate-300 dark:border-slate-600 pt-3 mt-2">
                                 <span>Grand Total</span>
                                 <span>₹6,195.00</span>
                              </div>
                           </div>
                           <div className="mt-6 flex justify-end gap-3">
                              <button className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium hover:bg-white dark:hover:bg-slate-700">Email Estimate</button>
                              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">Generate Invoice</button>
                           </div>
                        </div>
                    </div>
                )}
                 {activeTab === 'media' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700">
                           <div className="text-center text-slate-500">
                              <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                              <p className="text-xs mt-1">Upload Photo</p>
                           </div>
                        </div>
                        {[1,2].map(i => (
                           <div key={i} className="aspect-square bg-slate-200 rounded-lg overflow-hidden relative group">
                              <img src={`https://images.unsplash.com/photo-1487754180477-1c43cd8a77e2?w=300&h=300&fit=crop`} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                 <button className="text-white p-2 hover:bg-white/20 rounded-full"><span className="material-symbols-outlined">visibility</span></button>
                                 <button className="text-white p-2 hover:bg-white/20 rounded-full"><span className="material-symbols-outlined">delete</span></button>
                              </div>
                           </div>
                        ))}
                    </div>
                )}
             </div>
          </div>
       </div>
    </div>
  );
}