import prisma from "@/lib/prisma";
import { Package, DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
     const productCount = await prisma.product.count();
     const categoryCount = await prisma.category.count();
     const orderCount = await prisma.order.count();
     const userCount = await prisma.user.count();

     const recentOrders = await prisma.order.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: { user: true }
     });

     const stats = [
          { label: "Total Revenue", value: "$124,500", icon: DollarSign, color: "bg-green-100 text-green-600" },
          { label: "Orders", value: orderCount.toString(), icon: ShoppingCart, color: "bg-blue-100 text-blue-600" },
          { label: "Products", value: productCount.toString(), icon: Package, color: "bg-purple-100 text-purple-600" },
          { label: "Customers", value: userCount.toString(), icon: Users, color: "bg-orange-100 text-orange-600" },
     ];

     return (
          <div className="space-y-12">
               <div>
                    <h1 className="text-3xl font-bold text-brand tracking-tighter uppercase">Platform Overview</h1>
                    <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">Real-time control center for Modernest</p>
               </div>

               {/* Stats Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                         <div key={i} className="bg-white p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
                              <div className="flex justify-between items-start">
                                   <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">{stat.label}</p>
                                        <h3 className="text-3xl font-black text-brand">{stat.value}</h3>
                                   </div>
                                   <div className={`p-4 ${stat.color} rounded-xl`}>
                                        <stat.icon className="w-6 h-6" />
                                   </div>
                              </div>
                              <div className="mt-6 flex items-center text-[10px] font-bold text-green-600 uppercase tracking-widest">
                                   <TrendingUp className="w-3 h-3 mr-1" /> +12% from last month
                              </div>
                         </div>
                    ))}
               </div>

               {/* Recent Context */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white border border-border p-8">
                         <div className="flex justify-between items-end mb-8">
                              <h2 className="text-xl font-bold text-brand uppercase tracking-tighter">Recent Orders</h2>
                              <button className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline">View All</button>
                         </div>

                         <div className="overflow-x-auto">
                              <table className="w-full text-left">
                                   <thead>
                                        <tr className="border-b border-border text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                             <th className="pb-4">Order ID</th>
                                             <th className="pb-4">Customer</th>
                                             <th className="pb-4">Status</th>
                                             <th className="pb-4">Amount</th>
                                             <th className="pb-4">Date</th>
                                        </tr>
                                   </thead>
                                   <tbody className="text-xs font-bold text-brand divide-y divide-border">
                                        {recentOrders.length === 0 ? (
                                             <tr>
                                                  <td colSpan={5} className="py-8 text-center text-gray-400">No recent orders found.</td>
                                             </tr>
                                        ) : (
                                             recentOrders.map((order) => (
                                                  <tr key={order.id} className="hover:bg-neutral transition-colors">
                                                       <td className="py-4 uppercase">#{order.id.slice(-6)}</td>
                                                       <td className="py-4">{order.user?.name || "Guest"}</td>
                                                       <td className="py-4"><span className="text-accent underline">{order.status}</span></td>
                                                       <td className="py-4">${order.totalAmount.toFixed(2)}</td>
                                                       <td className="py-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                  </tr>
                                             ))
                                        )}
                                   </tbody>
                              </table>
                         </div>
                    </div>

                    <div className="bg-brand text-white p-8">
                         <h2 className="text-xl font-bold uppercase tracking-widest border-b border-white/10 pb-6 mb-6">Quick Actions</h2>
                         <div className="space-y-4">
                              <button className="w-full bg-white text-brand font-bold py-4 uppercase tracking-widest text-[10px] hover:bg-accent transition-all">Add New Product</button>
                              <button className="w-full border border-white/20 text-white font-bold py-4 uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">Create Discount</button>
                              <button className="w-full border border-white/20 text-white font-bold py-4 uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">Send Newsletter</button>
                         </div>
                    </div>
               </div>
          </div>
     );
}
