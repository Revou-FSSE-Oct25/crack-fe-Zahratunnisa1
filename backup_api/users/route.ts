import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  const body = await req.json()

  const hashedPassword = await bcrypt.hash(body.password, 10)

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: hashedPassword, 
      role: "BUYER"
    }
  })

  return NextResponse.json(newUser)
}
