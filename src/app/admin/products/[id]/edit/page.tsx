import prisma from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
     const { id } = await params;

     const product = await prisma.product.findUnique({
          where: { id },
     });

     if (!product) {
          notFound();
     }

     const categories = await prisma.category.findMany({
          orderBy: { name: 'asc' }
     });

     return (
          <div className="space-y-12">
               <div>
                    <h1 className="text-3xl font-bold text-brand tracking-tighter uppercase">Edit Product</h1>
                    <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">Refining the premium details</p>
               </div>

               <ProductForm categoryOptions={categories} initialData={product} />
          </div>
     );
}
