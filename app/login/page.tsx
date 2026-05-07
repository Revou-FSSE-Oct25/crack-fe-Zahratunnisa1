"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log("LOGIN RESPONSE:", data);

    setLoading(false);

    if (!res.ok) {
      setError("Email atau password salah");
      return;
    }

    if (!data.access_token) {
      throw new Error("Token tidak ada di response");
    }

    // simpan token
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // redirect
    router.push("/flights");
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    setError("Terjadi error saat login");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative min-h-screen">

       {/* 🌆 BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="/airport.avif"
          className="w-full h-full object-cover"
        />
      </div>

       {/* 🌑 OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

        {/* 🌑 OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 💜 CONTENT */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">

        <form
          onSubmit={handleLogin}
          className="w-full max-w-md space-y-4 rounded-2xl bg-white/90 backdrop-blur-xl p-8 shadow-2xl border border-white/30"
        >
          <h1 className="text-3xl font-bold text-center text-purple-700">
            ✈️ Destinayo Login
          </h1>

          <p className="text-center text-gray-600 text-sm font-light tracking-wide">
            Login to continue your travel
          </p>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <Input
            type="email"
            placeholder="Email"
            className="text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            className="text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
