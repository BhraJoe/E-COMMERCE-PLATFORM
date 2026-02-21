import prisma from "@/lib/prisma";
import { Plus, Search, Filter } from "lucide-react";
import Link from "next/link";
import ProductList from "@/components/admin/ProductList";

export default async function AdminProductsPage() {
     const products = await prisma.product.findMany({
          include: { category: true },
          orderBy: { createdAt: 'desc' }
     });

     return (
          <div className="space-y-12">
               <div className="flex justify-between items-end">
                    <div>
                         <h1 className="text-3xl font-bold text-brand tracking-tighter uppercase">Product Management</h1>
                         <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">Inventory control and catalog management</p>
                    </div>
                    <Link href="/admin/products/new" className="bg-brand text-white font-bold py-4 px-8 flex items-center hover:bg-accent hover:text-brand transition-all duration-300 uppercase tracking-widest text-[10px] shadow-xl">
                         <Plus className="w-4 h-4 mr-2" /> Add New Product
                    </Link>
               </div>

               {/* Toolbar */}
               <div className="bg-white border border-border p-6 flex flex-col md:flex-row justify-between gap-6 shadow-sm">
                    <div className="relative flex-grow max-w-md">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                         <input className="w-full border-b-2 border-neutral focus:border-brand outline-none py-2 pl-10 text-xs font-bold tracking-tight" placeholder="SEARCH PRODUCTS..." />
                    </div>
                    <div className="flex space-x-4">
                         <button className="flex items-center text-[10px] font-bold text-brand uppercase tracking-widest border border-border px-4 py-2 hover:bg-neutral transition-colors">
                              <Filter className="w-3 h-3 mr-2" /> All Categories
                         </button>
                         <button className="flex items-center text-[10px] font-bold text-brand uppercase tracking-widest border border-border px-4 py-2 hover:bg-neutral transition-colors">
                              Stock: Low to High
                         </button>
                    </div>
               </div>

               {/* Products Table (Client Component) */}
               <ProductList products={products} />
          </div>
     );
}
