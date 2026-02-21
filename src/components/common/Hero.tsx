import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
     return (
          <section className="relative h-[80vh] flex items-center overflow-hidden bg-brand">
               {/* Background Image */}
               <div className="absolute inset-0">
                    <Image
                         src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600"
                         alt="Modern living room"
                         fill
                         className="object-cover"
                         priority
                    />
                    <div className="absolute inset-0 bg-brand/70" />
               </div>

               {/* Background Decorative Elements */}
               <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-light to-transparent opacity-30" />
               <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                         <div className="inline-flex items-center space-x-2 bg-accent/20 px-3 py-1 rounded-full border border-accent/30">
                              <span className="text-accent text-xs font-bold tracking-widest uppercase">New Collection 2026</span>
                         </div>

                         <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight">
                              Elevate Your <span className="text-accent underline decoration-brand-light">Everyday</span> Living.
                         </h1>

                         <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed">
                              Discover our curated collection of minimalist home decor and premium lifestyle essentials designed for the modern home.
                         </p>

                         <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                              <Link
                                   href="/shop"
                                   className="bg-accent text-brand font-bold px-8 py-4 flex items-center justify-center hover:bg-white hover:text-brand transition-all duration-300 shadow-xl shadow-accent/20 group"
                              >
                                   Shop Now
                                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </Link>
                              <Link
                                   href="/categories"
                                   className="border border-white/20 text-white font-bold px-8 py-4 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                              >
                                   Learn More
                              </Link>
                         </div>
                    </div>

                    {/* Hero Image Mockup Area */}
                    <div className="hidden lg:block relative">
                         <div className="relative aspect-square bg-brand-light/20 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden flex items-center justify-center">
                              <div className="text-white/20 text-8xl font-black rotate-12">MODERNEST</div>
                              <div className="absolute inset-0 bg-gradient-to-tr from-brand to-transparent opacity-60" />
                         </div>
                         {/* Floating Card */}
                         <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-2xl rounded-xl max-w-[200px] border border-border">
                              <p className="text-brand text-sm font-bold">"Best Design 2025"</p>
                              <p className="text-gray-500 text-xs mt-1">International Living Magazine</p>
                         </div>
                    </div>
               </div>
          </section>
     );
}
