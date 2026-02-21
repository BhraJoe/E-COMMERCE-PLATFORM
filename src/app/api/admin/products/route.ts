import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
     const session = await auth();
     if (!session?.user || (session.user as any).role !== "ADMIN") {
          return new NextResponse("Unauthorized", { status: 401 });
     }

     try {
          const body = await req.json();
          const product = await prisma.product.create({
               data: {
                    ...body,
               },
          });
          return NextResponse.json(product);
     } catch (error) {
          console.error("[PRODUCTS_POST]", error);
          return new NextResponse("Internal Error", { status: 500 });
     }
}
