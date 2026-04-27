"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function AdminFlightsPage() {
  const [flights, setFlights] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [airline, setAirline] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("");

  async function fetchFlights() {
    const res = await fetch("http://localhost:3000/flights");
    const data = await res.json();
    setFlights(data);
  }

  useEffect(() => {
    fetchFlights();
  }, []);

  async function deleteFlight(id: number) {
    await fetch(`http://localhost:3000/flights/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchFlights();
  }

  async function createFlight() {
    const res = await fetch("http://localhost:3000/flights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        airline,
        from,
        to,
        departureTime: departure,
        arrivalTime: arrival,
        price: Number(price),
        seats: Number(seats),
      }),
    });

    if (res.ok) {
      setShowForm(false);
      fetchFlights();
    } else {
      alert("Failed create flight");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-300">
            ✈️ Admin Flights
          </h1>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
          >
            + Add Flight
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl mb-6 space-y-3">

            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Airline" className="p-2 rounded text-black"
                onChange={(e) => setAirline(e.target.value)} />

              <input placeholder="From" className="p-2 rounded text-black"
                onChange={(e) => setFrom(e.target.value)} />

              <input placeholder="To" className="p-2 rounded text-black"
                onChange={(e) => setTo(e.target.value)} />

              <input type="datetime-local" className="p-2 rounded text-black"
                onChange={(e) => setDeparture(e.target.value)} />

              <input type="datetime-local" className="p-2 rounded text-black"
                onChange={(e) => setArrival(e.target.value)} />

              <input placeholder="Price" className="p-2 rounded text-black"
                onChange={(e) => setPrice(e.target.value)} />

              <input placeholder="Seats" className="p-2 rounded text-black"
                onChange={(e) => setSeats(e.target.value)} />
            </div>

            <button
              onClick={createFlight}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg mt-3"
            >
              Create Flight
            </button>
          </div>
        )}

        {/* TABLE */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
          <table className="w-full text-left">

            <thead className="bg-purple-700/50">
              <tr>
                <th className="p-3">Airline</th>
                <th className="p-3">Route</th>
                <th className="p-3">Time</th>
                <th className="p-3">Price</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {flights.map((f) => (
                <tr key={f.id} className="border-b border-white/10 hover:bg-white/10">

                  <td className="p-3">{f.airline}</td>

                  <td className="p-3">
                    {f.from} → {f.to}
                  </td>

                  <td className="p-3 text-sm">
                    {new Date(f.departureTime).toLocaleTimeString("id-ID")} -{" "}
                    {new Date(f.arrivalTime).toLocaleTimeString("id-ID")}
                  </td>

                  <td className="p-3 text-purple-300 font-semibold">
                    Rp {f.price.toLocaleString("id-ID")}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => deleteFlight(f.id)}
                      className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}


