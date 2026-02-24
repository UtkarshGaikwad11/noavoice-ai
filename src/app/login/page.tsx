"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import { LogoutConfirm } from "@/components/logout-confirm"

export default function LoginPage() {

 const handleGoogleLogin = () => {
  window.location.href =
    `${process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL}/auth/google`;
};

  return (
    <div className="grid min-h-screen lg:grid-cols-2">

      {/* Left Section */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <div className="flex items-center gap-2 font-bold text-3xl">
            <div className="bg-purple-700 text-white flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            NoaVoice
          </div>
        </div>

        {/* Form Area */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm space-y-4">

            {/* Normal Login Form */}
            <LoginForm />

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              Continue with Google
            </button>

          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative hidden lg:block bg-muted">
        <img
          src="/login-illustration.svg"
          alt="Login Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}