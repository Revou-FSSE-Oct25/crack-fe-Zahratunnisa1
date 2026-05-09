"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

type Booking = {
  id: number;
  status: string;
  totalPrice: number;

  user: {
    email: string;
  };

  flight: {
    from: string;
    to: string;
    airline: string;
  };

  passengers: {
    id: number;
    name: string;
  }[];
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:3000/bookings/admin/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      setBookings(data);
    });
}, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-purple-700 mb-8">
          📋 Customer Bookings
        </h1>

        <div className="space-y-5">
        {Array.isArray(bookings) &&
        bookings.map((booking) => (
        <div
        key={booking.id}
        className="bg-white rounded-2xl shadow p-6 border"
        >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-black">
                    {booking.flight.from} → {booking.flight.to}
                  </h2>

                  <p className="text-gray-600">
                    {booking.flight.airline}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Customer:
                  </p>

                  <p className="font-semibold text-purple-700">
                    {booking.user.email}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-purple-700">
                    Rp {booking.totalPrice.toLocaleString("id-ID")}
                  </p>

                  <p className="mt-2 text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    {booking.status}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="font-semibold text-black mb-2">
                  Passengers
                </h3>

                <div className="grid md:grid-cols-2 gap-3">
                  {booking.passengers.map((p) => (
                    <div
                      key={p.id}
                      className="border rounded-lg p-3"
                    >
                      <p className="font-medium text-black">
                        {p.name}
                      </p>
                    </div>
                  ))}

                  {/* 🔥 ADMIN ACTIONS */}
         <div className="flex gap-3 mt-5">

        <button
          onClick={async () => {
            const token = localStorage.getItem("token");

            await fetch(
              `http://localhost:3000/bookings/admin/${booking.id}/confirm`,
              {
                method: "PATCH",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            location.reload();
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Accept
        </button>

        <button
          onClick={async () => {
            const token = localStorage.getItem("token");

            await fetch(
              `http://localhost:3000/bookings/admin/${booking.id}/reject`,
              {
                method: "PATCH",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            location.reload();
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          Reject
      </button>

  <button
    onClick={async () => {
      const token = localStorage.getItem("token");

      await fetch(
        `http://localhost:3000/bookings/admin/${booking.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      location.reload();
    }}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
  >
    Delete
  </button>

</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}