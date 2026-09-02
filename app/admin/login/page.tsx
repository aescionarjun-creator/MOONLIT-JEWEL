"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck, ArrowRight, KeyRound } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@moonlitjewel.com");
  const [password, setPassword] = useState("Admin@123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Authenticate via client or API
      if (email === "admin@moonlitjewel.com" && password === "Admin@123456") {
        localStorage.setItem("moonlit_admin_logged_in", "true");
        localStorage.setItem("moonlit_admin_email", email);
        document.cookie = "moonlit_token=admin-logged-in; path=/; max-age=604800";
        router.push("/admin");
        return;
      }

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("moonlit_admin_logged_in", "true");
      localStorage.setItem("moonlit_admin_email", data.user.email);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleAutofill = () => {
    setEmail("admin@moonlitjewel.com");
    setPassword("Admin@123456");
    setError("");
  };

  return (
    <div className="min-h-screen bg-charcoal flex flex-col justify-center items-center p-4 font-sans text-ivory">
      <div className="w-full max-w-md bg-charcoal-light border border-champagne/40 p-8 rounded-xs shadow-2xl space-y-6 relative overflow-hidden">
        {/* Top Gold Accent Border */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-champagne via-gold-soft to-champagne" />

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3 pb-4 border-b border-charcoal">
          <Logo variant="dark" size="lg" />
          <div className="inline-flex items-center gap-1.5 bg-champagne/10 text-champagne text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald" /> Admin Portal Portal Access
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-burgundy/20 border border-burgundy text-red-200 text-xs rounded-xs text-center font-sans">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-taupe uppercase tracking-widest font-semibold mb-1">
              Admin Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-taupe absolute left-3 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@moonlitjewel.com"
                required
                className="w-full bg-charcoal border border-champagne/30 pl-10 p-3 rounded-xs text-ivory placeholder:text-taupe/60 focus:outline-none focus:border-champagne"
              />
            </div>
          </div>

          <div>
            <label className="block text-taupe uppercase tracking-widest font-semibold mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-taupe absolute left-3 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-charcoal border border-champagne/30 pl-10 p-3 rounded-xs text-ivory placeholder:text-taupe/60 focus:outline-none focus:border-champagne font-mono"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Sign In to Admin Portal"} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        {/* Auto-fill Helper Box */}
        <div className="p-4 bg-charcoal border border-champagne/20 rounded-xs space-y-2 text-center text-xs">
          <span className="text-taupe text-[11px] block font-light">Default Super Admin Credentials</span>
          <div className="font-mono text-champagne text-[11px] font-semibold">
            admin@moonlitjewel.com • Admin@123456
          </div>
          <button
            type="button"
            onClick={handleAutofill}
            className="inline-flex items-center text-[10px] text-emerald hover:underline uppercase tracking-widest pt-1 font-semibold"
          >
            <KeyRound className="w-3 h-3 mr-1" /> Click to Auto-fill Demo Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
