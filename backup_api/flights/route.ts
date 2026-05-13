import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// GET semua flight
export async function GET() {
  const flights = await prisma.flight.findMany()
  return NextResponse.json(flights)
}

// POST buat flight baru (ADMIN ONLY)
export async function POST(req: Request) {

  try {

    const session = await getServerSession(authOptions)

    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()

    console.log("BODY DATA:", body)

    const newFlight = await prisma.flight.create({
      data: {
        airline: body.airline,
        from: body.from,
        to: body.to,
        departure: new Date(body.departure),
        arrival: new Date(body.arrival),
        price: Number(body.price),
        seats: Number(body.seats)
      }
    })

    return NextResponse.json(newFlight)

  } catch (error) {

    console.error("CREATE FLIGHT ERROR:", error)

    return NextResponse.json(
      { message: "Create flight failed" },
      { status: 500 }
    )

  }
}

