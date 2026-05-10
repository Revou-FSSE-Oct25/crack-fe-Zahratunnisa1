"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin
        ? "http://localhost:3000/auth/login"
        : "http://localhost:3000/auth/register";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          fullName,
          phone,
          birthDate,
        }),
      });

      const data = await res.json();

      console.log("AUTH RESPONSE:", data);

      if (!res.ok) {
        setError(data.message || "Authentication gagal");
        return;
      }

      localStorage.setItem("token", data.access_token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      router.push("/flights");

    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan");
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

      {/* 💜 CONTENT */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">

        <form
          onSubmit={handleAuth}
          className="w-full max-w-md space-y-5 rounded-2xl bg-white/90 backdrop-blur-xl p-8 shadow-2xl border border-white/30"
        >

          {/* 🔥 TOGGLE */}
          <div className="flex bg-gray-100 rounded-xl p-1">

            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-xl font-semibold transition ${
                isLogin
                  ? "bg-purple-600 text-white"
                  : "text-gray-500"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-xl font-semibold transition ${
                !isLogin
                  ? "bg-purple-600 text-white"
                  : "text-gray-500"
              }`}
            >
              Sign Up
            </button>

          </div>

          {/* 🔥 TITLE */}
          <h1 className="text-3xl font-bold text-center text-purple-700">
            {isLogin
              ? "✈️ Destinayo Login"
              : "✨ Create Account"}
          </h1>

          {/* 🔥 SUBTITLE */}
          <p className="text-center text-gray-600 text-sm font-light tracking-wide">
            {isLogin
              ? "Login to continue your travel"
              : "Create your DestinaYo account"}
          </p>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          {!isLogin && (
        <>
          <Input
            type="text"
            placeholder="Full Name"
            className="text-black"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

              <Input
                type="text"
                placeholder="Phone Number"
                className="text-black"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <Input
                type="date"
                className="text-black"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </>
          )}

          {/* EMAIL */}
          <Input
            type="email"
            placeholder="Email"
            className="text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <Input
            type="password"
            placeholder="Password"
            className="text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* BUTTON */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {loading
              ? "Loading..."
              : isLogin
              ? "Login"
              : "Create Account"}
          </Button>

        </form>
      </div>
    </div>
  );
}