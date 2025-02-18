"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { user, token } = useAuth();

  useEffect(() => {
    if (!user && user !== null) {
      router.push("/login");
    }
  }, [router]);

  console.log("hey username", user);
  return <div>{children}</div>;
};

export default DashboardLayout;
