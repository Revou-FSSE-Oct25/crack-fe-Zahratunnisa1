"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function FlightsPage() {
  const [flights, setFlights] = useState<any[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchFlights = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/flights?from=${from}&to=${to}`
      );
      const data = await res.json();
      setFlights(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-50 flex flex-col">

      {/* HEADER */}
      <div className="text-center mt-10">
        <h1 className="text-5xl font-extrabold text-purple-700 tracking-tight">
          ✈️ Destinayo
        </h1>
        <p className="text-gray-500 mt-2">Temukan perjalanan terbaikmu</p>
      </div>

      {/* SEARCH CENTER */}
      <div className="flex flex-1 items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-6 border"
        >
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              placeholder="✈️ From (e.g. CGK)"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />

            <Input
              placeholder="📍 To (e.g. DPS)"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />

            <Button
              onClick={searchFlights}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* RESULTS */}
      <div className="pb-10 px-6">
        {flights.length === 0 && !loading && (
          <p className="text-center text-gray-400">
            Belum ada hasil ✨ coba cari penerbangan dulu
          </p>
        )}

        <div className="grid gap-4 max-w-2xl mx-auto mt-6">
          {flights.map((f) => (
            <motion.div
              key={f.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                onClick={() => router.push(`/flights/${f.id}`)}
                className="cursor-pointer hover:shadow-2xl transition rounded-2xl"
              >
                <CardContent className="p-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-purple-700">
                      {f.from} → {f.to}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      🪑 {f.seats} seats available
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-purple-600">
                      Rp {f.price}
                    </p>
                    <p className="text-xs text-gray-400">per seat</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
