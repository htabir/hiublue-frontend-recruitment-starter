"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !token)) {
      router.replace("/login"); // Use `replace` to prevent back button access
    }
  }, [user, token, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Display a loader while checking authentication
  }

  if (!user || !token) {
    return null; // Prevents flickering before redirection
  }

  return <>{children}</>;
};

export default PrivateRoute;
