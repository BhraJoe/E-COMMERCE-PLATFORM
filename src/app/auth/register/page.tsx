"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { registerUser } from "./action";

export default function RegisterPage() {
     const router = useRouter();
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");
     const [success, setSuccess] = useState(false);

     const [formData, setFormData] = useState({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
     });

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();

          if (formData.password !== formData.confirmPassword) {
               setError("Passwords do not match");
               return;
          }

          setLoading(true);
          setError("");

          const result = await registerUser({
               name: formData.name,
               email: formData.email,
               password: formData.password
          });

          if (result.error) {
               setError(result.error);
               setLoading(false);
          } else {
               setSuccess(true);
               setTimeout(() => {
                    router.push("/auth/login");
               }, 2000);
          }
     };

     if (success) {
          return (
               <div className="min-h-[80vh] flex items-center justify-center bg-neutral px-4">
                    <div className="max-w-md w-full text-center space-y-6 bg-white p-16 border border-border shadow-2xl">
                         <div className="flex justify-center">
                              <CheckCircle className="w-16 h-16 text-accent animate-bounce" />
                         </div>
                         <h1 className="text-3xl font-bold text-brand tracking-tighter uppercase">Account Created</h1>
                         <p className="text-gray-500 text-sm font-medium uppercase tracking-widest leading-relaxed">
                              Successfully registered. Redirecting to login...
                         </p>
                    </div>
               </div>
          );
     }

     return (
          <div className="min-h-[80vh] flex items-center justify-center bg-neutral py-12 px-4 sm:px-6 lg:px-8">
               <div className="max-w-md w-full space-y-12 bg-white p-10 md:p-16 border border-border shadow-2xl relative overflow-hidden">
                    <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-accent/10 rounded-full" />

                    <div className="text-center">
                         <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">Join Modernest</h2>
                         <h1 className="text-4xl font-bold text-brand tracking-tighter uppercase leading-none">Create Account</h1>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                         {error && (
                              <div className="bg-red-50 border-l-4 border-red-500 p-4 text-xs font-bold text-red-600 uppercase tracking-widest italic">
                                   {error}
                              </div>
                         )}

                         <div className="space-y-5">
                              <div className="space-y-2 group">
                                   <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-accent transition-colors">Full Name</label>
                                   <div className="relative">
                                        <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                             type="text"
                                             required
                                             className="w-full border-b border-neutral focus:border-brand outline-none py-3 pl-8 font-bold text-sm tracking-tight bg-transparent transition-all"
                                             placeholder="JOHN DOE"
                                             value={formData.name}
                                             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                   </div>
                              </div>

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
                                   <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-accent transition-colors">Password</label>
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

                              <div className="space-y-2 group">
                                   <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-accent transition-colors">Confirm Password</label>
                                   <div className="relative">
                                        <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                             type="password"
                                             required
                                             className="w-full border-b border-neutral focus:border-brand outline-none py-3 pl-8 font-bold text-sm tracking-tight bg-transparent transition-all"
                                             placeholder="RE-ENTER PASSWORD"
                                             value={formData.confirmPassword}
                                             onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                                        Establish Access
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                   </>
                              )}
                         </button>
                    </form>

                    <div className="text-center pt-8 border-t border-border">
                         <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
                              Already registered?
                              <Link href="/auth/login" className="ml-2 text-brand font-bold hover:text-accent transition-colors underline underline-offset-4">Sign In</Link>
                         </p>
                    </div>
               </div>
          </div>
     );
}
