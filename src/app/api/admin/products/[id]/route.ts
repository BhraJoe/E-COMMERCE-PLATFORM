import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
     const session = await auth();
     if (!session?.user || (session.user as any).role !== "ADMIN") {
          return new NextResponse("Unauthorized", { status: 401 });
     }

     try {
          const { id } = await params;
          const body = await req.json();
          const product = await prisma.product.update({
               where: { id },
               data: { ...body },
          });
          return NextResponse.json(product);
     } catch (error) {
          console.error("[PRODUCT_PUT]", error);
          return new NextResponse("Internal Error", { status: 500 });
     }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
     const session = await auth();
     if (!session?.user || (session.user as any).role !== "ADMIN") {
          return new NextResponse("Unauthorized", { status: 401 });
     }

     try {
          const { id } = await params;
          await prisma.product.delete({ where: { id } });
          return new NextResponse(null, { status: 204 });
     } catch (error) {
          console.error("[PRODUCT_DELETE]", error);
          return new NextResponse("Internal Error", { status: 500 });
     }
}
