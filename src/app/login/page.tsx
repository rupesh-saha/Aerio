"use client";

import { AuthLayout } from "@/components/AuthLayout";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message || "Invalid email or password.");
      setLoading(false);
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const callbackURL = searchParams.get("callbackURL");
    router.push(callbackURL || "/");
    router.refresh();
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-3 mb-12">
        <h2 className="text-4xl font-medium text-brand-graphite tracking-tight">Welcome back</h2>
        <p className="text-brand-graphite/60 font-light text-lg">Please enter your details to sign in.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">
            {error}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-brand-graphite">Email address</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            required
            className="px-5 py-4 rounded-xl bg-white border border-black/10 outline-none focus:ring-2 focus:ring-brand-teal/50 transition-all shadow-sm text-brand-graphite placeholder:text-black/30" 
            placeholder="hello@example.com" 
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-brand-graphite">Password</label>
            <Link href="#" className="text-sm text-brand-teal hover:underline font-medium">Forgot password?</Link>
          </div>
          <input 
            type="password" 
            id="password" 
            name="password"
            required
            className="px-5 py-4 rounded-xl bg-white border border-black/10 outline-none focus:ring-2 focus:ring-brand-teal/50 transition-all shadow-sm text-brand-graphite placeholder:text-black/30" 
            placeholder="••••••••" 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="mt-6 w-full py-4 bg-brand-graphite text-white rounded-xl font-medium hover:bg-black transition-colors shadow-md text-lg disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="mt-10 text-center text-brand-graphite/60">
        Don't have an account? <Link href="/signup" className="text-brand-teal font-medium hover:underline">Sign up for free</Link>
      </div>
    </AuthLayout>
  );
}
