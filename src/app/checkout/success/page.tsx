"use client";

import { CheckCircle2, ArrowRight, Package, Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function SuccessPage() {
     const [orderId] = useState(() => `MOD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`);

     useEffect(() => {
          confetti({
               particleCount: 150,
               spread: 70,
               origin: { y: 0.6 },
               colors: ['#1A2B3C', '#d4af37', '#ffffff']
          });
     }, []);

     return (
          <div className="bg-white min-h-[90vh] flex items-center justify-center py-12 px-4">
               <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in-95 duration-700">
                    <div className="flex justify-center">
                         <div className="p-4 bg-accent/10 rounded-full">
                              <CheckCircle2 className="w-20 h-20 text-accent animate-in scale-110 duration-1000 ease-out" />
                         </div>
                    </div>

                    <div className="space-y-4">
                         <h1 className="text-5xl font-bold text-brand tracking-tighter uppercase leading-none">Victory</h1>
                         <p className="text-gray-500 text-sm uppercase tracking-[0.3em] font-medium italic">Your order is being prepared</p>
                    </div>

                    <div className="bg-neutral p-8 border border-border space-y-4">
                         <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                              <span>Order Number</span>
                              <span className="text-brand">#{orderId}</span>
                         </div>
                         <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                              <span>Status</span>
                              <span className="text-accent underline">Processing</span>
                         </div>
                    </div>

                    <p className="text-gray-500 leading-relaxed text-sm">
                         An email confirmation has been sent to your inbox. We&apos;ll notify you as soon as your premium items are dispatched.
                    </p>

                    <div className="flex flex-col space-y-4 pt-4">
                         <Link
                              href="/account/orders"
                              className="bg-brand text-white font-bold py-5 flex items-center justify-center hover:bg-accent transition-all duration-300 uppercase tracking-widest text-xs group"
                         >
                              <Package className="w-4 h-4 mr-2" />
                              Track Order
                         </Link>
                         <Link
                              href="/shop"
                              className="border-2 border-brand text-brand font-bold py-5 flex items-center justify-center hover:bg-neutral transition-all duration-300 uppercase tracking-widest text-xs group"
                         >
                              <Home className="w-4 h-4 mr-2" />
                              Back to Home
                         </Link>
                    </div>
               </div>
          </div>
     );
}
