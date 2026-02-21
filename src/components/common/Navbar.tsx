"use client";

import Link from "next/link";
import { ShoppingCart, User, Search, Menu, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/store";

export default function Navbar() {
     const [isMenuOpen, setIsMenuOpen] = useState(false);
     const items = useCart((state) => state.items);
     const [mounted, setMounted] = useState(false);

     useEffect(() => {
          setMounted(true);
     }, []);

     const itemCount = items.reduce((total, item) => total + item.quantity, 0);

     return (
          <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                         {/* Logo */}
                         <div className="flex-shrink-0 flex items-center">
                              <Link href="/" className="text-2xl font-bold text-brand tracking-tighter">
                                   MODERN<span className="text-accent">EST</span>
                              </Link>
                         </div>

                         {/* Desktop navigation */}
                         <div className="hidden md:flex items-center space-x-8">
                              <Link href="/" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Home</Link>
                              <Link href="/shop" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Shop</Link>
                              <Link href="/categories" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Categories</Link>
                              <Link href="/about" className="text-sm font-medium text-foreground hover:text-accent transition-colors">About</Link>
                              <Link href="/contact" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Contact</Link>
                         </div>

                         {/* Icons */}
                         <div className="flex items-center space-x-4">
                              <button className="p-2 text-foreground hover:text-accent transition-colors">
                                   <Search className="w-5 h-5" />
                              </button>
                              <Link href="/account" className="p-2 text-foreground hover:text-accent transition-colors">
                                   <User className="w-5 h-5" />
                              </Link>
                              <Link href="/wishlist" className="p-2 text-foreground hover:text-accent transition-colors hidden sm:block">
                                   <Heart className="w-5 h-5" />
                              </Link>
                              <Link href="/cart" className="p-2 relative text-foreground hover:text-accent transition-colors">
                                   <ShoppingCart className="w-5 h-5" />
                                   {mounted && itemCount > 0 && (
                                        <span className="absolute top-1 right-1 bg-accent text-brand text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-in zoom-in duration-300">
                                             {itemCount}
                                        </span>
                                   )}
                              </Link>
                              <button
                                   className="md:hidden p-2 text-foreground"
                                   onClick={() => setIsMenuOpen(!isMenuOpen)}
                              >
                                   <Menu className="w-6 h-6" />
                              </button>
                         </div>
                    </div>
               </div>

               {/* Mobile Menu */}
               {isMenuOpen && (
                    <div className="md:hidden bg-white border-b border-border">
                         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                              <Link href="/" className="block px-3 py-2 text-base font-medium text-foreground hover:bg-neutral">Home</Link>
                              <Link href="/shop" className="block px-3 py-2 text-base font-medium text-foreground hover:bg-neutral">Shop</Link>
                              <Link href="/categories" className="block px-3 py-2 text-base font-medium text-foreground hover:bg-neutral">Categories</Link>
                              <Link href="/about" className="block px-3 py-2 text-base font-medium text-foreground hover:bg-neutral">About</Link>
                              <Link href="/contact" className="block px-3 py-2 text-base font-medium text-foreground hover:bg-neutral">Contact</Link>
                         </div>
                    </div>
               )}
          </nav>
     );
}
