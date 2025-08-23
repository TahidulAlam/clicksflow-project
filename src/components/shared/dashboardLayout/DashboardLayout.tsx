"use client";
import React, { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";

type UserType = "admin" | "partner" | "advertiser";

interface DashboardLayoutProps {
  userType: UserType;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  userType,
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <div className="flex h-screen bg-[#E5EFFA] overflow-hidden">
      <aside
        className={`z-[100] lg:m-5 m-0 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-[120%]"
        } fixed lg:static`}
      >
        <Sidebar
          userType={userType}
          isMobileOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          onMobileLinkClick={() => setIsSidebarOpen(false)}
        />
      </aside>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#0000002d] bg-opacity-30 z-[99] lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <main className="flex-1 overflow-y-auto bg-[#E5EFFA] lg:pr-5 lg:m-0 mx-2">
        <div className="sticky lg:top-5 top-2 right-2 z-50">
          <Navbar toggleSidebar={toggleSidebar} />
        </div>

        <div className="lg:pt-5 lg:mt-5 mt-4">{children}</div>
      </main>
    </div>
  );
};
export default DashboardLayout;
