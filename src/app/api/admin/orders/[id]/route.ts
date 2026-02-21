import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
     const session = await auth();
     if (!session?.user || (session.user as any).role !== "ADMIN") {
          return new NextResponse("Unauthorized", { status: 401 });
     }

     try {
          const { id } = await params;
          const { status } = await req.json();

          const order = await prisma.order.update({
               where: { id },
               data: { status },
          });

          return NextResponse.json(order);
     } catch (error) {
          console.error("[ORDERS_PATCH]", error);
          return new NextResponse("Internal Error", { status: 500 });
     }
}
