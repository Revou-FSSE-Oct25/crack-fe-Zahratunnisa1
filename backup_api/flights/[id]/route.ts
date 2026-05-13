import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updatedFlight = await prisma.flight.update({
      where: {
        id: params.id,
      },
      data: {
        airline: body.airline,
        from: body.from,
        to: body.to,
        departure: new Date(body.departure),
        arrival: new Date(body.arrival),
        price: body.price,
        seats: body.seats,
      },
    });

    return Response.json(updatedFlight);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return Response.json({ error: "Failed to update flight" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
){
  try {

    const session = await getServerSession(authOptions)

    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const id = params.id

    console.log("DELETE ID:", id)

    await prisma.flight.deleteMany({
      where: {
        id: id
      }
    })

    return NextResponse.json({
      message: "Flight deleted"
    })

  } catch (error) {

    console.error("DELETE ERROR:", error)

    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    )

  }
}

