"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleBooking = async () => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    const res = await fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        flightId: Number(id),
        seats: 1,
        name,
        email,
        phone,
      }),
    });

  const data = await res.json();
  console.log("RESPONSE:", data);

  if (res.ok) {
    // ❗ JANGAN ke my-bookings dulu
    router.push(`/booking/${data.id}`);
  } else {
    alert("Booking gagal");
  }
};

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">
          Isi Data Pemesan ✈️
        </h1>

        <div className="space-y-4">
          <input
            className="w-full border p-3 rounded"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full border p-3 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border p-3 rounded"
            placeholder="No HP"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={handleBooking}
            className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700"
          >
            Konfirmasi Booking
          </button>
        </div>
      </div>
    </div>
  );
}
