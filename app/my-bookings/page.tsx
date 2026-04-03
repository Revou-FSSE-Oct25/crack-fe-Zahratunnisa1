"use client";

import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch("http://localhost:3000/bookings/my");
      const data = await res.json();
      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📜 My Bookings</h1>

      {bookings.map((b) => (
        <div
          key={b.id}
          style={{
            border: "1px solid #ccc",
            margin: 10,
            padding: 10,
          }}
        >
          <p><b>{b.flight.from}</b> → <b>{b.flight.to}</b></p>
          <p>Seats: {b.seats}</p>
        </div>
      ))}
    </div>
  );
}
