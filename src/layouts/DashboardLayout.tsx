import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import SideBar from "../components/shared/Sidebar";
import RouteArray from "../constant/routeObject";
import Footer from "@/components/shared/Footer";

export default function DashboardLayout() {
   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

   return (
      <main className="flex min-h-screen bg-background text-foreground">
        <SideBar
          routeArray={RouteArray}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((current) => !current)}
        />
        <section className="min-w-0 flex-1 bg-background transition-all duration-300 flex flex-col h-screen overflow-hidden">
            <Navbar />
            <div className="flex-1 overflow-y-auto">
               <Outlet />
            </div>
            <Footer />
         </section>
      </main>
   );
}
