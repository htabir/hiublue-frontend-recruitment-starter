import DashboardLayout from "@/sections/dashboard/views/dashboard-layout";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
