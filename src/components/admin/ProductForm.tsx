"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon, Plus, X } from "lucide-react";
import Link from "next/link";

export default function ProductForm({ categoryOptions, initialData }: { categoryOptions: any[], initialData?: any }) {
     const router = useRouter();
     const [loading, setLoading] = useState(false);
     const [images, setImages] = useState<string[]>(initialData?.images?.split(',') || []);
     const [newImageUrl, setNewImageUrl] = useState("");

     const handleAddImage = () => {
          if (newImageUrl && !images.includes(newImageUrl)) {
               setImages([...images, newImageUrl]);
               setNewImageUrl("");
          }
     };

     const handleRemoveImage = (url: string) => {
          setImages(images.filter(img => img !== url));
     };

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setLoading(true);

          const formData = new FormData(e.currentTarget);
          const data = {
               name: formData.get("name"),
               slug: formData.get("slug"),
               price: parseFloat(formData.get("price") as string),
               stock: parseInt(formData.get("stock") as string),
               categoryId: formData.get("categoryId"),
               description: formData.get("description"),
               images: images.join(','),
               isFeatured: formData.get("isFeatured") === "on",
          };

          try {
               const res = await fetch(initialData ? `/api/admin/products/${initialData.id}` : "/api/admin/products", {
                    method: initialData ? "PUT" : "POST",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" }
               });

               if (res.ok) {
                    router.push("/admin/products");
                    router.refresh();
               }
          } catch (err) {
               console.error("Failed to save product:", err);
          } finally {
               setLoading(false);
          }
     };

     return (
          <form onSubmit={handleSubmit} className="space-y-12 max-w-5xl">
               <div className="flex justify-between items-center">
                    <Link href="/admin/products" className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-brand transition-colors">
                         <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
                    </Link>
                    <button
                         type="submit"
                         disabled={loading}
                         className="bg-accent text-brand font-black py-4 px-12 uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center"
                    >
                         <Save className="w-4 h-4 mr-2" /> {initialData ? "Update Product" : "Publish Product"}
                    </button>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-8 bg-white p-8 md:p-12 border border-border shadow-sm">
                         <h2 className="text-xl font-bold text-brand uppercase tracking-tighter border-b border-border pb-4">General Information</h2>

                         <div className="space-y-6">
                              <div className="space-y-2">
                                   <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Product Name</label>
                                   <input name="name" defaultValue={initialData?.name} required className="w-full border-b-2 border-neutral focus:border-brand outline-none py-2 font-bold text-sm" placeholder="e.g. Minimalist Oak Chair" />
                              </div>

                              <div className="grid grid-cols-2 gap-6">
                                   <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Slug</label>
                                        <input name="slug" defaultValue={initialData?.slug} required className="w-full border-b-2 border-neutral focus:border-brand outline-none py-2 font-bold text-sm" placeholder="minimalist-oak-chair" />
                                   </div>
                                   <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Category</label>
                                        <select name="categoryId" defaultValue={initialData?.categoryId} className="w-full border-b-2 border-neutral focus:border-brand outline-none py-2 font-bold text-sm bg-transparent">
                                             {categoryOptions.map(cat => (
                                                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                                             ))}
                                        </select>
                                   </div>
                              </div>

                              <div className="space-y-2">
                                   <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Description</label>
                                   <textarea name="description" defaultValue={initialData?.description} rows={5} className="w-full border-2 border-neutral focus:border-brand outline-none p-4 font-medium text-sm text-gray-600 italic" placeholder="Describe the premium qualities..." />
                              </div>
                         </div>
                    </div>

                    {/* Right Column: Inventory & Media */}
                    <div className="space-y-8">
                         <div className="bg-brand text-white p-8 shadow-sm">
                              <h2 className="text-sm font-bold uppercase tracking-widest border-b border-white/10 pb-4 mb-6">Inventory</h2>
                              <div className="space-y-6">
                                   <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Price (USD)</label>
                                        <input name="price" type="number" step="0.01" defaultValue={initialData?.price} required className="w-full bg-transparent border-b border-white/20 focus:border-accent outline-none py-2 font-black text-xl text-accent" />
                                   </div>
                                   <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Stock Quantity</label>
                                        <input name="stock" type="number" defaultValue={initialData?.stock} required className="w-full bg-transparent border-b border-white/20 focus:border-accent outline-none py-2 font-bold text-sm" />
                                   </div>
                                   <div className="flex items-center space-x-3 pt-4">
                                        <input name="isFeatured" type="checkbox" defaultChecked={initialData?.isFeatured} className="w-4 h-4 accent-accent" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Mark as Featured</span>
                                   </div>
                              </div>
                         </div>

                         <div className="bg-white border border-border p-8 shadow-sm">
                              <h2 className="text-sm font-bold uppercase tracking-tighter text-brand border-b border-border pb-4 mb-6 italic">Product Imagery</h2>

                              <div className="space-y-4">
                                   <div className="flex space-x-2">
                                        <input
                                             value={newImageUrl}
                                             onChange={(e) => setNewImageUrl(e.target.value)}
                                             className="flex-grow border-b border-neutral focus:border-brand outline-none py-2 text-[10px] font-bold uppercase tracking-widest bg-neutral px-2"
                                             placeholder="PASTE IMAGE URL..."
                                        />
                                        <button type="button" onClick={handleAddImage} className="bg-brand text-white p-2 hover:bg-accent hover:text-brand transition-colors"><Plus className="w-4 h-4" /></button>
                                   </div>

                                   <div className="grid grid-cols-3 gap-2">
                                        {images.map((url, i) => (
                                             <div key={i} className="relative aspect-square border border-border group overflow-hidden">
                                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                                  <img src={url} alt="Preview" className="object-cover w-full h-full" />
                                                  <button
                                                       type="button"
                                                       onClick={() => handleRemoveImage(url)}
                                                       className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                                  >
                                                       <X className="w-4 h-4" />
                                                  </button>
                                             </div>
                                        ))}
                                   </div>

                                   {images.length === 0 && (
                                        <div className="border border-dashed border-border py-8 text-center text-gray-300">
                                             <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-20" />
                                             <p className="text-[8px] font-bold uppercase tracking-widest">No images added</p>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>
               </div>
          </form>
     );
}
