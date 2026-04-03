"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function FlightDetail() {
  const params = useParams();
  const [flight, setFlight] = useState<any>(null);
  const [seats, setSeats] = useState(1);


  useEffect(() => {
    if (!params?.id) return;

    const fetchFlight = async () => {
      const res = await fetch(
        `http://localhost:3000/flights/${params.id}`
      );
      const data = await res.json();
      setFlight(data);
    };

    fetchFlight();
  }, [params]);

  if (!flight) return <div>Loading...</div>;

  const handleBooking = async () => {
  try {
    const res = await fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flightId: Number(params.id),
        seats: seats,
      }),
    });

    const data = await res.json();
    console.log(data);

    alert("Booking berhasil 🎉");
  } catch (err) {
    console.error(err);
    alert("Booking gagal ❌");
  }
};


  return (
    <div style={{ padding: 20 }}>
      <h1>✈️ Flight Detail</h1>

      <p><b>{flight.from}</b> → <b>{flight.to}</b></p>
      <p>💰 Price: {flight.price}</p>
      <p>🪑 Seats: {flight.seats}</p>

    <input type="number" value={seats} onChange={(e) => setSeats(Number(e.target.value))}
    min={1}
  />

    <button onClick={handleBooking}>
    BOOK NOW ✈️
    </button>

  </div>

  );
}

