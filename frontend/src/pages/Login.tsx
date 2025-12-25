import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'garage' | 'vendor'>('garage');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'garage') {
      navigate('/');
    } else {
      navigate('/vendor');
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50 dark:bg-[#101a22]">
      {/* Left Side - Image */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 bg-cover bg-center opacity-40 transition-all duration-700 ${role === 'garage' ? "bg-[url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1974')]" : "bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070')]"}`}></div>
        <div className="relative z-10 p-12 text-white text-center">
           <div className={`w-20 h-20 rounded-xl mx-auto mb-6 flex items-center justify-center text-4xl font-bold shadow-lg transition-colors duration-300 ${role === 'garage' ? 'bg-primary-600' : 'bg-purple-600'}`}>G</div>
           <h1 className="text-5xl font-bold mb-4">GadiSewa</h1>
           <p className="text-xl text-slate-300 max-w-md mx-auto">
             {role === 'garage' ? 'Complete Garage Management System.' : 'Vendor Portal for Automotive Parts.'}
           </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
           <div className="text-center lg:text-left">
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome Back</h2>
             <p className="mt-2 text-slate-600 dark:text-slate-400">Please enter your details to login.</p>
           </div>

           {/* Role Toggle */}
           <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
             <button 
                onClick={() => setRole('garage')}
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${role === 'garage' ? 'bg-white dark:bg-slate-700 shadow text-primary-600' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
             >
                Garage Owner
             </button>
             <button 
                onClick={() => setRole('vendor')}
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${role === 'vendor' ? 'bg-white dark:bg-slate-700 shadow text-purple-600' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
             >
                Vendor
             </button>
           </div>

           <form className="space-y-6" onSubmit={handleLogin}>
             <div>
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email or Phone</label>
               <input type="email" defaultValue={role === 'garage' ? 'admin@garage.com' : 'sales@vendor.com'} className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="Enter your email" />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
               <input type="password" defaultValue="password" className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="••••••••" />
             </div>
             
             <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className={`w-4 h-4 rounded border-gray-300 focus:ring-2 ${role === 'garage' ? 'text-primary-600 focus:ring-primary-500' : 'text-purple-600 focus:ring-purple-500'}`} />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
                </label>
                <a href="#" className={`text-sm font-medium hover:underline ${role === 'garage' ? 'text-primary-600' : 'text-purple-600'}`}>Forgot Password?</a>
             </div>

             <button type="submit" className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all ${role === 'garage' ? 'bg-primary-600 hover:bg-primary-700' : 'bg-purple-600 hover:bg-purple-700'}`}>
               Login as {role === 'garage' ? 'Garage' : 'Vendor'}
             </button>
           </form>

           <div className="relative my-8">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-300 dark:border-slate-700"></div></div>
             <div className="relative flex justify-center text-sm"><span className="px-2 bg-slate-50 dark:bg-[#101a22] text-slate-500">Or continue with</span></div>
           </div>

           <div className="grid grid-cols-2 gap-4">
             <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
               <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
               <span className="text-sm font-medium">Google</span>
             </button>
             <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
               <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="Facebook" />
               <span className="text-sm font-medium">Facebook</span>
             </button>
           </div>

           <p className="text-center text-sm text-slate-600 dark:text-slate-400">
             Don't have an account? <Link to="/register" className={`font-bold hover:underline ${role === 'garage' ? 'text-primary-600' : 'text-purple-600'}`}>Sign Up</Link>
           </p>
        </div>
      </div>
    </div>
  );
}