"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store";

interface ProductCardProps {
     id: string;
     name: string;
     price: number;
     images: string;
     category: { name: string };
}

export default function ProductCard({ id, name, price, images, category }: ProductCardProps) {
     const addItem = useCart((state) => state.addItem);

     // Parsing the first image from the JSON/string
     const imageUrl = images.split(',')[0];

     const handleAddToCart = (e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          addItem({
               id,
               name,
               price,
               image: imageUrl,
               quantity: 1
          });
     };

     return (
          <div className="group relative bg-white border border-border overflow-hidden transition-all duration-500 hover:shadow-2xl">
               {/* Badge */}
               <div className="absolute top-4 left-4 z-10">
                    <span className="bg-brand text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                         {category.name}
                    </span>
               </div>

               {/* Image Container */}
               <div className="aspect-[4/5] bg-neutral overflow-hidden relative">
                    <div className="absolute inset-0 bg-brand/5 group-hover:bg-brand/0 transition-colors duration-500 z-1" />

                    {imageUrl ? (
                         <Image
                              src={imageUrl}
                              alt={name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                         />
                    ) : (
                         <div className="w-full h-full flex items-center justify-center text-brand/20 font-black text-2xl rotate-12 group-hover:rotate-0 transition-transform duration-700 uppercase">
                              {name}
                         </div>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute bottom-4 left-4 right-4 flex space-x-2 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 z-20">
                         <button
                              onClick={handleAddToCart}
                              className="flex-grow bg-brand text-white text-xs font-bold py-3 flex items-center justify-center hover:bg-accent hover:text-brand transition-colors"
                         >
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              ADD TO CART
                         </button>
                         <button className="bg-white border border-border p-3 hover:bg-neutral transition-colors">
                              <Heart className="w-4 h-4 text-brand" />
                         </button>
                    </div>
               </div>

               {/* Info */}
               <div className="p-6 space-y-2">
                    <Link href={`/product/${id}`} className="block">
                         <h3 className="text-sm font-bold text-brand uppercase tracking-tight group-hover:text-accent transition-colors">
                              {name}
                         </h3>
                    </Link>
                    <div className="flex justify-between items-center">
                         <span className="text-gray-500 text-xs">Essential Series</span>
                         <span className="text-brand font-bold">${price.toFixed(2)}</span>
                    </div>
               </div>
          </div>
     );
}
