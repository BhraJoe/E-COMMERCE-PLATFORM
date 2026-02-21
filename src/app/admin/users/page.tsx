import prisma from "@/lib/prisma";
import { User, Shield, Mail, Calendar, Search } from "lucide-react";

export default async function AdminUsersPage() {
     const users = await prisma.user.findMany({
          orderBy: { createdAt: 'desc' },
          include: { _count: { select: { orders: true } } }
     });

     return (
          <div className="space-y-12">
               <div className="flex justify-between items-end">
                    <div>
                         <h1 className="text-3xl font-bold text-brand tracking-tighter uppercase">User Management</h1>
                         <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">Platform roles and membership</p>
                    </div>
               </div>

               {/* Stats Overlay */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-brand text-white p-8 border border-white/10 shadow-xl">
                         <div className="flex justify-between items-start">
                              <User className="w-5 h-5 text-accent" />
                              <span className="text-4xl font-black">{users.length}</span>
                         </div>
                         <p className="text-[10px] font-bold uppercase tracking-[0.3em] mt-4 opacity-50">Total Members</p>
                    </div>
                    <div className="bg-white border border-border p-8 shadow-sm">
                         <div className="flex justify-between items-start">
                              <Shield className="w-5 h-5 text-brand" />
                              <span className="text-4xl font-black text-brand">{users.filter(u => u.role === 'ADMIN').length}</span>
                         </div>
                         <p className="text-[10px] font-bold uppercase tracking-[0.3em] mt-4 text-gray-400">Administrators</p>
                    </div>
               </div>

               {/* Users Table */}
               <div className="bg-white border border-border shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                         <table className="w-full text-left">
                              <thead className="bg-neutral">
                                   <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                        <th className="px-8 py-6">Identity</th>
                                        <th className="px-8 py-6">Account Type</th>
                                        <th className="px-8 py-6">Joined</th>
                                        <th className="px-8 py-6">Orders</th>
                                        <th className="px-8 py-6 text-right">Actions</th>
                                   </tr>
                              </thead>
                              <tbody className="text-xs font-bold text-brand divide-y divide-border">
                                   {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-neutral transition-colors group">
                                             <td className="px-8 py-6">
                                                  <div className="flex items-center space-x-3">
                                                       <div className="w-8 h-8 rounded-full bg-brand/5 flex items-center justify-center text-brand border border-brand/10">
                                                            {user.name?.[0] || user.email?.[0] || '?'}
                                                       </div>
                                                       <div>
                                                            <p className="uppercase tracking-tight">{user.name || "UNNAMED USER"}</p>
                                                            <p className="text-[10px] text-gray-400 font-medium lowercase flex items-center mt-0.5">
                                                                 <Mail className="w-2.5 h-2.5 mr-1" /> {user.email}
                                                            </p>
                                                       </div>
                                                  </div>
                                             </td>
                                             <td className="px-8 py-6">
                                                  <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.2em] border ${user.role === 'ADMIN' ? 'border-accent text-accent' : 'border-gray-200 text-gray-400'}`}>
                                                       {user.role}
                                                  </span>
                                             </td>
                                             <td className="px-8 py-6 text-gray-400 font-medium">
                                                  <span className="flex items-center"><Calendar className="w-3 h-3 mr-2" /> {new Date(user.createdAt).toLocaleDateString()}</span>
                                             </td>
                                             <td className="px-8 py-6">
                                                  <span className="bg-neutral px-3 py-1 border border-border">{user._count.orders}</span>
                                             </td>
                                             <td className="px-8 py-6 text-right">
                                                  <button className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline">Manage Role</button>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
     );
}
