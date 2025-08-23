import DashboardLayout from "@/components/shared/dashboardLayout/DashboardLayout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardLayout userType="advertiser">{children}</DashboardLayout>;
};

export default layout;
