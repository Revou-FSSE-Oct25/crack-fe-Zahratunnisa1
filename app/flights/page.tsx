"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FlightsPage() {
  const [flights, setFlights] = useState<any[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const router = useRouter();

  const searchFlights = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/flights?from=${from}&to=${to}`
      );

      const data = await res.json();
      setFlights(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
       <h1 style={{ color: "#7c3aed" }}>✈️ Flight Booking</h1>
       <a href="/my-bookings">📜 Lihat Booking Saya</a>

      {/* SEARCH BOX */}
      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <input
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          style={{ padding: 10, borderRadius: 8 }}
        />

        <input
          placeholder="To (contoh: DPS)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={{ padding: 10, borderRadius: 8 }}
        />

        <button onClick={searchFlights}style={{
            backgroundColor: "#7c3aed",
            color: "white",
            padding: "10px 20px",
            borderRadius: 8,
          }}>Search</button>
      </div>

      <div>
        {flights.map((f) => (
          <div
            key={f.id}
            onClick={() => router.push(`/flights/${f.id}`)}
            style={{
              backgroundColor: "white",
              padding: 15,
              border: "1px solid #ccc",
              marginBottom: 10,
              borderRadius: 10,
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            <p>
              <h3>{f.from} →{f.to}</h3>
            </p>
            <p>💰 Price: {f.price}</p>
            <p>🪑 Seats: {f.seats}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
