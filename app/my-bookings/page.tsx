"use client";

import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc3NTM2MTQ3NywiZXhwIjoxNzc1NDQ3ODc3fQ.kI_gmsTkYjErCD5-PzQXi4MTP_kjoIXn4KhOBUkaX00"); 
      if (!token) return;

      const res = await fetch("http://localhost:3000/bookings/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📜 My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((b) => (
          <div
            key={b.id}
            style={{
              border: "1px solid #ccc",
              margin: 10,
              padding: 10,
            }}
          >
            <p>
              <b>{b.flight.from}</b> → <b>{b.flight.to}</b>
            </p>
            <p>Seats: {b.seats}</p>
          </div>
        ))
      )}
    </div>
  );
}

