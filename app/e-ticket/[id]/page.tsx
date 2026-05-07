"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";

interface Passenger {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Flight {
  from: string;
  to: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
}

interface Booking {
  id: number;
  status: string;
  totalPrice: number;
  flight: Flight;
  passengers: Passenger[];
}

export default function TicketPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3000/bookings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setBooking(data);
    };

    fetchBooking();
  }, [id]);

  if (!booking) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="bg-purple-600 text-white p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">
            ✈️ Destinayo E-Ticket
          </h1>

          <div className="text-right">
            <p className="text-sm">Booking Code</p>
            <p className="font-bold text-lg">DST-{booking.id}</p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8 space-y-8">

          {/* ROUTE */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">From</p>
              <h2 className="text-xl font-semibold text-black">
                {booking.flight.from}
              </h2>
            </div>

            <div className="text-purple-600 font-bold text-xl">
              →
            </div>

            <div className="text-right">
              <p className="text-gray-500 text-sm">To</p>
              <h2 className="text-xl font-semibold text-black">
                {booking.flight.to}
              </h2>
            </div>
          </div>

          {/* FLIGHT INFO */}
          <div className="grid grid-cols-2 gap-6 border-t pt-6">
            <div>
              <p className="text-gray-500 text-sm">Airline</p>
              <p className="font-medium text-black">
                {booking.flight.airline}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Status</p>
              <p className="text-green-600 font-semibold">
                {booking.status}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Departure</p>
              <p className="font-medium text-black">
                {new Date(
                  booking.flight.departureTime
                ).toLocaleString("id-ID")}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Arrival</p>
              <p className="font-medium text-black">
                {new Date(
                  booking.flight.arrivalTime
                ).toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          {/* PASSENGERS */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-500">
              👤 Passenger Details
            </h3>

            <div className="space-y-4">
              {booking.passengers.map((p, i) => (
                <div
                  key={p.id}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <p className="font-semibold text-gray-500">
                    Passenger {i + 1}
                  </p>
                  <p className="text-sm text-gray-600">
                    {p.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {p.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    {p.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* PRICE */}
          <div className="border-t pt-6 flex justify-between items-center">
            <p className="text-gray-500">Total Payment</p>
            <p className="text-xl font-bold text-purple-600">
              Rp {booking.totalPrice.toLocaleString("id-ID")}
            </p>
          </div>

          {/* BUTTON */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={() => window.print()}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
            >
              🖨 Print Ticket
            </button>

            <button
              onClick={() =>
                (window.location.href = "/my-bookings")
              }
              className="flex-1 border border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-purple-50"
            >
              Back to My Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}