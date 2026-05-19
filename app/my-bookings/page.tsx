"use client";

import { useEffect, useState } from "react";
import BookingCard from "@/components/booking/BookingCard";

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3000/bookings/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Gagal fetch booking:", error);
      }
    };

    fetchBookings();
  }, []);

  // ❌ CANCEL BOOKING
  const handleCancel = async (id: number) => {
    const token = localStorage.getItem("token");

    try {
      await fetch(`http://localhost:3000/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // update UI tanpa reload
      setBookings((prev) => prev.filter((b) => b.id !== id));

    } catch (error) {
      console.error("Gagal cancel booking:", error);
    }
  };

  // 🎨 UI
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold text-purple-500 mb-6">
        Destinayo ✈️ My Bookings
      </h1>

      {/* CONTENT */}
      {bookings.length === 0 ? (
        <p className="text-gray-400">No bookings found.</p>
      ) : (
        <div className="space-y-4 text-black">
          {bookings.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}

    </div>
  );
}
