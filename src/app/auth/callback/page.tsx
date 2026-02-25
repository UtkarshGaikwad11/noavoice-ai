"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("access_token", token);

      // Remove token from URL for security
      window.history.replaceState({}, document.title, "/agents");

      router.push("/agents");
    } else {
      router.push("/login");
    }
  }, [router]);

  return <p>Logging you in...</p>;
}