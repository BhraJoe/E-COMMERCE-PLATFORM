import prisma from "@/lib/prisma";
import { Plus, Edit3, Trash2, FolderOpen } from "lucide-react";

export default async function AdminCategoriesPage() {
     const categories = await prisma.category.findMany({
          include: { _count: { select: { products: true } } },
          orderBy: { name: 'asc' }
     });

     return (
          <div className="space-y-12">
               <div className="flex justify-between items-end">
                    <div>
                         <h1 className="text-3xl font-bold text-brand tracking-tighter uppercase">Category Management</h1>
                         <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">Organize your product taxonomy</p>
                    </div>
                    <button className="bg-brand text-white font-bold py-4 px-8 flex items-center hover:bg-accent hover:text-brand transition-all duration-300 uppercase tracking-widest text-[10px] shadow-xl">
                         <Plus className="w-4 h-4 mr-2" /> Create Category
                    </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                         <div key={category.id} className="bg-white border border-border p-8 group hover:border-accent transition-colors shadow-sm relative overflow-hidden">
                              <div className="absolute -top-6 -right-6 w-12 h-12 bg-neutral rounded-full flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                                   <FolderOpen className="w-4 h-4 text-brand/20 group-hover:text-accent transition-colors" />
                              </div>

                              <h3 className="text-xl font-bold text-brand uppercase tracking-tighter mb-2">{category.name}</h3>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">Slug: {category.slug}</p>

                              <div className="flex justify-between items-center bg-neutral p-4 border border-border">
                                   <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Products</span>
                                   <span className="text-xl font-black text-brand">{category._count.products}</span>
                              </div>

                              <div className="mt-8 flex space-x-2">
                                   <button className="flex-grow bg-brand text-white text-[10px] font-bold py-3 uppercase tracking-widest hover:bg-accent hover:text-brand transition-all">Edit</button>
                                   <button className="p-3 bg-white border border-border text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
}
