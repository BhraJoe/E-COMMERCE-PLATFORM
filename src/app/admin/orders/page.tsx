import prisma from "@/lib/prisma";
import { Eye, Clock, CheckCircle2, Truck, XCircle, Search } from "lucide-react";
import Link from "next/link";

export default async function AdminOrdersPage() {
     const orders = await prisma.order.findMany({
          orderBy: { createdAt: 'desc' },
          include: { user: true }
     });

     const getStatusColor = (status: string) => {
          switch (status) {
               case 'PENDING': return 'text-orange-500 underline';
               case 'PAID': return 'text-green-500 underline';
               case 'SHIPPED': return 'text-blue-500 underline';
               case 'DELIVERED': return 'text-gray-500 underline';
               case 'CANCELLED': return 'text-red-500 underline';
               default: return 'text-brand underline';
          }
     };

     return (
          <div className="space-y-12">
               <div className="flex justify-between items-end">
                    <div>
                         <h1 className="text-3xl font-bold text-brand tracking-tighter uppercase">Order Management</h1>
                         <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">Track and fulfill platform sales</p>
                    </div>
                    <div className="relative w-64">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                         <input className="w-full border-b-2 border-neutral focus:border-brand outline-none py-2 pl-10 text-[10px] font-bold tracking-widest" placeholder="FIND ORDER..." />
                    </div>
               </div>

               {/* Orders Table */}
               <div className="bg-white border border-border shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                         <table className="w-full text-left">
                              <thead className="bg-neutral">
                                   <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                        <th className="px-8 py-6">Order ID</th>
                                        <th className="px-8 py-6">Customer</th>
                                        <th className="px-8 py-6">Date</th>
                                        <th className="px-8 py-6">Total</th>
                                        <th className="px-8 py-6">Status</th>
                                        <th className="px-8 py-6 text-right">Action</th>
                                   </tr>
                              </thead>
                              <tbody className="text-xs font-bold text-brand divide-y divide-border">
                                   {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-neutral transition-colors group">
                                             <td className="px-8 py-6 uppercase tracking-tighter">#{order.id.slice(-8)}</td>
                                             <td className="px-8 py-6 uppercase truncate max-w-[150px]">{order.user?.name || "Guest"}</td>
                                             <td className="px-8 py-6 text-gray-400 font-medium">{new Date(order.createdAt).toLocaleDateString()}</td>
                                             <td className="px-8 py-6 black">${order.totalAmount.toFixed(2)}</td>
                                             <td className="px-8 py-6">
                                                  <span className={getStatusColor(order.status)}>{order.status}</span>
                                             </td>
                                             <td className="px-8 py-6 text-right">
                                                  <Link href={`/admin/orders/${order.id}`} className="bg-brand text-white p-2 hover:bg-accent hover:text-brand transition-all inline-block">
                                                       <Eye className="w-4 h-4" />
                                                  </Link>
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
