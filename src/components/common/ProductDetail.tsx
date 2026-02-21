"use client";

import { ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetail({ product }: { product: any }) {
     const addItem = useCart((state) => state.addItem);
     const [selectedImage, setSelectedImage] = useState(0);
     const [quantity, setQuantity] = useState(1);
     const [selectedSize, setSelectedSize] = useState("M");

     const images = product.images.split(',');

     const handleAddToCart = () => {
          addItem({
               id: product.id,
               name: product.name,
               price: product.price,
               image: images[0],
               quantity: quantity
          });
     };

     return (
          <div className="bg-white min-h-screen">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
                    {/* Breadcrumbs */}
                    <nav className="mb-8 flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                         <Link href="/" className="hover:text-brand transition-colors">Home</Link>
                         <ChevronRight className="w-3 h-3" />
                         <Link href="/shop" className="hover:text-brand transition-colors">Shop</Link>
                         <ChevronRight className="w-3 h-3" />
                         <span className="text-brand">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                         {/* Image Gallery */}
                         <div className="space-y-4">
                              <div className="aspect-square bg-neutral border border-border relative overflow-hidden group">
                                   {images[selectedImage] ? (
                                        <Image
                                             src={images[selectedImage]}
                                             alt={product.name}
                                             fill
                                             className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                   ) : (
                                        <div className="w-full h-full flex items-center justify-center text-brand/20 text-4xl font-black uppercase rotate-6">{product.name}</div>
                                   )}
                              </div>
                              {images.length > 1 && (
                                   <div className="grid grid-cols-4 gap-4">
                                        {images.map((img: string, i: number) => (
                                             <button
                                                  key={i}
                                                  onClick={() => setSelectedImage(i)}
                                                  className={`aspect-square bg-neutral border relative overflow-hidden transition-all ${selectedImage === i ? 'border-brand ring-1 ring-brand' : 'border-border hover:border-brand/50'}`}
                                             >
                                                  <Image src={img.trim()} alt={`${product.name} ${i}`} fill className="object-cover" />
                                             </button>
                                        ))}
                                   </div>
                              )}
                         </div>

                         {/* Product Info */}
                         <div className="space-y-8">
                              <div>
                                   <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">
                                        {product.category.name}
                                   </p>
                                   <h1 className="text-4xl md:text-5xl font-bold text-brand tracking-tighter uppercase leading-tight">
                                        {product.name}
                                   </h1>
                                   <p className="text-2xl font-bold text-brand mt-4">
                                        ${product.price.toFixed(2)}
                                   </p>
                              </div>

                              <p className="text-gray-500 leading-relaxed max-w-lg">
                                   {product.description}
                              </p>

                              {/* Variants */}
                              <div className="space-y-6 pt-6 border-t border-border">
                                   <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-brand mb-3">Select Size</h4>
                                        <div className="flex space-x-3">
                                             {['S', 'M', 'L', 'XL'].map((size) => (
                                                  <button
                                                       key={size}
                                                       onClick={() => setSelectedSize(size)}
                                                       className={`w-12 h-12 border flex items-center justify-center text-sm font-bold transition-all ${selectedSize === size ? 'border-brand bg-brand text-white shadow-lg' : 'border-border hover:border-brand'}`}
                                                  >
                                                       {size}
                                                  </button>
                                             ))}
                                        </div>
                                   </div>

                                   {/* Quantity */}
                                   <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-brand mb-3">Quantity</h4>
                                        <div className="flex items-center border border-border w-fit">
                                             <button
                                                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                  className="px-4 py-2 hover:bg-neutral transition-colors"
                                             >-</button>
                                             <span className="px-6 py-2 font-bold text-sm border-x border-border">{quantity}</span>
                                             <button
                                                  onClick={() => setQuantity(quantity + 1)}
                                                  className="px-4 py-2 hover:bg-neutral transition-colors"
                                             >+</button>
                                        </div>
                                   </div>

                                   <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                                        <button
                                             onClick={handleAddToCart}
                                             className="flex-grow bg-brand text-white font-bold py-5 px-8 flex items-center justify-center hover:bg-accent hover:text-brand transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-[0.98]"
                                        >
                                             <ShoppingBag className="w-5 h-5 mr-3" />
                                             ADD TO CART
                                        </button>
                                        <button className="border border-border p-5 hover:bg-neutral transition-colors">
                                             <Heart className="w-6 h-6 text-brand" />
                                        </button>
                                   </div>
                              </div>

                              {/* Trust Signals */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border">
                                   <div className="flex items-center space-x-3">
                                        <Truck className="w-5 h-5 text-accent" />
                                        <span className="text-xs font-bold uppercase tracking-tighter">Free Shipping</span>
                                   </div>
                                   <div className="flex items-center space-x-3">
                                        <RotateCcw className="w-5 h-5 text-accent" />
                                        <span className="text-xs font-bold uppercase tracking-tighter">30 Day Return</span>
                                   </div>
                                   <div className="flex items-center space-x-3">
                                        <ShieldCheck className="w-5 h-5 text-accent" />
                                        <span className="text-xs font-bold uppercase tracking-tighter">Secure Payment</span>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
