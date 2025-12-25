import React from 'react';

const inventoryItems = [
  { id: 1, name: 'Bosch Fuel Pump', desc: 'For Toyota Innova Crysta', sku: 'BOS-FP-001', cat: 'Engine Parts', stock: 120, buyPrice: 2500, sellPrice: 3200, supplier: 'Auto Parts Inc.', status: 'In Stock', img: 'https://images.unsplash.com/photo-1635784183209-e8c690e250f2?w=100&h=100&fit=crop' },
  { id: 2, name: 'Michelin Brake Pads', desc: 'For Maruti Suzuki Swift', sku: 'MIC-BP-203', cat: 'Brakes', stock: 8, buyPrice: 800, sellPrice: 1150, supplier: 'CarNeeds Ltd.', status: 'Low Stock', img: 'https://images.unsplash.com/photo-1600161599939-23d16036198c?w=100&h=100&fit=crop' },
  { id: 3, name: 'Mann Air Filter', desc: 'For Honda City', sku: 'MAN-AF-112', cat: 'Engine Parts', stock: 0, buyPrice: 450, sellPrice: 650, supplier: 'Auto Parts Inc.', status: 'Out of Stock', img: 'https://images.unsplash.com/photo-1517059478735-9b73637b6c5e?w=100&h=100&fit=crop' },
  { id: 4, name: 'Castrol GTX 5W-30', desc: 'Synthetic Engine Oil', sku: 'CAS-OIL-530', cat: 'Lubricants', stock: 50, buyPrice: 1800, sellPrice: 2400, supplier: 'Global Lubricants', status: 'In Stock', img: 'https://images.unsplash.com/photo-1560892804-d4024c3c92b6?w=100&h=100&fit=crop' },
];

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold">Inventory Dashboard</h1>
            <p className="text-slate-500 text-sm">Overview of your garage's inventory.</p>
        </div>
        <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Add New Product
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Value</p>
            <p className="text-2xl font-bold mt-1">₹12,50,450</p>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Low Stock</p>
                    <p className="text-2xl font-bold mt-1">15</p>
                </div>
                <span className="material-symbols-outlined text-yellow-500">warning</span>
            </div>
            <button className="text-xs text-primary-500 font-medium mt-2 hover:underline">View Items</button>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Out of Stock</p>
                    <p className="text-2xl font-bold mt-1 text-red-500">8</p>
                </div>
            </div>
             <button className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded mt-2 font-medium">Reorder Now</button>
        </div>
         <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending Orders</p>
                    <p className="text-2xl font-bold mt-1">5</p>
                </div>
            </div>
             <button className="text-xs text-primary-500 font-medium mt-2 hover:underline">Quick View</button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-wrap gap-4">
         <div className="flex-1 min-w-[200px]">
            <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input type="text" placeholder="Search part name, SKU, brand..." className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
            </div>
         </div>
         <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500">
            <option>All Categories</option>
            <option>Engine Parts</option>
            <option>Brakes</option>
         </select>
         <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500">
            <option>All Suppliers</option>
         </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                     <th className="p-4 font-semibold text-slate-600 dark:text-slate-400"><input type="checkbox" className="rounded border-gray-300"/></th>
                     <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">Part</th>
                     <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">SKU</th>
                     <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">Category</th>
                     <th className="p-4 font-semibold text-slate-600 dark:text-slate-400 text-center">Stock</th>
                     <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">Price (Buy/Sell)</th>
                     <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">Supplier</th>
                     <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {inventoryItems.map((item) => (
                     <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-4"><input type="checkbox" className="rounded border-gray-300"/></td>
                        <td className="p-4">
                           <div className="flex items-center gap-3">
                              <img src={item.img} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                              <div>
                                 <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                                 <p className="text-xs text-slate-500">{item.desc}</p>
                              </div>
                           </div>
                        </td>
                        <td className="p-4 font-mono text-xs text-slate-500">{item.sku}</td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">{item.cat}</td>
                        <td className="p-4 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                item.status === 'In Stock' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                                {item.status} ({item.stock})
                            </span>
                        </td>
                        <td className="p-4">
                           <div className="text-xs">
                              <p className="text-slate-500">Buy: ₹{item.buyPrice}</p>
                              <p className="font-bold text-slate-900 dark:text-white">Sell: ₹{item.sellPrice}</p>
                           </div>
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">{item.supplier}</td>
                        <td className="p-4">
                           <button className="text-slate-400 hover:text-primary-500"><span className="material-symbols-outlined">more_vert</span></button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         {/* Pagination */}
         <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
             <p className="text-sm text-slate-500">Showing <span className="font-bold">1-4</span> of 1000</p>
             <div className="flex gap-2">
                <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-sm">Previous</button>
                <button className="px-3 py-1 bg-primary-500 text-white rounded text-sm">1</button>
                <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-sm">2</button>
                <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-sm">Next</button>
             </div>
         </div>
      </div>
    </div>
  );
}