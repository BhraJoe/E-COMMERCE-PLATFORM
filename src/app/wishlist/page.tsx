import Link from "next/link";
import { Metadata } from "next";
import { Heart } from "lucide-react";

export const metadata: Metadata = {
     title: "Wishlist | Modernest",
     description: "Your saved items",
};

export default function WishlistPage() {
     return (
          <div className="min-h-screen bg-background">
               {/* Hero Section */}
               <section className="bg-brand text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                         <h1 className="text-5xl font-bold mb-4">My Wishlist</h1>
                         <p className="text-xl text-white/80 max-w-2xl mx-auto">
                              Your saved items for later
                         </p>
                    </div>
               </section>

               {/* Wishlist Content */}
               <section className="py-16">
                    <div className="container mx-auto px-4">
                         <div className="text-center py-16">
                              <div className="flex justify-center mb-6">
                                   <Heart className="w-16 h-16 text-gray-300" />
                              </div>
                              <h2 className="text-2xl font-bold text-brand mb-4">Your wishlist is empty</h2>
                              <p className="text-gray-500 mb-8">
                                   Save your favorite items to purchase later
                              </p>
                              <Link
                                   href="/shop"
                                   className="inline-block bg-accent text-brand font-bold px-8 py-4 hover:bg-brand hover:text-white transition-colors"
                              >
                                   Start Shopping
                              </Link>
                         </div>
                    </div>
               </section>
          </div>
     );
}
