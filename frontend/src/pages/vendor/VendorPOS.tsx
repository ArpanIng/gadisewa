import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const vendorProducts = [
  { id: 1, name: 'Brake Pads (Bulk Pack)', price: 15000, stock: 50, img: 'https://images.unsplash.com/photo-1600161599939-23d16036198c?w=150&h=150&fit=crop' },
  { id: 2, name: 'Engine Oil Drum (200L)', price: 45000, stock: 12, img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=150&h=150&fit=crop' },
  { id: 3, name: 'Oil Filters (Box of 50)', price: 8500, stock: 100, img: 'https://images.unsplash.com/photo-1517059478735-9b73637b6c5e?w=150&h=150&fit=crop' },
  { id: 4, name: 'Spark Plugs (Set of 100)', price: 12000, stock: 80, img: 'https://images.unsplash.com/photo-1615900119312-2acd3a71f3aa?w=150&h=150&fit=crop' },
  { id: 5, name: 'Clutch Plates (Universal)', price: 3500, stock: 40, img: 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?w=150&h=150&fit=crop' },
  { id: 6, name: 'Headlight Assembly', price: 2200, stock: 60, img: 'https://images.unsplash.com/photo-1487754180477-1c43cd8a77e2?w=150&h=150&fit=crop' },
];

const KeypadModal = ({ isOpen, onClose, onEnter, title = "Enter Quantity" }: { isOpen: boolean, onClose: () => void, onEnter: (val: string) => void, title?: string }) => {
  const [value, setValue] = useState("");

  const handlePress = (key: string | number) => {
    if (key === 'clear') setValue("");
    else if (key === 'backspace') setValue(prev => prev.slice(0, -1));
    else if (key === '.') {
        if (!value.includes('.')) setValue(prev => prev + key);
    }
    else setValue(prev => prev + key.toString());
  };

  const handleSubmit = () => {
      onEnter(value);
      setValue("");
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
        <div className="bg-white dark:bg-[#1e293b] w-full max-w-xs rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transform transition-all scale-100">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{title}</h3>
                <button onClick={onClose} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-500"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="p-4 bg-slate-100 dark:bg-slate-900 text-right text-3xl font-mono font-bold tracking-widest h-20 flex items-center justify-end border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                {value || <span className="text-slate-400">0</span>}
            </div>
            <div className="grid grid-cols-3 gap-1 p-2 bg-slate-50 dark:bg-slate-800">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'backspace'].map((key) => (
                    <button 
                        key={key}
                        onClick={() => handlePress(key)}
                        className={`h-16 text-2xl font-bold rounded-lg transition-all active:scale-95 flex items-center justify-center ${key === 'backspace' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-white dark:bg-[#16222d] text-slate-900 dark:text-white shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                    >
                        {key === 'backspace' ? <span className="material-symbols-outlined">backspace</span> : key}
                    </button>
                ))}
            </div>
            <div className="p-2 grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                 <button onClick={() => handlePress('clear')} className="py-3 font-bold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">Clear</button>
                 <button onClick={handleSubmit} className="py-3 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-md transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">check</span> Enter
                 </button>
            </div>
        </div>
    </div>
  );
};

export default function VendorPOS() {
  const [cart, setCart] = useState<{ id: number, name: string, price: number, stock: number, img: string, qty: number }[]>([]);
  const [keypadOpen, setKeypadOpen] = useState(false);
  const [activeCartIndex, setActiveCartIndex] = useState<number | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const updateQty = (index: number, change: number) => {
      const newCart = [...cart];
      newCart[index].qty = Math.max(1, newCart[index].qty + change);
      setCart(newCart);
  };

  const removeItem = (index: number) => {
      const newCart = cart.filter((_, i) => i !== index);
      setCart(newCart);
  };

  const openKeypad = (index: number) => {
      setActiveCartIndex(index);
      setKeypadOpen(true);
  };

  const handleKeypadEnter = (val: string) => {
      const num = parseFloat(val);
      if (!isNaN(num) && activeCartIndex !== null) {
          const newCart = [...cart];
          if (num <= 0) {
              if (num === 0) {
                  const filteredCart = newCart.filter((_, i) => i !== activeCartIndex);
                  setCart(filteredCart);
              }
          } else {
              newCart[activeCartIndex].qty = num;
              setCart(newCart);
          }
      }
      setKeypadOpen(false);
      setActiveCartIndex(null);
  };

  const addToCart = (product: any) => {
      const existingIdx = cart.findIndex(item => item.id === product.id);
      if (existingIdx >= 0) {
          const newCart = [...cart];
          newCart[existingIdx].qty += 1;
          setCart(newCart);
      } else {
          setCart([...cart, { ...product, qty: 1 }]);
      }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-[#101a22]">
       {/* Header */}
       <header className="h-16 bg-white dark:bg-[#16222d] border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
             <Link to="/vendor" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
             </Link>
             <div>
               <h1 className="font-bold text-lg text-slate-900 dark:text-white">Vendor POS</h1>
               <p className="text-xs text-slate-500">Sales Terminal</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 dark:text-white">AutoParts Dist.</p>
                <p className="text-xs text-slate-500">Store Manager</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold border border-purple-200">
                AP
             </div>
          </div>
       </header>

       {/* Main Content */}
       <div className="flex-1 p-4 overflow-hidden">
          <div className="h-full grid grid-cols-12 gap-4">
             {/* Left: Products */}
             <div className="col-span-8 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700">
                {/* Search & Cats */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 space-y-4">
                   <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                      <input type="text" placeholder="Search bulk parts..." className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-900 border-none rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
                   </div>
                   <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                      <button className="px-4 py-1.5 bg-purple-600 text-white rounded-full text-sm font-medium whitespace-nowrap">All</button>
                      <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-sm font-medium whitespace-nowrap">Engine Parts</button>
                      <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-sm font-medium whitespace-nowrap">Transmission</button>
                      <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-sm font-medium whitespace-nowrap">Brakes</button>
                      <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-sm font-medium whitespace-nowrap">Lubricants</button>
                   </div>
                </div>
                
                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-4">
                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {vendorProducts.map(prod => (
                         <div key={prod.id} onClick={() => addToCart(prod)} className="p-3 rounded-lg border border-transparent hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer transition-all group">
                            <div className="aspect-square rounded-lg bg-slate-100 dark:bg-slate-800 mb-2 overflow-hidden relative">
                               <img src={prod.img} alt={prod.name} className="w-full h-full object-cover" />
                            </div>
                            <h4 className="font-medium text-sm text-slate-900 dark:text-white leading-tight mb-1">{prod.name}</h4>
                            <p className="text-xs text-slate-500">Stock: {prod.stock} | ₹{prod.price}</p>
                         </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Right: Cart */}
             <div className="col-span-4 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                   <h2 className="text-lg font-bold">Current Sale</h2>
                   <button className="flex items-center gap-1 text-purple-600 text-sm font-medium hover:underline">
                      <span className="material-symbols-outlined text-lg">person_add</span>
                      Select Garage
                   </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                   {cart.length === 0 ? (
                       <div className="h-full flex flex-col items-center justify-center text-slate-400">
                           <span className="material-symbols-outlined text-4xl mb-2">shopping_cart_off</span>
                           <p className="text-sm">Cart is empty</p>
                       </div>
                   ) : (
                       cart.map((item, idx) => (
                         <div key={idx} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800/50">
                            <div className="w-12 h-12 rounded bg-slate-200 shrink-0 overflow-hidden">
                               <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                            </div>
                            <div className="flex-1 min-w-0">
                               <p className="font-medium text-sm truncate text-slate-900 dark:text-white">{item.name}</p>
                               <p className="text-xs text-slate-500">₹{item.price}</p>
                            </div>
                            <div className="flex items-center gap-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 px-1 py-0.5">
                               <button className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 rounded text-slate-600 dark:text-slate-300" onClick={() => updateQty(idx, -1)}>-</button>
                               <button 
                                  className="text-sm font-bold w-8 text-center text-slate-900 dark:text-white hover:text-purple-500 underline decoration-dashed underline-offset-4" 
                                  onClick={() => openKeypad(idx)}
                               >
                                  {item.qty}
                               </button>
                               <button className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 rounded text-slate-600 dark:text-slate-300" onClick={() => updateQty(idx, 1)}>+</button>
                            </div>
                            <div className="text-right">
                               <p className="font-bold text-sm text-slate-900 dark:text-white">₹{item.price * item.qty}</p>
                               <button className="text-slate-400 hover:text-red-500 p-1" onClick={() => removeItem(idx)}><span className="material-symbols-outlined text-lg">delete</span></button>
                            </div>
                         </div>
                       ))
                   )}
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 space-y-2">
                   <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                      <span>Subtotal</span>
                      <span className="font-medium text-slate-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                      <span>Tax (18%)</span>
                      <span className="font-medium text-slate-900 dark:text-white">₹{tax.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-700 pt-3 mt-2">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                   </div>
                   
                   <div className="grid grid-cols-3 gap-2 pt-4">
                       <button className="py-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300">Hold</button>
                       <button className="py-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300">Discount</button>
                       <button className="py-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300" onClick={() => setCart([])}>Clear</button>
                   </div>
                   <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-lg shadow-lg flex items-center justify-center gap-2 mt-2 transition-all active:scale-[0.98]">
                      <span className="material-symbols-outlined">payment</span> Complete Sale
                   </button>
                </div>
             </div>
          </div>
       </div>

       <KeypadModal 
          isOpen={keypadOpen} 
          onClose={() => setKeypadOpen(false)} 
          onEnter={handleKeypadEnter}
          title={activeCartIndex !== null ? `Set Qty for ${cart[activeCartIndex]?.name}` : "Enter Quantity"}
       />
    </div>
  );
}