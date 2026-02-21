import { Inter } from "next/font/google";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LayoutDashboard, ShoppingBag, List, Users, LogOut, Package } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
     const session = await auth();

     if (!session?.user || session.user.role !== "ADMIN") {
          redirect("/");
     }

     return (
          <html lang="en">
               <body className={`${inter.className} min-h-screen flex flex-col`}>
                    <div className="flex min-h-screen bg-gray-50">
                         {/* Admin Sidebar */}
                         <aside className="w-64 bg-brand text-white fixed h-full z-50">
                              <div className="p-8 border-b border-white/10">
                                   <Link href="/" className="text-xl font-bold tracking-tighter">
                                        MODERN<span className="text-accent">EST</span> <span className="text-[10px] bg-accent text-brand px-1.5 py-0.5 ml-2 uppercase">Admin</span>
                                   </Link>
                              </div>

                              <nav className="p-6 space-y-2 mt-4">
                                   <Link href="/admin" className="flex items-center space-x-3 p-3 bg-white/10 text-white rounded-lg text-sm font-bold uppercase tracking-widest">
                                        <LayoutDashboard className="w-4 h-4" />
                                        <span>Dashboard</span>
                                   </Link>
                                   <Link href="/admin/products" className="flex items-center space-x-3 p-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg text-sm font-bold uppercase tracking-widest transition-all">
                                        <ShoppingBag className="w-4 h-4" />
                                        <span>Products</span>
                                   </Link>
                                   <Link href="/admin/categories" className="flex items-center space-x-3 p-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg text-sm font-bold uppercase tracking-widest transition-all">
                                        <List className="w-4 h-4" />
                                        <span>Categories</span>
                                   </Link>
                                   <Link href="/admin/orders" className="flex items-center space-x-3 p-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg text-sm font-bold uppercase tracking-widest transition-all">
                                        <Package className="w-4 h-4" />
                                        <span>Orders</span>
                                   </Link>
                                   <Link href="/admin/users" className="flex items-center space-x-3 p-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg text-sm font-bold uppercase tracking-widest transition-all">
                                        <Users className="w-4 h-4" />
                                        <span>Users</span>
                                   </Link>
                                   <div className="pt-8 border-t border-white/10">
                                        <Link href="/" className="flex items-center space-x-3 p-3 text-gray-400 hover:text-white rounded-lg text-sm font-bold uppercase tracking-widest transition-all">
                                             <LogOut className="w-4 h-4" />
                                             <span>Main Site</span>
                                        </Link>
                                   </div>
                              </nav>
                         </aside>

                         {/* Main Content Area */}
                         <main className="flex-grow ml-64 p-12">
                              {children}
                         </main>
                    </div>
               </body>
          </html>
     );
}
