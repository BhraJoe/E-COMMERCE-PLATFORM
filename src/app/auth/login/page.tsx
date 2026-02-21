"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
     const router = useRouter();
     const searchParams = useSearchParams();
     const callbackUrl = searchParams.get("callbackUrl") || "/";
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");

     const [formData, setFormData] = useState({
          email: "",
          password: "",
     });

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setLoading(true);
          setError("");

          try {
               const result = await signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
               });

               if (result?.error) {
                    setError("Invalid email or password. Please try again.");
               } else {
                    router.push(callbackUrl);
                    router.refresh();
               }
          } catch (err) {
               setError("An unexpected error occurred. Please try again later.");
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="min-h-[80vh] flex items-center justify-center bg-neutral py-12 px-4 sm:px-6 lg:px-8">
               <div className="max-w-md w-full space-y-12 bg-white p-10 md:p-16 border border-border shadow-2xl relative overflow-hidden">
                    {/* Background Accent */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent/10 rounded-full" />

                    <div className="text-center">
                         <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">Welcome Back</h2>
                         <h1 className="text-4xl font-bold text-brand tracking-tighter uppercase leading-none">Sign In</h1>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                         {error && (
                              <div className="bg-red-50 border-l-4 border-red-500 p-4 text-xs font-bold text-red-600 uppercase tracking-widest animate-in fade-in slide-in-from-top-2">
                                   {error}
                              </div>
                         )}

                         <div className="space-y-6">
                              <div className="space-y-2 group">
                                   <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-accent transition-colors">Email Address</label>
                                   <div className="relative">
                                        <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                             type="email"
                                             required
                                             className="w-full border-b border-neutral focus:border-brand outline-none py-3 pl-8 font-bold text-sm tracking-tight bg-transparent transition-all"
                                             placeholder="YOUR@EMAIL.COM"
                                             value={formData.email}
                                             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                   </div>
                              </div>

                              <div className="space-y-2 group">
                                   <div className="flex justify-between items-baseline">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-accent transition-colors">Password</label>
                                        <Link href="/auth/forgot-password" className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline">Forgot?</Link>
                                   </div>
                                   <div className="relative">
                                        <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                             type="password"
                                             required
                                             className="w-full border-b border-neutral focus:border-brand outline-none py-3 pl-8 font-bold text-sm tracking-tight bg-transparent transition-all"
                                             placeholder="••••••••"
                                             value={formData.password}
                                             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                   </div>
                              </div>
                         </div>

                         <button
                              disabled={loading}
                              className="w-full bg-brand text-white font-bold py-5 flex items-center justify-center hover:bg-accent hover:text-brand transition-all duration-300 uppercase tracking-widest text-xs shadow-xl active:scale-95 disabled:opacity-50 group"
                         >
                              {loading ? (
                                   <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                   <>
                                        Enter Account
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                   </>
                              )}
                         </button>
                    </form>

                    <div className="text-center pt-8 border-t border-border">
                         <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
                              Don&apos;t have an account?
                              <Link href="/auth/register" className="ml-2 text-brand font-bold hover:text-accent transition-colors underline underline-offset-4">Create One</Link>
                         </p>
                    </div>
               </div>
          </div>
     );
}
