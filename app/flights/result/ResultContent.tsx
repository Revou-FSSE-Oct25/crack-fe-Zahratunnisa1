"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Flight = {
  id: number;
  from: string;
  to: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  seats: number;
  price: number;
};

export default function ResultContent() {
  const params = useSearchParams();
  const from = params.get("from");
  const to = params.get("to");
  const router = useRouter();

  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    if (!from || !to) return;

    fetch(`http://localhost:3000/flights?from=${from}&to=${to}`)
      .then((res) => res.json())
      .then(setFlights)
      .catch((err) => console.error(err));
  }, [from, to]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-2xl font-bold text-purple-600">
          Destinayo ✈️
        </h1>

        <p className="text-gray-700 mt-2">
          {from} → {to}
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {flights.map((f) => (
          <Card
            key={f.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <CardContent className="p-5 flex justify-between items-center">

              <div className="flex items-center gap-4">
                <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
                  ✈️
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {f.from} → {f.to}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {f.airline}
                  </p>

                  <p className="text-sm text-gray-500">
                    🕐{" "}
                    {new Date(f.departureTime).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })} -{" "}
                    {new Date(f.arrivalTime).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <p className="text-sm text-gray-500">
                    💺 {f.seats} seats available
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-purple-600">
                  Rp {f.price.toLocaleString("id-ID")}
                </p>

                <Button
                  className="mt-2 bg-purple-600 hover:bg-purple-700"
                  onClick={() => router.push(`/flights/${f.id}`)}
                >
                  View Detail
                </Button>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}