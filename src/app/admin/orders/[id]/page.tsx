import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import OrderManager from "@/components/admin/OrderManager";

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
     const { id } = await params;

     const order = await prisma.order.findUnique({
          where: { id },
          include: {
               user: true,
               orderItems: { include: { product: true } }
          }
     });

     if (!order) {
          notFound();
     }

     return (
          <div className="space-y-12">
               <div>
                    <h1 className="text-3xl font-bold text-brand tracking-tighter uppercase">Order Details</h1>
                    <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest italic">Management of order #{order.id.toUpperCase()}</p>
               </div>

               <OrderManager order={order} />
          </div>
     );
}
