import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Week 1', value: 4000 },
  { name: 'Week 2', value: 3000 },
  { name: 'Week 3', value: 5000 },
  { name: 'Week 4', value: 2780 },
  { name: 'Week 5', value: 6890 },
  { name: 'Week 6', value: 4390 },
];

const pieData = [
  { name: 'Repairs', value: 400 },
  { name: 'Service', value: 300 },
  { name: 'Parts', value: 300 },
  { name: 'Other', value: 200 },
];

const COLORS = ['#1392ec', '#00C49F', '#FFBB28', '#FF8042'];

const StatCard = ({ title, value, change, icon, color }: any) => (
  <div className="bg-white dark:bg-[#16222d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold mt-2 text-slate-900 dark:text-white">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color} bg-opacity-10 text-opacity-100`}>
        <span className={`material-symbols-outlined ${color.replace('bg-', 'text-')}`}>{icon}</span>
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className={change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
        {change}
      </span>
      <span className="text-slate-400 ml-2">vs last month</span>
    </div>
  </div>
);

const ListItem = ({ name, desc, time, icon, color }: any) => (
  <div className="flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
    <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white shadow-sm`}>
      <span className="material-symbols-outlined text-lg">{icon}</span>
    </div>
    <div className="flex-1">
      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{name}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
    </div>
    <span className="text-xs font-medium text-slate-500">{time}</span>
  </div>
);

const OnboardingModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
        <div className="bg-white dark:bg-[#1e293b] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-32 bg-primary-600 relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-600 font-bold text-3xl shadow-lg z-10">G</div>
            </div>
            <div className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Welcome to GadiSewa!</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Your comprehensive garage management system is ready. Here are a few things you can do to get started:</p>
                
                <div className="space-y-4 text-left mb-8">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined">calendar_month</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white">Create Jobs</h4>
                            <p className="text-xs text-slate-500">Manage vehicle service requests and job cards.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined">inventory_2</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white">Track Inventory</h4>
                            <p className="text-xs text-slate-500">Keep track of spare parts and stock levels.</p>
                        </div>
                    </div>
                     <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined">admin_panel_settings</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white">Manage Users</h4>
                            <p className="text-xs text-slate-500">Invite your staff and manage permissions.</p>
                        </div>
                    </div>
                </div>

                <button onClick={onClose} className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-primary-500/20">
                    Get Started
                </button>
            </div>
        </div>
    </div>
);

export default function Dashboard() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <div className="space-y-6 relative">
      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today's Revenue" value="$1,250" change="+5.2%" icon="payments" color="bg-green-500" />
        <StatCard title="Pending Jobs" value="8" change="-2.1%" icon="pending_actions" color="bg-orange-500" />
        <StatCard title="Active Vehicles" value="15" change="+1.5%" icon="directions_car" color="bg-blue-500" />
        <StatCard title="Monthly Revenue" value="$24,800" change="+8.9%" icon="monitoring" color="bg-purple-500" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#16222d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Revenue Overview</h3>
            <select className="bg-slate-100 dark:bg-slate-800 border-none text-xs rounded-lg px-3 py-1.5 outline-none">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1392ec" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1392ec" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#1392ec" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-[#16222d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
           <h3 className="text-lg font-bold mb-4">Service Breakdown</h3>
           <div className="h-[220px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Legend */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="text-center">
                    <p className="text-2xl font-bold">1.2k</p>
                    <p className="text-xs text-slate-500">Total Jobs</p>
                 </div>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-4 mt-4">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-sm text-slate-600 dark:text-slate-300">{item.name}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Bottom Section: Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white dark:bg-[#16222d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
           <h3 className="text-lg font-bold mb-4">Upcoming Appointments</h3>
           <div className="space-y-1">
              <ListItem name="Alex Johnson" desc="Toyota Camry - Oil Change" time="10:00 AM" icon="directions_car" color="bg-blue-500" />
              <ListItem name="Maria Garcia" desc="Honda Civic - Brake Repair" time="11:30 AM" icon="build" color="bg-orange-500" />
              <ListItem name="David Smith" desc="Ford F-150 - Tire Rotation" time="01:00 PM" icon="settings" color="bg-purple-500" />
           </div>
           <button className="w-full mt-4 text-sm text-primary-600 font-medium hover:underline">View All Appointments</button>
        </div>

        {/* Low Stock */}
        <div className="bg-white dark:bg-[#16222d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
           <h3 className="text-lg font-bold mb-4">Low Stock Alerts</h3>
           <div className="space-y-1">
              <ListItem name="Spark Plugs (SP-400)" desc="Part #789123" time="2 left" icon="warning" color="bg-red-500" />
              <ListItem name="Air Filter (AF-210)" desc="Part #456789" time="5 left" icon="warning" color="bg-red-500" />
              <ListItem name="Brake Pads (BP-01)" desc="Part #123456" time="8 left" icon="priority_high" color="bg-yellow-500" />
           </div>
           <button className="w-full mt-4 text-sm text-primary-600 font-medium hover:underline">Go to Inventory</button>
        </div>

        {/* Staff Status */}
        <div className="bg-white dark:bg-[#16222d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-bold">Staff On Duty</h3>
             <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Active: 12</span>
           </div>
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/150?u=1" alt="Staff" className="w-10 h-10 rounded-full" />
                    <div>
                       <p className="text-sm font-medium">John Doe</p>
                       <p className="text-xs text-slate-500">Lead Mechanic</p>
                    </div>
                 </div>
                 <span className="text-xs text-green-500 font-medium bg-green-500/10 px-2 py-1 rounded">On Duty</span>
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/150?u=2" alt="Staff" className="w-10 h-10 rounded-full" />
                    <div>
                       <p className="text-sm font-medium">Sarah Lane</p>
                       <p className="text-xs text-slate-500">Service Advisor</p>
                    </div>
                 </div>
                 <span className="text-xs text-green-500 font-medium bg-green-500/10 px-2 py-1 rounded">On Duty</span>
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/150?u=3" alt="Staff" className="w-10 h-10 rounded-full" />
                    <div>
                       <p className="text-sm font-medium">Mike Ross</p>
                       <p className="text-xs text-slate-500">Technician</p>
                    </div>
                 </div>
                 <span className="text-xs text-green-500 font-medium bg-green-500/10 px-2 py-1 rounded">On Duty</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}