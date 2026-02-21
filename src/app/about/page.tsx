import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
     title: "About Us | Modernest",
     description: "Learn more about our premium furniture store",
};

export default function AboutPage() {
     return (
          <div className="min-h-screen bg-background">
               {/* Hero Section */}
               <section className="bg-brand text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                         <h1 className="text-5xl font-bold mb-4">About Modernest</h1>
                         <p className="text-xl text-white/80 max-w-2xl mx-auto">
                              Crafting beautiful spaces with premium furniture since 2020
                         </p>
                    </div>
               </section>

               {/* Story Section */}
               <section className="py-16">
                    <div className="container mx-auto px-4">
                         <div className="max-w-3xl mx-auto">
                              <h2 className="text-3xl font-bold text-brand mb-6">Our Story</h2>
                              <p className="text-gray-600 mb-4">
                                   Modernest was founded with a simple vision: to bring exceptional
                                   quality furniture to homes around the world. We believe that
                                   beautiful furniture shouldn't be a luxury—it should be accessible
                                   to everyone.
                              </p>
                              <p className="text-gray-600 mb-4">
                                   Our team of designers and craftsmen work tirelessly to create
                                   pieces that not only look stunning but stand the test of time.
                                   Every item in our collection is carefully selected and tested
                                   to ensure it meets our rigorous standards.
                              </p>
                         </div>
                    </div>
               </section>

               {/* Values Section */}
               <section className="py-16 bg-neutral">
                    <div className="container mx-auto px-4">
                         <h2 className="text-3xl font-bold text-brand text-center mb-12">Our Values</h2>
                         <div className="grid md:grid-cols-3 gap-8">
                              <div className="bg-white p-8 rounded-lg shadow-sm">
                                   <h3 className="text-xl font-bold text-brand mb-4">Quality First</h3>
                                   <p className="text-gray-600">
                                        We never compromise on materials or craftsmanship. Every piece
                                        is built to last generations.
                                   </p>
                              </div>
                              <div className="bg-white p-8 rounded-lg shadow-sm">
                                   <h3 className="text-xl font-bold text-brand mb-4">Sustainable Design</h3>
                                   <p className="text-gray-600">
                                        We're committed to eco-friendly practices and sustainable
                                        sourcing throughout our supply chain.
                                   </p>
                              </div>
                              <div className="bg-white p-8 rounded-lg shadow-sm">
                                   <h3 className="text-xl font-bold text-brand mb-4">Customer Focus</h3>
                                   <p className="text-gray-600">
                                        Your satisfaction is our top priority. We're here to help
                                        you find the perfect pieces for your home.
                                   </p>
                              </div>
                         </div>
                    </div>
               </section>

               {/* CTA Section */}
               <section className="py-16">
                    <div className="container mx-auto px-4 text-center">
                         <h2 className="text-3xl font-bold text-brand mb-6">
                              Ready to transform your space?
                         </h2>
                         <Link
                              href="/shop"
                              className="inline-block bg-accent text-brand font-bold px-8 py-4 hover:bg-brand hover:text-white transition-colors"
                         >
                              Browse Our Collection
                         </Link>
                    </div>
               </section>
          </div>
     );
}
