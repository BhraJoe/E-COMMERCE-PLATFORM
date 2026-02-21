import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/common/ProductDetail";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
     const { id } = await params;

     const product = await prisma.product.findUnique({
          where: { id },
          include: { category: true },
     });

     if (!product) {
          notFound();
     }

     return <ProductDetail product={product} />;
}
