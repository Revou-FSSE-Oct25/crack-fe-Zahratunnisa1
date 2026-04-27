"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResultPage() {
  const params = useSearchParams();
  const from = params.get("from");
  const to = params.get("to");
  const router = useRouter();

  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/flights?from=${from}&to=${to}`)
      .then((res) => res.json())
      .then(setFlights);
  }, [from, to]);

  const handleBooking = async (flightId: number) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please, Login First!");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        flightId,
        seats: 1,
      }),
    });

    const data = await res.json();

    console.log(data);

    if (!res.ok) {
      alert("Booking failed");
      return;
    }

router.push(`/booking/${data.id}`);

  } catch (err) {
    console.error(err);
    alert("Terjadi error");
  }
};
  return (
    <div style={{ padding: 20 }}>
      <h1>✈️ Result Flight</h1>
      <p>{from} → {to}</p>

{flights.map((f: any) => (
  <div
    key={f.id}
    style={{
      border: "1px solid #ccc",
      margin: 10,
      padding: 10,
    }}
  >
    <p><b>{f.from}</b> → <b>{f.to}</b></p>

    <p>✈️ {f.airline}</p>

    <p>
      🕐Departure :{" "}
       {new Date(f.departureTime).toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
      })} WIB
      </p>


    <p>
  🛬 Arrival :{" "}
      {new Date(f.arrivalTime).toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
      })} WIB
    </p>

    <p>💺 Seats: {f.seats}</p>
    <p>💰 Rp {f.price}</p>

    {/* 🔥 BUTTON BOOK */}
    <button
      onClick={() => router.push(`/flights/${f.id}`)}
      style={{
        marginTop: 10,
        padding: "8px 12px",
        background: "black",
        color: "white",
        borderRadius: 6,
      }}
    >
      Booking Ticket
    </button>
  </div>
))}
    </div>
  );
}
