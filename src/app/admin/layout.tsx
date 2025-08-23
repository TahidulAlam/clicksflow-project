import DashboardLayout from "@/components/shared/dashboardLayout/DashboardLayout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout userType="admin">
      {children}
      {/* <div className="bg-white rounded-xl border border-gray-300">
      </div> */}
    </DashboardLayout>
  );
};

export default layout;
