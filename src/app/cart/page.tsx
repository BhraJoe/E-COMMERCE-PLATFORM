"use client";

import { useCart } from "@/lib/store";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CartPage() {
     const { items, removeItem, updateQuantity, total } = useCart();
     const [mounted, setMounted] = useState(false);

     useEffect(() => {
          setMounted(true);
     }, []);

     if (!mounted) return null;

     if (items.length === 0) {
          return (
               <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
                    <div className="p-8 bg-neutral rounded-full text-brand/20">
                         <ShoppingBag className="w-16 h-16" />
                    </div>
                    <div className="text-center">
                         <h1 className="text-2xl font-bold text-brand uppercase tracking-tighter">Your cart is empty</h1>
                         <p className="text-gray-500 mt-2">Looks like you haven&apos;t added anything yet.</p>
                    </div>
                    <Link
                         href="/shop"
                         className="bg-brand text-white font-bold py-4 px-12 hover:bg-accent transition-colors uppercase tracking-widest text-sm"
                    >
                         Continue Shopping
                    </Link>
               </div>
          );
     }

     return (
          <div className="bg-neutral min-h-screen py-12 md:py-24">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-brand tracking-tighter uppercase mb-12">Shopping Cart</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                         {/* Items List */}
                         <div className="lg:col-span-2 space-y-6">
                              {items.map((item) => (
                                   <div key={item.id} className="bg-white border border-border p-6 flex flex-col sm:flex-row gap-6 group hover:shadow-xl transition-shadow duration-500">
                                        <div className="relative w-full sm:w-32 aspect-square bg-neutral overflow-hidden border border-border">
                                             <Image
                                                  src={item.image}
                                                  alt={item.name}
                                                  fill
                                                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                                             />
                                        </div>

                                        <div className="flex-grow flex flex-col justify-between py-2">
                                             <div className="flex justify-between items-start">
                                                  <div>
                                                       <Link href={`/product/${item.id}`} className="text-lg font-bold text-brand hover:text-accent transition-colors uppercase tracking-tight">
                                                            {item.name}
                                                       </Link>
                                                       <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Premium Selection</p>
                                                  </div>
                                                  <button
                                                       onClick={() => removeItem(item.id)}
                                                       className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                                  >
                                                       <Trash2 className="w-5 h-5" />
                                                  </button>
                                             </div>

                                             <div className="flex justify-between items-end mt-4">
                                                  <div className="flex items-center border border-border bg-neutral">
                                                       <button
                                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                            className="px-3 py-1 hover:bg-white transition-colors"
                                                       ><Minus className="w-3 h-3" /></button>
                                                       <span className="px-4 py-1 font-bold text-sm border-x border-border min-w-[3rem] text-center">{item.quantity}</span>
                                                       <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="px-3 py-1 hover:bg-white transition-colors"
                                                       ><Plus className="w-3 h-3" /></button>
                                                  </div>
                                                  <div className="text-right">
                                                       <p className="text-brand font-black text-xl">${(item.price * item.quantity).toFixed(2)}</p>
                                                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">${item.price.toFixed(2)} each</p>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </div>

                         {/* Summary */}
                         <div className="lg:col-span-1">
                              <div className="bg-brand text-white p-8 sticky top-24 shadow-2xl">
                                   <h2 className="text-xl font-bold uppercase tracking-widest border-b border-white/10 pb-6 mb-6">Order Summary</h2>

                                   <div className="space-y-4 text-sm font-medium">
                                        <div className="flex justify-between">
                                             <span className="text-gray-400 uppercase tracking-tighter">Subtotal</span>
                                             <span>${total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                             <span className="text-gray-400 uppercase tracking-tighter">Shipping</span>
                                             <span className="text-accent italic text-xs uppercase font-bold">Calculated at next step</span>
                                        </div>
                                        <div className="flex justify-between">
                                             <span className="text-gray-400 uppercase tracking-tighter">Tax</span>
                                             <span>$0.00</span>
                                        </div>

                                        <div className="border-t border-white/20 pt-6 mt-6 flex justify-between items-baseline">
                                             <span className="text-lg font-bold uppercase tracking-widest">Total</span>
                                             <span className="text-3xl font-black text-accent">${total.toFixed(2)}</span>
                                        </div>
                                   </div>

                                   <Link
                                        href="/checkout"
                                        className="mt-8 w-full bg-white text-brand font-bold py-5 flex items-center justify-center hover:bg-accent transition-all duration-300 uppercase tracking-widest text-sm shadow-lg group"
                                   >
                                        Proceed to Checkout
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                   </Link>

                                   <div className="mt-8 space-y-4">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest text-center">Secure payments handled via industry standard encryption.</p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
