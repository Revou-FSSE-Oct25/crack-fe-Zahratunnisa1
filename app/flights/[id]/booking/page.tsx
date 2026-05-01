"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function BookingPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

 const [passengers, setPassengers] = useState([
    { name: "", email: "", phone: "" },
  ]);

  const addPassenger = () => {
    setPassengers([...passengers, { name: "", email: "", phone: "" }]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const newPassengers = [...passengers];
    (newPassengers[index] as any)[field] = value;
    setPassengers(newPassengers);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        flightId: Number(id),
        seats: passengers.length,
        passengers,
      }),
    });

  const data = await res.json();

  if (!res.ok) {
    alert("Booking gagal");
    return;
  }

  router.push(`/booking/${data.id}`);
};

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-purple-600 mb-6">
          Fill Your Data ✈️
        </h1>

 {/* 🔁 LOOP PASSENGER */}
      {passengers.map((p, index) => (
        <div key={index} className="mb-6 border p-4 rounded-lg">

          <h2 className="font-semibold mb-3 text-gray-800">
            
            Passenger {index + 1}
          </h2>

          <input
            className="w-full border p-3 rounded mb-2 text-black"
            placeholder="Full Name"
            value={p.name}
            onChange={(e) =>
              handleChange(index, "name", e.target.value)
            }
          />

          <input
            className="w-full border p-3 rounded mb-2 text-black"
            placeholder="Email"
            value={p.email}
            onChange={(e) =>
              handleChange(index, "email", e.target.value)
            }
          />

          <input
            className="w-full border p-3 rounded text-black"
            placeholder="Phone"
            value={p.phone}
            onChange={(e) =>
              handleChange(index, "phone", e.target.value)
            }
          />
        </div>
      ))}

      {/* ➕ TAMBAH PENUMPANG */}
      <button
        onClick={addPassenger}
        className="mb-4 text-purple-600 font-semibold"
      >
        + Add Passenger
      </button>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="w-full bg-purple-600 text-white py-3 rounded-lg"
      >
        Continue to Payment
      </button>
    </div>
</div>)}

