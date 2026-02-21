import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
     return (
          <footer className="bg-brand text-white pt-16 pb-8">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                         {/* Brand Info */}
                         <div className="space-y-4">
                              <h3 className="text-2xl font-bold tracking-tighter">
                                   MODERN<span className="text-accent">EST</span>
                              </h3>
                              <p className="text-gray-400 text-sm leading-relaxed">
                                   Curating the finest selection of modern products for your home and lifestyle. Premium quality, sustainable sourcing.
                              </p>
                              <div className="flex space-x-4">
                                   <Link href="#" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></Link>
                                   <Link href="#" className="hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></Link>
                                   <Link href="#" className="hover:text-accent transition-colors"><Twitter className="w-5 h-5" /></Link>
                              </div>
                         </div>

                         {/* Quick Links */}
                         <div>
                              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent">Shop</h4>
                              <ul className="space-y-3 text-sm text-gray-400">
                                   <li><Link href="/shop" className="hover:text-white transition-colors">New Arrivals</Link></li>
                                   <li><Link href="/shop" className="hover:text-white transition-colors">Best Sellers</Link></li>
                                   <li><Link href="/shop" className="hover:text-white transition-colors">Featured Collections</Link></li>
                                   <li><Link href="/shop" className="hover:text-white transition-colors">Sale</Link></li>
                              </ul>
                         </div>

                         {/* Customer Support */}
                         <div>
                              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent">Support</h4>
                              <ul className="space-y-3 text-sm text-gray-400">
                                   <li><Link href="/faq" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                                   <li><Link href="/faq" className="hover:text-white transition-colors">Order Tracking</Link></li>
                                   <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                                   <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                              </ul>
                         </div>

                         {/* Contact Info */}
                         <div className="space-y-4">
                              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent">Get in Touch</h4>
                              <div className="flex items-center space-x-3 text-sm text-gray-400">
                                   <Mail className="w-4 h-4 text-accent" />
                                   <span>hello@modernest.com</span>
                              </div>
                              <div className="flex items-center space-x-3 text-sm text-gray-400">
                                   <Phone className="w-4 h-4 text-accent" />
                                   <span>+1 (555) 123-4567</span>
                              </div>
                              <div className="flex items-center space-x-3 text-sm text-gray-400">
                                   <MapPin className="w-4 h-4 text-accent" />
                                   <span>123 Design St, Digital City</span>
                              </div>
                         </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
                         <p>© 2026 Modernest. All rights reserved.</p>
                         <div className="flex space-x-6">
                              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                              <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
                         </div>
                    </div>
               </div>
          </footer>
     );
}
