"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit3, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductList({ products }: { products: any[] }) {
     const router = useRouter();
     const [loading, setLoading] = useState<string | null>(null);

     const handleDelete = async (id: string) => {
          if (!confirm("Are you sure you want to delete this premium item? This action is irreversible.")) return;

          setLoading(id);
          try {
               const res = await fetch(`/api/admin/products/${id}`, {
                    method: "DELETE",
               });

               if (res.ok) {
                    router.refresh();
               }
          } catch (err) {
               console.error("Failed to delete product:", err);
          } finally {
               setLoading(null);
          }
     };

     return (
          <div className="bg-white border border-border shadow-sm overflow-hidden">
               <div className="overflow-x-auto">
                    <table className="w-full text-left">
                         <thead className="bg-neutral">
                              <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                   <th className="px-8 py-6">Product</th>
                                   <th className="px-8 py-6">Category</th>
                                   <th className="px-8 py-6">Price</th>
                                   <th className="px-8 py-6">Stock</th>
                                   <th className="px-8 py-6">Status</th>
                                   <th className="px-8 py-6 text-right">Actions</th>
                              </tr>
                         </thead>
                         <tbody className="text-xs font-bold text-brand divide-y divide-border">
                              {products.map((product) => (
                                   <tr key={product.id} className="hover:bg-neutral transition-colors group">
                                        <td className="px-8 py-6 flex items-center space-x-4">
                                             <div className="w-12 h-12 bg-neutral border border-border relative overflow-hidden">
                                                  {product.images.split(',')[0] && (
                                                       <Image src={product.images.split(',')[0]} alt={product.name} fill className="object-cover" />
                                                  )}
                                             </div>
                                             <div className="max-w-[150px]">
                                                  <p className="uppercase truncate tracking-tight">{product.name}</p>
                                                  <p className="text-[10px] text-gray-400 truncate tracking-widest mt-0.5">ID: {product.id.slice(-6).toUpperCase()}</p>
                                             </div>
                                        </td>
                                        <td className="px-8 py-6">
                                             <span className="text-[10px] font-black underline decoration-accent underline-offset-4">{product.category.name}</span>
                                        </td>
                                        <td className="px-8 py-6">${product.price.toFixed(2)}</td>
                                        <td className="px-8 py-6">
                                             <div className="flex items-center space-x-2">
                                                  <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-red-500'}`} />
                                                  <span>{product.stock} in stock</span>
                                             </div>
                                        </td>
                                        <td className="px-8 py-6">
                                             <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] rounded-full ${product.isFeatured ? 'bg-accent/10 text-accent' : 'bg-gray-100 text-gray-400'}`}>
                                                  {product.isFeatured ? 'Featured' : 'Standard'}
                                             </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                             <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                  <Link href={`/admin/products/${product.id}/edit`} className="p-2 text-gray-400 hover:text-brand transition-colors border border-border bg-white shadow-sm flex items-center justify-center">
                                                       <Edit3 className="w-4 h-4" />
                                                  </Link>
                                                  <button
                                                       onClick={() => handleDelete(product.id)}
                                                       disabled={loading === product.id}
                                                       className="p-2 text-gray-400 hover:text-red-500 transition-colors border border-border bg-white shadow-sm flex items-center justify-center disabled:opacity-50"
                                                  >
                                                       <Trash2 className="w-4 h-4" />
                                                  </button>
                                             </div>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>
          </div>
     );
}
