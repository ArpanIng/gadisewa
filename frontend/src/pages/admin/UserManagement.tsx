import React, { useState } from 'react';
import { useToast } from '../../App';

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@garage.com', role: 'Super Admin', status: 'Active', lastActive: '2 mins ago', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Sarah Lane', email: 'sarah@garage.com', role: 'Support Agent', status: 'Active', lastActive: '1 hour ago', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Mike Ross', email: 'mike@garage.com', role: 'Content Manager', status: 'Inactive', lastActive: '2 days ago', avatar: 'https://i.pravatar.cc/150?u=3' },
];

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const { showToast } = useToast();

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    showToast('success', 'Invitation email sent to new user');
  };

  const handleDelete = (id: number) => {
    if(confirm('Are you sure you want to deactivate this user?')) {
        setUsers(users.map(u => u.id === id ? {...u, status: 'Inactive'} : u));
        showToast('info', 'User deactivated');
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
             <h1 className="text-2xl font-bold">User Management</h1>
             <p className="text-slate-500 text-sm">Manage admin access and permissions.</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
          >
             <span className="material-symbols-outlined">person_add</span>
             Add Admin User
          </button>
       </div>

       {/* Users Table */}
       <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                   <th className="p-4">User</th>
                   <th className="p-4">Role</th>
                   <th className="p-4">Status</th>
                   <th className="p-4">Last Active</th>
                   <th className="p-4 text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {users.map(user => (
                   <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4">
                         <div className="flex items-center gap-3">
                            <img src={user.avatar} className="w-10 h-10 rounded-full bg-slate-200" alt="" />
                            <div>
                               <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                               <p className="text-xs text-slate-500">{user.email}</p>
                            </div>
                         </div>
                      </td>
                      <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                            {user.role}
                          </span>
                      </td>
                      <td className="p-4">
                         <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            user.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                         }`}>
                            {user.status}
                         </span>
                      </td>
                      <td className="p-4 text-slate-500">{user.lastActive}</td>
                      <td className="p-4 text-right">
                         <button className="text-slate-400 hover:text-primary-600 p-1 mr-2"><span className="material-symbols-outlined">edit</span></button>
                         <button onClick={() => handleDelete(user.id)} className="text-slate-400 hover:text-red-600 p-1"><span className="material-symbols-outlined">block</span></button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>

       {/* Add User Modal */}
       {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#1e293b] w-full max-w-md rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700">
               <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <h3 className="text-lg font-bold">Add New User</h3>
                  <button onClick={() => setShowModal(false)}><span className="material-symbols-outlined text-slate-400">close</span></button>
               </div>
               <form onSubmit={handleAddUser} className="p-6 space-y-4">
                  <div>
                     <label className="block text-sm font-medium mb-1">Full Name</label>
                     <input type="text" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-primary-500" required />
                  </div>
                  <div>
                     <label className="block text-sm font-medium mb-1">Email Address</label>
                     <input type="email" className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-primary-500" required />
                  </div>
                  <div>
                     <label className="block text-sm font-medium mb-1">Role</label>
                     <select className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Super Admin</option>
                        <option>Admin</option>
                        <option>Support Agent</option>
                        <option>Content Manager</option>
                     </select>
                  </div>
                  <div className="pt-4 flex justify-end gap-3">
                     <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">Cancel</button>
                     <button type="submit" className="px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700">Send Invitation</button>
                  </div>
               </form>
            </div>
         </div>
       )}
    </div>
  );
}