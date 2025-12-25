import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_CUSTOMERS = [
  { 
    id: 1, 
    firstName: 'John', 
    lastName: 'Doe', 
    phone: '9876543210', 
    email: 'john.doe@example.com', 
    address: '123 Maple Street, Springfield',
    vehicles: [
      { id: 101, make: 'Toyota', model: 'Camry', year: '2021', reg: 'MH-01-AB-1234', fuel: 'Petrol', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?auto=format&fit=crop&q=80&w=200' },
      { id: 102, make: 'Hyundai', model: 'Creta', year: '2020', reg: 'MH-02-XY-9988', fuel: 'Diesel', image: 'https://images.unsplash.com/photo-1606103836293-c811d726b19a?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  { 
    id: 2, 
    firstName: 'Sarah', 
    lastName: 'Lane', 
    phone: '9800011122', 
    email: 'sarah.l@example.com', 
    address: '45 Lakeview, Mumbai',
    vehicles: []
  }
];

export default function CreateJob() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'quick' | 'detailed'>('detailed');
  const [activeStep, setActiveStep] = useState(1);
  
  // State for Customer Search & Selection
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<typeof MOCK_CUSTOMERS>([]);
  const [customerForm, setCustomerForm] = useState({ firstName: '', lastName: '', phone: '', email: '', address: '' });

  // State for Vehicle Selection
  const [showVehicleForm, setShowVehicleForm] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      if (term.length > 2) {
          const results = MOCK_CUSTOMERS.filter(c => 
              c.firstName.toLowerCase().includes(term.toLowerCase()) || 
              c.lastName.toLowerCase().includes(term.toLowerCase()) ||
              c.phone.includes(term)
          );
          setSearchResults(results);
      } else {
          setSearchResults([]);
      }
  };

  const selectCustomer = (customer: any) => {
      setSelectedCustomer(customer);
      setCustomerForm({
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone,
          email: customer.email,
          address: customer.address
      });
      setSearchTerm('');
      setSearchResults([]);
      // If customer has vehicles, default to list view in next step
      if (customer.vehicles && customer.vehicles.length > 0) {
          setShowVehicleForm(false);
      } else {
          setShowVehicleForm(true);
      }
  };

  const clearCustomer = () => {
      setSelectedCustomer(null);
      setCustomerForm({ firstName: '', lastName: '', phone: '', email: '', address: '' });
      setShowVehicleForm(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
       <div className="flex justify-between items-center">
          <div>
             <h1 className="text-2xl font-bold">Create New Job</h1>
             <p className="text-slate-500 text-sm">Open a job card for a customer vehicle.</p>
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
             <button onClick={() => setMode('quick')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'quick' ? 'bg-white dark:bg-slate-700 shadow text-primary-600' : 'text-slate-500'}`}>Quick Entry</button>
             <button onClick={() => setMode('detailed')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'detailed' ? 'bg-white dark:bg-slate-700 shadow text-primary-600' : 'text-slate-500'}`}>Detailed</button>
          </div>
       </div>

       {mode === 'quick' ? (
           <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm max-w-2xl mx-auto">
               <div className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium mb-1">Customer Phone / Name</label>
                      <input type="text" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-primary-500" placeholder="Search customer..." />
                  </div>
                  <div>
                      <label className="block text-sm font-medium mb-1">Vehicle Registration No.</label>
                      <input type="text" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-primary-500" placeholder="e.g. MH-01-AB-1234" />
                  </div>
                   <div>
                      <label className="block text-sm font-medium mb-1">Service Type</label>
                      <select className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-primary-500">
                          <option>General Service</option>
                          <option>Oil Change</option>
                          <option>Repair</option>
                          <option>Inspection</option>
                      </select>
                  </div>
                   <div>
                      <label className="block text-sm font-medium mb-1">Quick Note</label>
                      <textarea className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-primary-500" rows={3}></textarea>
                  </div>
                  <div className="pt-4 flex gap-3">
                      <button onClick={() => navigate('/jobs')} className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium">Cancel</button>
                      <button className="flex-1 py-2.5 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700">Create Job</button>
                  </div>
               </div>
           </div>
       ) : (
           <div className="flex flex-col lg:flex-row gap-6">
              {/* Stepper Sidebar */}
              <div className="w-full lg:w-64 flex-shrink-0">
                  <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden sticky top-6">
                      {['Customer Info', 'Vehicle Details', 'Service & Issues', 'Inspection', 'Cost Estimate'].map((step, idx) => (
                          <div 
                            key={step} 
                            onClick={() => setActiveStep(idx + 1)}
                            className={`p-4 border-l-4 cursor-pointer transition-colors ${activeStep === idx + 1 ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                          >
                              <div className="flex items-center gap-3">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep === idx + 1 ? 'bg-primary-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                                      {idx + 1}
                                  </div>
                                  <span className={`text-sm font-medium ${activeStep === idx + 1 ? 'text-primary-700 dark:text-primary-300' : 'text-slate-600 dark:text-slate-400'}`}>{step}</span>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm min-h-[500px]">
                  {activeStep === 1 && (
                      <div className="space-y-6 animate-fade-in">
                          <h3 className="text-lg font-bold border-b border-slate-200 dark:border-slate-700 pb-2">Customer Information</h3>
                          
                          {/* Search Area */}
                          {!selectedCustomer ? (
                              <div className="relative">
                                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                  <input 
                                    type="text" 
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="Search existing customer by phone or name..." 
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
                                  />
                                  {searchResults.length > 0 && (
                                      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 overflow-hidden">
                                          {searchResults.map(customer => (
                                              <div 
                                                key={customer.id} 
                                                onClick={() => selectCustomer(customer)}
                                                className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border-b border-slate-100 dark:border-slate-700 last:border-0"
                                              >
                                                  <div className="font-bold text-slate-900 dark:text-white">{customer.firstName} {customer.lastName}</div>
                                                  <div className="text-xs text-slate-500">{customer.phone} • {customer.vehicles.length} Vehicles</div>
                                              </div>
                                          ))}
                                      </div>
                                  )}
                              </div>
                          ) : (
                              <div className="bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/20 rounded-lg p-4 flex justify-between items-center">
                                  <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-300 flex items-center justify-center font-bold">
                                          {selectedCustomer.firstName[0]}
                                      </div>
                                      <div>
                                          <p className="font-bold text-primary-900 dark:text-primary-100">{selectedCustomer.firstName} {selectedCustomer.lastName}</p>
                                          <p className="text-xs text-primary-700 dark:text-primary-300">{selectedCustomer.phone}</p>
                                      </div>
                                  </div>
                                  <button onClick={clearCustomer} className="text-xs font-medium text-slate-500 hover:text-red-500 bg-white dark:bg-slate-800 px-3 py-1 rounded border border-slate-200 dark:border-slate-700">Change</button>
                              </div>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                  <label className="block text-sm font-medium mb-1">First Name</label>
                                  <input 
                                    type="text" 
                                    value={customerForm.firstName}
                                    onChange={e => setCustomerForm({...customerForm, firstName: e.target.value})}
                                    className={`w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-primary-500 ${selectedCustomer ? 'opacity-75' : ''}`}
                                    readOnly={!!selectedCustomer}
                                  />
                              </div>
                              <div>
                                  <label className="block text-sm font-medium mb-1">Last Name</label>
                                  <input 
                                    type="text" 
                                    value={customerForm.lastName}
                                    onChange={e => setCustomerForm({...customerForm, lastName: e.target.value})}
                                    className={`w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-primary-500 ${selectedCustomer ? 'opacity-75' : ''}`}
                                    readOnly={!!selectedCustomer}
                                  />
                              </div>
                              <div>
                                  <label className="block text-sm font-medium mb-1">Mobile Number</label>
                                  <input 
                                    type="tel" 
                                    value={customerForm.phone}
                                    onChange={e => setCustomerForm({...customerForm, phone: e.target.value})}
                                    className={`w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-primary-500 ${selectedCustomer ? 'opacity-75' : ''}`}
                                    readOnly={!!selectedCustomer}
                                  />
                              </div>
                              <div>
                                  <label className="block text-sm font-medium mb-1">Email (Optional)</label>
                                  <input 
                                    type="email" 
                                    value={customerForm.email}
                                    onChange={e => setCustomerForm({...customerForm, email: e.target.value})}
                                    className={`w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-primary-500 ${selectedCustomer ? 'opacity-75' : ''}`}
                                    readOnly={!!selectedCustomer}
                                  />
                              </div>
                              <div className="md:col-span-2">
                                  <label className="block text-sm font-medium mb-1">Address</label>
                                  <input 
                                    type="text" 
                                    value={customerForm.address}
                                    onChange={e => setCustomerForm({...customerForm, address: e.target.value})}
                                    className={`w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-primary-500 ${selectedCustomer ? 'opacity-75' : ''}`}
                                    readOnly={!!selectedCustomer}
                                  />
                              </div>
                          </div>
                      </div>
                  )}

                  {activeStep === 2 && (
                      <div className="space-y-6 animate-fade-in">
                          <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2">
                             <h3 className="text-lg font-bold">Vehicle Details</h3>
                             {selectedCustomer && !showVehicleForm && (
                                 <button 
                                    onClick={() => { setShowVehicleForm(true); setSelectedVehicle(null); }}
                                    className="text-sm font-bold text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/10 px-3 py-1.5 rounded transition-colors flex items-center gap-1"
                                 >
                                    <span className="material-symbols-outlined text-lg">add</span> Add New Vehicle
                                 </button>
                             )}
                             {showVehicleForm && selectedCustomer && (
                                 <button 
                                    onClick={() => setShowVehicleForm(false)}
                                    className="text-sm font-medium text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded transition-colors"
                                 >
                                    Cancel & Select Existing
                                 </button>
                             )}
                          </div>

                          {!showVehicleForm && selectedCustomer ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {selectedCustomer.vehicles.map((v: any) => (
                                      <div 
                                        key={v.id}
                                        onClick={() => setSelectedVehicle(v)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex gap-4 ${selectedVehicle?.id === v.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700'}`}
                                      >
                                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                                              <img src={v.image} className="w-full h-full object-cover" alt="" />
                                          </div>
                                          <div>
                                              <h4 className="font-bold text-slate-900 dark:text-white">{v.make} {v.model}</h4>
                                              <p className="text-sm text-slate-500">{v.year} • {v.fuel}</p>
                                              <div className="mt-2 inline-block bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs px-2 py-0.5 rounded font-mono font-bold">
                                                  {v.reg}
                                              </div>
                                          </div>
                                      </div>
                                  ))}
                                  {selectedCustomer.vehicles.length === 0 && (
                                      <div className="col-span-2 text-center py-8 text-slate-500 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-600">
                                          <p>No vehicles found for this customer.</p>
                                          <button onClick={() => setShowVehicleForm(true)} className="text-primary-600 font-bold hover:underline mt-2">Add First Vehicle</button>
                                      </div>
                                  )}
                              </div>
                          ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up">
                                  <div className="md:col-span-2 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 p-3 rounded-lg text-sm flex items-center gap-2">
                                      <span className="material-symbols-outlined">info</span>
                                      Adding a new vehicle for {selectedCustomer ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}` : 'New Customer'}
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium mb-1">Registration Number</label>
                                      <input type="text" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none uppercase font-mono" placeholder="MH-02-..." autoFocus />
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium mb-1">Odometer Reading (km)</label>
                                      <input type="number" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none" />
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium mb-1">Make</label>
                                      <select className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none">
                                          <option>Select Make</option>
                                          <option>Maruti Suzuki</option>
                                          <option>Hyundai</option>
                                          <option>Honda</option>
                                          <option>Toyota</option>
                                          <option>Tata</option>
                                          <option>Mahindra</option>
                                      </select>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium mb-1">Model</label>
                                      <input type="text" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none" placeholder="e.g. Swift" />
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium mb-1">Fuel Type</label>
                                      <select className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none">
                                          <option>Petrol</option>
                                          <option>Diesel</option>
                                          <option>CNG</option>
                                          <option>Electric</option>
                                      </select>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium mb-1">Fuel Level</label>
                                      <input type="range" className="w-full mt-2" min="0" max="100" step="25" />
                                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                                          <span>E</span><span>1/4</span><span>1/2</span><span>3/4</span><span>F</span>
                                      </div>
                                  </div>
                              </div>
                          )}
                      </div>
                  )}
                  
                  {activeStep === 3 && (
                      <div className="space-y-6 animate-fade-in">
                          <h3 className="text-lg font-bold border-b border-slate-200 dark:border-slate-700 pb-2">Service Request & Issues</h3>
                          
                          <div className="space-y-4">
                              <div>
                                  <label className="block text-sm font-medium mb-2">Select Services</label>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                      {['General Service', 'Oil Change', 'Car Wash', 'Wheel Alignment', 'AC Service', 'Brake Repair', 'Denting/Painting', 'Electrical Check'].map(s => (
                                          <label key={s} className="flex items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                                              <input type="checkbox" className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" />
                                              <span className="ml-3 text-sm">{s}</span>
                                          </label>
                                      ))}
                                  </div>
                              </div>
                              
                              <div>
                                  <label className="block text-sm font-medium mb-1">Customer Complaints / Issues</label>
                                  <textarea className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-primary-500" rows={4} placeholder="Describe specific issues reported by the customer..."></textarea>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-sm font-medium mb-1">Service Advisor</label>
                                      <select className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none">
                                          <option>Select Advisor</option>
                                          <option>Sarah Lane</option>
                                          <option>John Doe</option>
                                      </select>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium mb-1">Expected Delivery</label>
                                      <input type="datetime-local" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}

                  {activeStep === 4 && (
                      <div className="space-y-6 animate-fade-in">
                          <h3 className="text-lg font-bold border-b border-slate-200 dark:border-slate-700 pb-2">Vehicle Inspection (Visual)</h3>
                          
                          <div className="grid grid-cols-2 gap-4">
                              <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                  <span className="material-symbols-outlined text-3xl text-slate-400">add_a_photo</span>
                                  <span className="text-sm text-slate-500 mt-2">Upload Photos</span>
                              </div>
                              <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                                  <p className="text-sm text-slate-500">Interactive Car Diagram Placeholder</p>
                              </div>
                          </div>

                          <div>
                              <label className="block text-sm font-medium mb-2">Inventory Check</label>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                  {['Spare Wheel', 'Jack & Tool Kit', 'Floor Mats', 'Stereo Faceplate', 'Mud Flaps', 'Wheel Caps'].map(item => (
                                      <label key={item} className="flex items-center gap-2">
                                          <input type="checkbox" className="w-4 h-4 rounded text-primary-600" />
                                          <span className="text-sm">{item}</span>
                                      </label>
                                  ))}
                              </div>
                          </div>
                      </div>
                  )}

                   {activeStep === 5 && (
                      <div className="space-y-6 animate-fade-in">
                          <h3 className="text-lg font-bold border-b border-slate-200 dark:border-slate-700 pb-2">Cost Estimation</h3>
                          
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg space-y-3">
                              <div className="flex justify-between text-sm">
                                  <span>Service Charges (Est.)</span>
                                  <input type="text" className="w-24 p-1 text-right border rounded dark:bg-slate-700 dark:border-slate-600 bg-white dark:bg-slate-800" placeholder="0.00" />
                              </div>
                              <div className="flex justify-between text-sm">
                                  <span>Parts Total (Est.)</span>
                                  <input type="text" className="w-24 p-1 text-right border rounded dark:bg-slate-700 dark:border-slate-600 bg-white dark:bg-slate-800" placeholder="0.00" />
                              </div>
                              <div className="flex justify-between font-bold pt-2 border-t border-slate-200 dark:border-slate-700">
                                  <span>Total Estimate</span>
                                  <span>₹0.00</span>
                              </div>
                          </div>

                          <div className="flex items-center gap-2">
                              <input type="checkbox" id="sendEst" className="w-4 h-4 rounded text-primary-600" defaultChecked />
                              <label htmlFor="sendEst" className="text-sm">Send estimate to customer via SMS/WhatsApp</label>
                          </div>
                      </div>
                  )}

                  <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                      <button 
                        onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                        disabled={activeStep === 1}
                        className="px-6 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 font-medium"
                      >
                          Back
                      </button>
                      <button 
                        onClick={() => {
                            if (activeStep < 5) setActiveStep(activeStep + 1);
                            else navigate('/jobs');
                        }}
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-bold shadow-md"
                      >
                          {activeStep === 5 ? 'Create Job Card' : 'Next Step'}
                      </button>
                  </div>
              </div>
           </div>
       )}
    </div>
  );
}