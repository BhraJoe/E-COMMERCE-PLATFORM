"use client";

import { useCart } from "@/lib/store";
import { ChevronRight, CreditCard, Ship, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Step = 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
     const { items, total, clearCart } = useCart();
     const [step, setStep] = useState<Step>('shipping');
     const [mounted, setMounted] = useState(false);
     const router = useRouter();

     const [formData, setFormData] = useState({
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          zip: '',
          cardNumber: '',
          expiry: '',
          cvc: '',
     });

     useEffect(() => {
          setMounted(true);
     }, []);

     if (!mounted) return null;

     if (items.length === 0) {
          return (
               <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
                    <h1 className="text-2xl font-bold text-brand uppercase tracking-tighter">Your cart is empty</h1>
                    <Link href="/shop" className="bg-brand text-white font-bold py-4 px-12 uppercase tracking-widest text-sm text-center">Return to Shop</Link>
               </div>
          );
     }

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handlePlaceOrder = async () => {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          clearCart();
          router.push('/checkout/success');
     };

     return (
          <div className="bg-neutral min-h-screen py-12 md:py-24">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Checkout Header / Stepper */}
                    <div className="mb-12">
                         <h1 className="text-4xl font-bold text-brand tracking-tighter uppercase mb-8">Checkout</h1>
                         <div className="flex items-center space-x-4 md:space-x-8">
                              <button
                                   onClick={() => setStep('shipping')}
                                   className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-widest transition-colors ${step === 'shipping' ? 'text-brand' : 'text-gray-400'}`}
                              >
                                   <Ship className="w-4 h-4" />
                                   <span className={step === 'shipping' ? 'border-b-2 border-accent pb-1' : ''}>01 Shipping</span>
                              </button>
                              <ChevronRight className="w-4 h-4 text-gray-300" />
                              <button
                                   onClick={() => step !== 'shipping' && setStep('payment')}
                                   disabled={step === 'shipping'}
                                   className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-widest transition-colors ${step === 'payment' ? 'text-brand' : 'text-gray-400'}`}
                              >
                                   <CreditCard className="w-4 h-4" />
                                   <span className={step === 'payment' ? 'border-b-2 border-accent pb-1' : ''}>02 Payment</span>
                              </button>
                              <ChevronRight className="w-4 h-4 text-gray-300" />
                              <button
                                   disabled={step !== 'review'}
                                   className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-widest transition-colors ${step === 'review' ? 'text-brand' : 'text-gray-400'}`}
                              >
                                   <CheckCircle2 className="w-4 h-4" />
                                   <span className={step === 'review' ? 'border-b-2 border-accent pb-1' : ''}>03 Review</span>
                              </button>
                         </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                         <div className="lg:col-span-2">
                              <div className="bg-white border border-border p-8 md:p-12 shadow-xl">
                                   {step === 'shipping' && (
                                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                             <h2 className="text-xl font-bold text-brand uppercase tracking-widest border-b border-border pb-4">Shipping Information</h2>
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                  <div className="space-y-2">
                                                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">First Name</label>
                                                       <input name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full border-b-2 border-neutral focus:border-accent outline-none py-2 font-bold text-sm tracking-tight" />
                                                  </div>
                                                  <div className="space-y-2">
                                                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Last Name</label>
                                                       <input name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full border-b-2 border-neutral focus:border-accent outline-none py-2 font-bold text-sm tracking-tight" />
                                                  </div>
                                                  <div className="md:col-span-2 space-y-2">
                                                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Address</label>
                                                       <input name="address" value={formData.address} onChange={handleInputChange} className="w-full border-b-2 border-neutral focus:border-accent outline-none py-2 font-bold text-sm tracking-tight" />
                                                  </div>
                                                  <div className="space-y-2">
                                                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">City</label>
                                                       <input name="city" value={formData.city} onChange={handleInputChange} className="w-full border-b-2 border-neutral focus:border-accent outline-none py-2 font-bold text-sm tracking-tight" />
                                                  </div>
                                                  <div className="space-y-2">
                                                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">ZIP / Postal Code</label>
                                                       <input name="zip" value={formData.zip} onChange={handleInputChange} className="w-full border-b-2 border-neutral focus:border-accent outline-none py-2 font-bold text-sm tracking-tight" />
                                                  </div>
                                             </div>
                                             <button
                                                  onClick={() => setStep('payment')}
                                                  className="w-full bg-brand text-white font-bold py-5 uppercase tracking-widest text-sm hover:bg-accent hover:text-brand transition-all duration-300"
                                             >
                                                  Continue to Payment
                                             </button>
                                        </div>
                                   )}

                                   {step === 'payment' && (
                                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                             <h2 className="text-xl font-bold text-brand uppercase tracking-widest border-b border-border pb-4">Payment Details</h2>
                                             <div className="space-y-6">
                                                  <div className="space-y-2">
                                                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Card Number</label>
                                                       <input placeholder="0000 0000 0000 0000" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="w-full border-b-2 border-neutral focus:border-accent outline-none py-2 font-bold text-sm tracking-tight" />
                                                  </div>
                                                  <div className="grid grid-cols-2 gap-6">
                                                       <div className="space-y-2">
                                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Expiry Date</label>
                                                            <input placeholder="MM / YY" name="expiry" value={formData.expiry} onChange={handleInputChange} className="w-full border-b-2 border-neutral focus:border-accent outline-none py-2 font-bold text-sm tracking-tight" />
                                                       </div>
                                                       <div className="space-y-2">
                                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">CVC</label>
                                                            <input placeholder="123" name="cvc" value={formData.cvc} onChange={handleInputChange} className="w-full border-b-2 border-neutral focus:border-accent outline-none py-2 font-bold text-sm tracking-tight" />
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="flex space-x-4">
                                                  <button onClick={() => setStep('shipping')} className="flex-grow border-2 border-brand text-brand font-bold py-5 uppercase tracking-widest text-sm hover:bg-neutral">Back</button>
                                                  <button onClick={() => setStep('review')} className="flex-[2] bg-brand text-white font-bold py-5 uppercase tracking-widest text-sm hover:bg-accent hover:text-brand transition-all">Review Order</button>
                                             </div>
                                        </div>
                                   )}

                                   {step === 'review' && (
                                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                             <h2 className="text-xl font-bold text-brand uppercase tracking-widest border-b border-border pb-4">Review Your Order</h2>

                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                                                  <div>
                                                       <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Shipping To</h4>
                                                       <p className="font-bold text-brand uppercase">{formData.firstName} {formData.lastName}</p>
                                                       <p className="text-gray-500 italic mt-1">{formData.address}, {formData.city}, {formData.zip}</p>
                                                  </div>
                                                  <div>
                                                       <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Payment Method</h4>
                                                       <p className="font-bold text-brand uppercase tracking-tighter">Card ending in {formData.cardNumber.slice(-4) || '••••'}</p>
                                                  </div>
                                             </div>

                                             <div className="pt-8 border-t border-border space-y-4">
                                                  {items.map(item => (
                                                       <div key={item.id} className="flex justify-between items-center text-sm">
                                                            <span className="text-gray-500 uppercase tracking-tight">{item.quantity}x {item.name}</span>
                                                            <span className="font-bold text-brand">${(item.price * item.quantity).toFixed(2)}</span>
                                                       </div>
                                                  ))}
                                             </div>

                                             <button
                                                  onClick={handlePlaceOrder}
                                                  className="w-full bg-accent text-brand font-black py-6 uppercase tracking-[0.2em] text-sm hover:scale-[1.02] transition-transform shadow-2xl active:scale-95"
                                             >
                                                  Confirm & Place Order
                                             </button>
                                        </div>
                                   )}
                              </div>
                         </div>

                         {/* Side Summary */}
                         <div className="lg:col-span-1">
                              <div className="bg-brand text-white p-8 sticky top-24 shadow-2xl">
                                   <div className="flex items-center space-x-3 mb-8 border-b border-white/10 pb-6">
                                        <ShoppingBag className="w-5 h-5 text-accent" />
                                        <h3 className="text-lg font-bold uppercase tracking-widest">Order Summary</h3>
                                   </div>
                                   <div className="space-y-4 text-sm font-medium">
                                        <div className="flex justify-between">
                                             <span className="text-gray-400 uppercase tracking-tighter">Subtotal</span>
                                             <span>${total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                             <span className="text-gray-400 uppercase tracking-tighter">Express Shipping</span>
                                             <span className="text-accent italic text-xs uppercase font-bold">Free</span>
                                        </div>
                                        <div className="border-t border-white/20 pt-6 mt-6 flex justify-between items-baseline">
                                             <span className="text-lg font-bold uppercase tracking-widest">Total</span>
                                             <span className="text-3xl font-black text-accent">${total.toFixed(2)}</span>
                                        </div>
                                   </div>
                                   <p className="mt-8 text-[10px] text-gray-500 uppercase tracking-[0.2em] leading-relaxed">
                                        All orders are processed with premium care and hand-packaged in our carbon-neutral facility.
                                   </p>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
