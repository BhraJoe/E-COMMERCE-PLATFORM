import prisma from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
     const categories = await prisma.category.findMany({
          orderBy: { name: 'asc' }
     });

     return (
          <div className="space-y-12">
               <div>
                    <h1 className="text-3xl font-bold text-brand tracking-tighter uppercase">Add New Product</h1>
                    <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">Expansion of the premium collection</p>
               </div>

               <ProductForm categoryOptions={categories} />
          </div>
     );
}
