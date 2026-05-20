"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import DestinationCarousel from "@/components/home/DestinationCarousel";
import CheapFlights from "@/components/home/CheapFlights";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FlightsPage() {
  const [flights, setFlights] = useState<any[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const cities = [
    "Jakarta",
    "Balikpapan",
    "Medan",
    "Surabaya",
    "Bandung",
    "Makassar",
    "Singapore",
    "Kuala Lumpur",
    "Tokyo",
    "Seoul",
  ];

  useEffect(() => {
    fetch("http://localhost:3000/flights")
      .then((res) => res.json())
      .then(setFlights);
  }, []);

  const searchFlights = () => {
    if (!from || !to) return;

    setLoading(true);

    setTimeout(() => {
      router.push(`/flights/result?from=${from}&to=${to}`);
    }, 700);
  };

  return (
    <div className="relative min-h-screen">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/pastel-purple2.jpg"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-white/20 pointer-events-none -z-10" />

      <Navbar />

      <div className="relative z-10">

        {/* Header */}
        <div className="text-center mt-16">

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-extrabold text-purple-600"
          >
            ✈️ Destinayo
          </motion.h1>

          <p className="mt-3 text-black tracking-[5px] uppercase font-bold">
            Find your best destination
          </p>

        </div>

        {/* SEARCH */}
        <div className="flex justify-center mt-10 px-6">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
              w-full
              max-w-5xl
              bg-white/95
              backdrop-blur-md
              shadow-xl
              rounded-2xl
              px-6
              py-3
              border
              border-purple-100
            "
          >

            <div className="grid md:grid-cols-3 gap-4 items-center">

              {/* FROM */}
              <Select onValueChange={setFrom}>
                <SelectTrigger className="h-10 rounded-xl bg-white border border-purple-200 shadow-sm text-black">

                  <SelectValue
                    placeholder="🛫 From"
                    className="text-black"
                  />

                </SelectTrigger>

                <SelectContent className="bg-white text-black">

                  {cities.map((city) => (
                    <SelectItem
                      key={city}
                      value={city}
                      className="
                        text-black
                        hover:bg-purple-50
                        focus:bg-purple-50
                      "
                    >
                      {city}
                    </SelectItem>
                  ))}

                </SelectContent>
              </Select>


              {/* TO */}
              <Select onValueChange={setTo}>

                <SelectTrigger className="h-10 rounded-xl bg-white border border-purple-200 shadow-sm text-black">

                  <SelectValue
                    placeholder="🛬 To"
                    className="text-black"
                  />

                </SelectTrigger>

                <SelectContent className="bg-white text-black">

                  {cities.map((city) => (
                    <SelectItem
                      key={city}
                      value={city}
                      className="
                        text-black
                        hover:bg-purple-50
                        focus:bg-purple-50
                      "
                    >
                      {city}
                    </SelectItem>
                  ))}

                </SelectContent>

              </Select>


              {/* BUTTON */}
              <Button
                onClick={searchFlights}
                className="
                h-10
                rounded-xl
                bg-purple-600
                hover:bg-purple-700
                text-base
                font-semibold
                shadow-lg
                "
              >
                {loading ? "Searching..." : "Search ✨"}
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