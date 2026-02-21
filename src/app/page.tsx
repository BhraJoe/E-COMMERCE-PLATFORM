import Hero from "@/components/common/Hero";
import ProductCard from "@/components/common/ProductCard";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    where: { isFeatured: true },
    take: 4,
    include: { category: true }
  });

  const categories = await prisma.category.findMany({
    take: 3
  });

  const categoryImages: Record<string, string> = {
    'living-room': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
    'kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800',
    'bedroom': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800',
  };

  return (
    <main className="min-h-screen">
      <Hero />

      {/* Featured Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-brand tracking-tighter uppercase">Shop by Category</h2>
              <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">Curated collections for your home</p>
            </div>
            <Link href="/shop" className="text-sm font-bold text-accent uppercase tracking-widest flex items-center hover:translate-x-1 transition-transform">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group relative aspect-[16/10] overflow-hidden bg-neutral border border-border"
              >
                <Image
                  src={categoryImages[cat.slug] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand/40 group-hover:bg-brand/20 transition-colors z-10" />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="text-white text-2xl font-bold uppercase tracking-tighter">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-neutral border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand tracking-tighter uppercase">Premium Collections</h2>
            <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest italic">Wait for it, it's worth it.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
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

          <div className="mt-16 text-center">
            <Link
              href="/shop"
              className="inline-block border-2 border-brand text-brand font-bold py-4 px-12 hover:bg-brand hover:text-white transition-all duration-300 uppercase tracking-widest text-sm"
            >
              Explore Full Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter / Trust */}
      <section className="py-24 bg-brand text-white overflow-hidden relative">
        <div className="absolute -right-24 -bottom-24 w-96 h-96 border-8 border-accent/20 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-tight">
              Join the <span className="text-accent italic">Elite</span> Circle
            </h2>
            <p className="mt-6 text-gray-400 text-lg leading-relaxed">
              Subscribe for exclusive early access to our limited drops and premium lifestyle insights. No spam, just pure class.
            </p>
            <form className="mt-10 flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="YOUR@EMAIL.COM"
                className="bg-transparent border-b-2 border-gray-600 focus:border-accent py-4 px-2 outline-none flex-grow font-bold tracking-widest text-sm"
              />
              <button className="bg-white text-brand font-bold py-4 px-12 hover:bg-accent transition-colors uppercase tracking-widest text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
