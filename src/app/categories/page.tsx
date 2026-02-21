import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Categories | Modernest",
     description: "Browse our furniture collections",
};

export default async function CategoriesPage() {
     const categories = await prisma.category.findMany({
          include: {
               _count: { select: { products: true } }
          },
          orderBy: { name: 'asc' }
     });

     const categoryImages: Record<string, string> = {
          'living-room': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
          'kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800',
          'bedroom': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800',
     };

     return (
          <div className="min-h-screen bg-background">
               {/* Hero Section */}
               <section className="bg-brand text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                         <h1 className="text-5xl font-bold mb-4">Shop by Category</h1>
                         <p className="text-xl text-white/80 max-w-2xl mx-auto">
                              Explore our curated collections of premium furniture
                         </p>
                    </div>
               </section>

               {/* Categories Grid */}
               <section className="py-16">
                    <div className="container mx-auto px-4">
                         {categories.length > 0 ? (
                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                   {categories.map((category) => (
                                        <Link
                                             key={category.id}
                                             href={`/shop?category=${category.slug}`}
                                             className="group block"
                                        >
                                             <div className="bg-neutral rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                                                  {/* Category Image */}
                                                  <div className="relative h-64">
                                                       <Image
                                                            src={categoryImages[category.slug] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'}
                                                            alt={category.name}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                       />
                                                       <div className="absolute inset-0 bg-brand/30 group-hover:bg-brand/20 transition-colors" />
                                                  </div>

                                                  <div className="p-8">
                                                       <h3 className="text-2xl font-bold text-brand uppercase tracking-tight mb-2">
                                                            {category.name}
                                                       </h3>
                                                       <p className="text-gray-500 text-sm mb-4">
                                                            {category.description || `Explore our ${category.name} collection`}
                                                       </p>
                                                       <div className="flex items-center justify-between">
                                                            <span className="text-sm text-gray-500">
                                                                 {category._count.products} products
                                                            </span>
                                                            <span className="text-brand font-bold text-sm group-hover:underline">
                                                                 Shop Now →
                                                            </span>
                                                       </div>
                                                  </div>
                                             </div>
                                        </Link>
                                   ))}
                              </div>
                         ) : (
                              <div className="text-center py-16">
                                   <p className="text-gray-500 text-lg">No categories available yet.</p>
                                   <Link
                                        href="/shop"
                                        className="inline-block mt-4 text-brand font-bold hover:underline"
                                   >
                                        Browse all products
                                   </Link>
                              </div>
                         )}
                    </div>
               </section>

               {/* CTA Section */}
               <section className="py-16 bg-neutral">
                    <div className="container mx-auto px-4 text-center">
                         <h2 className="text-3xl font-bold text-brand mb-6">
                              Can't find what you're looking for?
                         </h2>
                         <Link
                              href="/shop"
                              className="inline-block bg-accent text-brand font-bold px-8 py-4 hover:bg-brand hover:text-white transition-colors"
                         >
                              Browse All Products
                         </Link>
                    </div>
               </section>
          </div>
     );
}
