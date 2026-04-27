"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="w-full px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200">

      {/* LOGO */}
      <h1
        onClick={() => router.push("/flights")}
        className="text-2xl font-bold text-purple-700 cursor-pointer"
      >
        ✈️ Destinayo
      </h1>

      {/* MENU */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => router.push("/flights")}
          className="text-gray-700 hover:text-purple-600 transition"
        >
          Flights
        </button>

        <button
          onClick={() => router.push("/my-bookings")}
          className="text-gray-700 hover:text-purple-600 transition"
        >
          My Bookings
        </button>

        <Button
          onClick={handleLogout}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          Logout
        </Button>

      </div>
    </div>
  );
}
