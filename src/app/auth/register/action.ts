"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: any) {
     const { name, email, password } = formData;

     if (!name || !email || !password) {
          return { error: "Missing required fields" };
     }

     const existingUser = await prisma.user.findUnique({
          where: { email }
     });

     if (existingUser) {
          return { error: "User already exists with this email" };
     }

     const hashedPassword = await bcrypt.hash(password, 12);

     try {
          await prisma.user.create({
               data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: "USER"
               }
          });
          return { success: true };
     } catch (err) {
          console.error("Registration error:", err);
          return { error: "Something went wrong. Please try again." };
     }
}
