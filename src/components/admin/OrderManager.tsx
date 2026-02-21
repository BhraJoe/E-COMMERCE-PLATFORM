"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, Truck, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function OrderManager({ order }: { order: any }) {
     const router = useRouter();
     const [loading, setLoading] = useState(false);

     const updateStatus = async (newStatus: string) => {
          setLoading(true);
          try {
               const res = await fetch(`/api/admin/orders/${order.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({ status: newStatus }),
                    headers: { "Content-Type": "application/json" }
               });

               if (res.ok) {
                    router.refresh();
               }
          } catch (err) {
               console.error("Failed to update status:", err);
          } finally {
               setLoading(false);
          }
     };

     const statuses = [
          { label: "Pending", value: "PENDING", icon: Clock, color: "text-orange-500" },
          { label: "Paid", value: "PAID", icon: CheckCircle2, color: "text-green-500" },
          { label: "Shipped", value: "SHIPPED", icon: Truck, color: "text-blue-500" },
          { label: "Delivered", value: "DELIVERED", icon: CheckCircle2, color: "text-gray-500" },
          { label: "Cancelled", value: "CANCELLED", icon: XCircle, color: "text-red-500" },
     ];

     return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               <div className="lg:col-span-2 space-y-8">
                    {/* Items */}
                    <div className="bg-white border border-border p-8 md:p-12 shadow-sm">
                         <h2 className="text-xl font-bold text-brand uppercase tracking-widest border-b border-border pb-6 mb-8">Purchase Details</h2>
                         <div className="space-y-6">
                              {order.orderItems.map((item: any) => (
                                   <div key={item.id} className="flex justify-between items-center text-sm border-b border-neutral pb-4 last:border-0">
                                        <div className="flex items-center space-x-4">
                                             <div className="w-12 h-12 bg-neutral border border-border shrink-0" />
                                             <div>
                                                  <p className="font-bold text-brand uppercase tracking-tight">{item.product.name}</p>
                                                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">{item.quantity} units @ ${item.price.toFixed(2)}</p>
                                             </div>
                                        </div>
                                        <span className="font-black text-brand">${(item.price * item.quantity).toFixed(2)}</span>
                                   </div>
                              ))}

                              <div className="pt-8 flex justify-between items-baseline">
                                   <span className="text-xl font-bold uppercase tracking-widest text-brand">Total Revenue</span>
                                   <span className="text-4xl font-black text-accent">${order.totalAmount.toFixed(2)}</span>
                              </div>
                         </div>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-white border border-border p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div>
                              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Customer Details</h3>
                              <p className="text-sm font-bold text-brand uppercase">{order.user?.name || "Anonymous Guest"}</p>
                              <p className="text-xs text-gray-500 mt-1">{order.contactEmail}</p>
                         </div>
                         <div>
                              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Shipping Destination</h3>
                              <p className="text-xs text-brand font-medium leading-relaxed italic border-l-2 border-accent pl-4">
                                   {order.shippingAddress}
                              </p>
                         </div>
                    </div>
               </div>

               {/* Control Panel */}
               <div className="space-y-8">
                    <div className="bg-brand text-white p-8 shadow-2xl sticky top-24">
                         <h2 className="text-sm font-bold uppercase tracking-[0.3em] border-b border-white/10 pb-6 mb-8">Status Control</h2>

                         <div className="space-y-4">
                              {statuses.map((status) => (
                                   <button
                                        key={status.value}
                                        onClick={() => updateStatus(status.value)}
                                        disabled={loading || order.status === status.value}
                                        className={`w-full flex items-center justify-between p-4 border transition-all duration-300 ${order.status === status.value ? 'bg-white text-brand border-white' : 'border-white/10 hover:border-white text-gray-400 hover:text-white'}`}
                                   >
                                        <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest">
                                             <status.icon className={`w-4 h-4 ${order.status === status.value ? status.color : ''}`} />
                                             <span>{status.label}</span>
                                        </div>
                                        {order.status === status.value && <div className="w-1.5 h-1.5 bg-accent rounded-full pulse" />}
                                   </button>
                              ))}
                         </div>

                         <div className="mt-12 pt-8 border-t border-white/10 italic text-[10px] text-gray-500 text-center leading-relaxed">
                              Updating status will trigger an automated customer notification (simulated).
                         </div>
                    </div>

                    <Link href="/admin/orders" className="flex items-center justify-center space-x-2 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 hover:text-brand transition-colors py-4">
                         <ArrowLeft className="w-4 h-4" />
                         <span>Back to List</span>
                    </Link>
               </div>
          </div>
     );
}
