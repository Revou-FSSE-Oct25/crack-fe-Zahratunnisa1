"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function FlightDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [flight, setFlight] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/flights/${id}`)
      .then((res) => res.json())
      .then(setFlight);
  }, [id]);

  if (!flight)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        ✈️ Loading flight...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-50 p-6 flex flex-col items-center">

      {/* HEADER */}
      <h1 className="text-4xl font-bold text-purple-700 mb-6">
        ✈️ Flight Detail
      </h1>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl"
      >
        <Card className="rounded-2xl shadow-2xl">
          <CardContent className="p-6 flex flex-col gap-4">

            {/* ROUTE */}
            <h2 className="text-2xl font-bold text-purple-700 text-center">
              {flight.from} → {flight.to}
            </h2>

            {/* INFO */}
            <div className="flex justify-between text-gray-600">
              <p>🪑 Seats</p>
              <p>{flight.seats}</p>
            </div>

            <div className="flex justify-between text-gray-600">
              <p>💰 Price</p>
              <p className="font-semibold text-purple-600">
                Rp {flight.price}
              </p>
            </div>

            {/* ACTION */}
            <Button 
            onClick={() => router.push(`/flights/${id}/booking`)}
            className="bg-purple-600 hover:bg-purple-700 text-white mt-4">
              Book Now
            </Button>

            {/* BACK */}
            <button
              onClick={() => router.back()}
              className="text-sm text-gray-400 hover:text-purple-600"
            >
              ← Back
            </button>

          </CardContent>
        </Card>
      </motion.div>

    </div>
  );
}
