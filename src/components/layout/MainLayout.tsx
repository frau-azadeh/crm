"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { X } from "lucide-react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 relative">
        <Sidebar />

        {isSidebarOpen && (
          <div className="absolute inset-0 bg-primary text-white z-50 md:hidden p-4">
            <Sidebar isMobile />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 left-4 text-white"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        )}

        <main className="flex-1 bg-background p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
