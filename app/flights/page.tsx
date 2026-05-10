"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import DestinationCarousel from "@/components/home/DestinationCarousel";
import CheapFlights from "@/components/home/CheapFlights";


export default function FlightsPage() {
  const [flights, setFlights] = useState<any[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3000/flights")
      .then((res) => res.json())
      .then(setFlights);
  }, []);

  const searchFlights = () => {
    if (!from || !to) return;
    router.push(`/flights/result?from=${from}&to=${to}`);
  };

  return (
    <div className="relative min-h-screen">

      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/pastel-purple2.jpg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 💜 OVERLAY */}
      <div className="absolute inset-0 bg-white/20 pointer-events-none -z-10" />

      {/* ✅ NAVBAR (CUKUP SEKALI) */}
      <Navbar />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* HEADER */}
        <div className="text-center mt-16">
          <h1 className="text-5xl font-extrabold text-purple-600">
            ✈️ Destinayo
          </h1>
          <p className="mt-3 text-1xl font-bold text-black tracking-widest uppercase">
            Find your best destination
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex flex-1 items-center justify-center px-6 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-6 border border-white/30"
          >
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                className="text-black"
                placeholder="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />

              <Input
                className="text-black"
                placeholder="To"
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

        <DestinationCarousel />
        <CheapFlights />

      </div>
    </div>
  );
}

