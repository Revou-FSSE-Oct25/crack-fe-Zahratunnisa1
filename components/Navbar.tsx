"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const isAdmin = user?.role === "ADMIN";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <div className="w-full px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200">

      {/* LOGO */}
      <div
        onClick={() => router.push("/flights")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Plane className="w-8 h-8 text-purple-700" />

        <h1 className="text-2xl font-bold text-purple-700">
          Destinayo
        </h1>
      </div>

      {/* MENU */}
      <div className="flex items-center gap-5">

        {/* CUSTOMER */}
        <button
          onClick={() => router.push("/flights")}
          className="px-4 py-2 rounded-full font-medium tracking-tight text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition-all duration-300"
        >
          Flights
        </button>

        <button
          onClick={() => router.push("/my-bookings")}
          className="px-4 py-2 rounded-full font-medium tracking-tight text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition-all duration-300"
        >
          My Bookings
        </button>

        {/* ADMIN MENU */}
        {isAdmin && (
          <>
            <button
              onClick={() => router.push("/admin/flights")}
              className="px-4 py-2 rounded-full font-medium tracking-tight text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition-all duration-300"
            >
              Admin Flights
            </button>

            <button
              onClick={() => router.push("/admin/manage-bookings")}
              className="px-4 py-2 rounded-full font-medium tracking-tight text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition-all duration-300"
            >
              Manage Bookings
            </button>
          </>
        )}

        {/* LOGOUT */}
        <Button
          onClick={handleLogout}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
        >
          Logout
        </Button>

      </div>
    </div>
  );
}