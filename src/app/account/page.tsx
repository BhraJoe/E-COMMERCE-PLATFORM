import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { User, Package, MapPin, Settings, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { signOut } from "@/auth";

export default async function AccountPage() {
     const session = await auth();

     if (!session?.user) {
          redirect("/auth/login");
     }

     const orders = await prisma.order.findMany({
          where: { userId: session.user.id },
          orderBy: { createdAt: 'desc' },
          include: { orderItems: { include: { product: true } } }
     });

     return (
          <div className="bg-neutral min-h-screen py-12 md:py-24">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                         {/* Sidebar */}
                         <aside className="lg:col-span-1 space-y-8">
                              <div className="bg-brand text-white p-8">
                                   <div className="w-16 h-16 bg-accent rounded-full mb-6 flex items-center justify-center text-brand text-2xl font-black">
                                        {session.user.name?.charAt(0) || "U"}
                                   </div>
                                   <h2 className="text-xl font-bold uppercase tracking-tighter">{session.user.name}</h2>
                                   <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">{session.user.email}</p>
                              </div>

                              <nav className="space-y-2">
                                   <button className="w-full flex items-center justify-between p-4 bg-white border border-border font-bold text-xs uppercase tracking-widest text-brand hover:bg-neutral transition-colors">
                                        <div className="flex items-center"><User className="w-4 h-4 mr-3 text-accent" /> Profile Details</div>
                                        <ChevronRight className="w-4 h-4" />
                                   </button>
                                   <button className="w-full flex items-center justify-between p-4 bg-white border border-border font-bold text-xs uppercase tracking-widest text-brand hover:bg-neutral transition-colors">
                                        <div className="flex items-center"><Package className="w-4 h-4 mr-3 text-accent" /> Order History</div>
                                        <ChevronRight className="w-4 h-4" />
                                   </button>
                                   <button className="w-full flex items-center justify-between p-4 bg-white border border-border font-bold text-xs uppercase tracking-widest text-brand hover:bg-neutral transition-colors">
                                        <div className="flex items-center"><MapPin className="w-4 h-4 mr-3 text-accent" /> Addresses</div>
                                        <ChevronRight className="w-4 h-4" />
                                   </button>
                                   <form action={async () => {
                                        "use server";
                                        await signOut();
                                   }}>
                                        <button className="w-full flex items-center p-4 bg-white border border-border font-bold text-xs uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors">
                                             <LogOut className="w-4 h-4 mr-3" /> Sign Out
                                        </button>
                                   </form>
                              </nav>
                         </aside>

                         {/* Content */}
                         <main className="lg:col-span-3 space-y-12">
                              {/* Summary Stats */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                   <div className="bg-white border border-border p-8">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Total Orders</p>
                                        <h3 className="text-3xl font-black text-brand">{orders.length}</h3>
                                   </div>
                                   <div className="bg-white border border-border p-8 text-accent">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Membership</p>
                                        <h3 className="text-xl font-bold uppercase tracking-tighter">Elite Member</h3>
                                   </div>
                                   <div className="bg-white border border-border p-8">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Saved Items</p>
                                        <h3 className="text-3xl font-black text-brand">0</h3>
                                   </div>
                              </div>

                              {/* Recent Orders */}
                              <section>
                                   <div className="flex justify-between items-end mb-8">
                                        <h2 className="text-2xl font-bold text-brand uppercase tracking-tighter">Recent Orders</h2>
                                        <button className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline">View All</button>
                                   </div>

                                   {orders.length === 0 ? (
                                        <div className="bg-white border border-dashed border-border py-24 text-center">
                                             <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                             <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">No orders found yet</p>
                                             <Link href="/shop" className="mt-6 inline-block text-brand font-bold text-sm underline underline-offset-4 uppercase tracking-tighter">Start Shopping</Link>
                                        </div>
                                   ) : (
                                        <div className="space-y-6">
                                             {orders.map((order) => (
                                                  <div key={order.id} className="bg-white border border-border overflow-hidden">
                                                       <div className="bg-neutral p-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest border-b border-border">
                                                            <div className="flex space-x-6">
                                                                 <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                                                                 <span>Total: ${order.totalAmount.toFixed(2)}</span>
                                                                 <span>Status: <span className="text-accent underline">{order.status}</span></span>
                                                            </div>
                                                            <span className="text-gray-400">#{order.id.toUpperCase()}</span>
                                                       </div>
                                                       <div className="p-6">
                                                            {order.orderItems.map((item) => (
                                                                 <div key={item.id} className="flex items-center space-x-4">
                                                                      <div className="w-12 h-12 bg-neutral border border-border shrink-0" />
                                                                      <span className="text-xs font-bold text-brand uppercase tracking-tight">{item.product.name}</span>
                                                                      <span className="text-xs text-gray-400">x{item.quantity}</span>
                                                                 </div>
                                                            ))}
                                                       </div>
                                                  </div>
                                             ))}
                                        </div>
                                   )}
                              </section>
                         </main>
                    </div>
               </div>
          </div>
     );
}
