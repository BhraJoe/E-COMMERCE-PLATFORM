import prisma from "@/lib/prisma";
import ProductCard from "@/components/common/ProductCard";
import { Filter, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Shop | Modernest",
     description: "Browse our premium furniture collection",
};

interface ShopPageProps {
     searchParams: Promise<{ category?: string }>;
}

export default async function ShopPage(props: ShopPageProps) {
     const searchParams = await props.searchParams;
     const categorySlug = searchParams.category;

     const products = await prisma.product.findMany({
          where: categorySlug ? {
               category: {
                    slug: categorySlug
               }
          } : undefined,
          include: {
               category: true,
          },
     });

     const categories = await prisma.category.findMany();

     return (
          <div className="bg-neutral min-h-screen pb-24">
               {/* Header */}
               <div className="bg-white border-b border-border py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <h1 className="text-4xl font-bold text-brand tracking-tighter uppercase">
                              {categorySlug ? categories.find(c => c.slug === categorySlug)?.name || 'Shop' : 'Shop All'}
                         </h1>
                         <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">Home / Shop{categorySlug ? ` / ${categories.find(c => c.slug === categorySlug)?.name}` : ''}</p>
                    </div>
               </div>

               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                         {/* Filters Sidebar */}
                         <aside className="w-full lg:w-64 space-y-8">
                              <div>
                                   <h3 className="text-xs font-bold uppercase tracking-widest text-brand mb-4 flex items-center">
                                        <Filter className="w-3 h-3 mr-2" /> Categories
                                   </h3>
                                   <ul className="space-y-2">
                                        <li>
                                             <Link
                                                  href="/shop"
                                                  className={`text-sm ${!categorySlug ? 'text-accent font-bold' : 'text-gray-500 hover:text-brand'} transition-colors`}
                                             >
                                                  All Products
                                             </Link>
                                        </li>
                                        {categories.map((cat) => (
                                             <li key={cat.id}>
                                                  <Link
                                                       href={`/shop?category=${cat.slug}`}
                                                       className={`text-sm ${categorySlug === cat.slug ? 'text-accent font-bold' : 'text-gray-500 hover:text-brand'} transition-colors`}
                                                  >
                                                       {cat.name}
                                                  </Link>
                                             </li>
                                        ))}
                                   </ul>
                              </div>

                              <div className="pt-8 border-t border-border">
                                   <h3 className="text-xs font-bold uppercase tracking-widest text-brand mb-4">Price Range</h3>
                                   <div className="space-y-2">
                                        <label className="flex items-center space-x-2 text-sm text-gray-500">
                                             <input type="checkbox" className="rounded border-border text-brand focus:ring-accent" />
                                             <span>Under $100</span>
                                        </label>
                                        <label className="flex items-center space-x-2 text-sm text-gray-500">
                                             <input type="checkbox" className="rounded border-border text-brand focus:ring-accent" />
                                             <span>$100 - $500</span>
                                        </label>
                                        <label className="flex items-center space-x-2 text-sm text-gray-500">
                                             <input type="checkbox" className="rounded border-border text-brand focus:ring-accent" />
                                             <span>Over $500</span>
                                        </label>
                                   </div>
                              </div>
                         </aside>

                         {/* Product Grid */}
                         <main className="flex-grow">
                              <div className="flex justify-between items-center mb-8 bg-white p-4 border border-border">
                                   <span className="text-sm text-gray-500">{products.length} Products Found</span>
                                   <button className="flex items-center text-sm font-bold text-brand uppercase tracking-tighter">
                                        Sort By: Featured <ChevronDown className="ml-1 w-4 h-4" />
                                   </button>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                   {products.map((product) => (
                                        <ProductCard
                                             key={product.id}
                                             id={product.id}
                                             name={product.name}
                                             price={product.price}
                                             images={product.images}
                                             category={product.category}
                                        />
                                   ))}
                              </div>

                              {products.length === 0 && (
                                   <div className="text-center py-24 bg-white border border-dashed border-border">
                                        <p className="text-gray-500">No products found in this category.</p>
                                        <Link href="/shop" className="text-brand font-bold hover:underline mt-2 inline-block">
                                             View all products
                                        </Link>
                                   </div>
                              )}
                         </main>
                    </div>
               </div>
          </div>
     );
}
