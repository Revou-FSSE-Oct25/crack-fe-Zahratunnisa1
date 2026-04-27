"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BookingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  

  const [method, setMethod] = useState("VA");
  const [file, setFile] = useState<File | null>(null);
  const [timeLeft, setTimeLeft] = useState("");

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH BOOKING
  const fetchBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBooking(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchBooking();
  }, [id]);

  // ✅ COUNTDOWN TIMER (FIXED)
  useEffect(() => {
    if (!booking?.expiresAt) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expire = new Date(booking.expiresAt).getTime();
      const diff = expire - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setTimeLeft(`${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [booking]);

  // ✅ PAYMENT
  const handlePayment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const formData = new FormData();
    formData.append("method", method);

    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await fetch(
        `http://localhost:3000/bookings/${id}/pay`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        alert("Payment failed");
        return;
      }

      alert("✅ Payment submitted!");
      fetchBooking();
    } catch (err) {
      console.error(err);
      alert("Error payment");
    }
  };

  // ✅ LOADING STATE
  if (loading) return <p>Loading...</p>;
  if (!booking) return <p>Booking not found</p>;

  return (
   <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-6 mt-6">
        <h1 className="text-3xl font-bold text-purple-700">
          ✈️ Destinayo Payment
        </h1>
        <p className="text-gray-500">
          Finish your ticket payment
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto px-6 mt-6 grid md:grid-cols-3 gap-6">

        {/* LEFT - PAYMENT */}
        <div className="md:col-span-2">
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6 space-y-5">

              <h2 className="text-xl font-semibold text-purple-700">
                💳 Payment Methode
              </h2>

              <select
                className="w-full border rounded-lg p-3 text-purple-700 font-medium"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="VA">Virtual Account</option>
                <option value="BANK">Transfer Bank</option>
                <option value="MINIMARKET">Minimarket</option>
              </select>

              <div>
                <p className="font-medium mb-2 text-gray-900">
                  Upload proof of transfer
                </p>
                <Input
                  type="file"
                  className="text-black file:text-white file:bg-purple-600 file:border-0 file:px-4 file:py-1 file:rounded-md file:mr-4 hover:file:bg-purple-700"
                  onChange={(e) =>
                    setFile(e.target.files?.[0] || null)
                  }
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
                <p className="w-full border rounded-lg p-3 text-black">
                  ⏳ Countdown payment :
                </p>
                <p className="text-lg font-bold text-red-500">
                  {timeLeft}
                </p>
              </div>

              <Button
                onClick={handlePayment}
                disabled={timeLeft === "Expired"}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Already Paid ✅
              </Button>

            </CardContent>
          </Card>
        </div>

        {/* RIGHT - SUMMARY */}
        <div>
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6 space-y-4">

              <h2 className="w-full border rounded-lg p-3 text-purple-700 font-medium">
                ✈️ Bookings Details
              </h2>

              <div>
                <p className="font-bold text-purple-700">
                  {booking.flight.from} → {booking.flight.to}
                </p>
                <p className="text-sm text-gray-500">
                  {booking.flight.airline}
                </p>
              </div>

              <div className="text-sm text-gray-600">
                <p>
                  🕐 Departure:{" "}
                  {new Date(
                    booking.flight.departureTime
                  ).toLocaleTimeString()}
                </p>
                <p>
                  🛬 Arrival:{" "}
                  {new Date(
                    booking.flight.arrivalTime
                  ).toLocaleTimeString()}
                </p>
              </div>

              <hr />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-purple-700">
                  Rp{" "}
                  {booking.totalPrice.toLocaleString("id-ID")}
                </span>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

