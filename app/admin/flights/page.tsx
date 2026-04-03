"use client"

import { useEffect, useState } from "react"

export default function AdminFlightsPage() {

  const [flights, setFlights] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingFlight, setEditingFlight] = useState<any>(null)


  const [airline, setAirline] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [departure, setDeparture] = useState("")
  const [arrival, setArrival] = useState("")
  const [price, setPrice] = useState("")
  const [seats, setSeats] = useState("")


  async function fetchFlights() {
    const res = await fetch("/api/flights")
    const data = await res.json()
    setFlights(data)
  }

  useEffect(() => {
    fetchFlights()
  }, [])

  function editFlight(flight: any) {
  setEditingFlight(flight)
}

  async function deleteFlight(id: string) {

    console.log("ID sent to API:", id)

    const confirmDelete = confirm("Delete this flight?")

    if (!confirmDelete) return

    await fetch(`/api/flights/${id}`, {
      method: "DELETE"
    })

    setFlights(flights.filter((f:any) => f.id !== id))

  }

  async function createFlight() {

  const res = await fetch("/api/flights", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      airline,
      from,
      to,
      departure,
      arrival,
      price: Number(price),
      seats: Number(seats)
    })
  })

  if (res.ok) {
    alert("Flight created")
    fetchFlights()
    setShowForm(false)
  } else {
    alert("Failed to create flight")
  }
}

async function updateFlight() {

  await fetch(`/api/flights/${editingFlight.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editingFlight)
  })

  setEditingFlight(null)

  fetchFlights()
}

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Flights</h1>

    <button onClick={() => setShowForm(true)}>
         Add Flight
    </button>

    {showForm && (

    <div style={{ marginTop: "20px" }}>

    <h3>Add Flight</h3>

    <input placeholder="Airline" onChange={(e)=>setAirline(e.target.value)} />
    <input placeholder="From" onChange={(e)=>setFrom(e.target.value)} />
    <input placeholder="To" onChange={(e)=>setTo(e.target.value)} />

    <input type="datetime-local"
    onChange={(e)=>setDeparture(e.target.value)} />

    <input type="datetime-local"
    onChange={(e)=>setArrival(e.target.value)} />

    <input placeholder="Price"
    onChange={(e)=>setPrice(e.target.value)} />

    <input placeholder="Seats"
    onChange={(e)=>setSeats(e.target.value)} />

  <br/><br/>

  <button onClick={createFlight}>
  Create Flight
  </button>

  {editingFlight && (
  <div>
    <h2>Edit Flight</h2>

    <input
      value={editingFlight.airline}
      onChange={(e) =>
        setEditingFlight({
          ...editingFlight,
          airline: e.target.value
        })
      }
    />

    <input
      value={editingFlight.price}
      onChange={(e) =>
        setEditingFlight({
          ...editingFlight,
          price: e.target.value
        })
      }
    />

    <button onClick={updateFlight}>
      Update Flight
    </button>
  </div>
)}

</div>

)}

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Airline</th>
            <th>From</th>
            <th>To</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {flights.map((flight: any) => (
            <tr key={flight.id}>
              <td>{flight.airline}</td>
              <td>{flight.from}</td>
              <td>{flight.to}</td>
              <td>{flight.price}</td>

              <td>
                <button onClick={() => deleteFlight(flight.id)}>
                  Delete
                </button>

                <button onClick={() => editFlight(flight)}>
                  Edit
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

