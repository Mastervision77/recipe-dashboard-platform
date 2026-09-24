
import { useState } from "react";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { Sidebar } from "../layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-dvh bg-background">
      <Sidebar
        open={mobileOpen}
        collapsed={collapsed}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onOpenMobile={() => setMobileOpen(true)}
          onToggleCollapse={() => setCollapsed((c) => !c)}
        />
        <main className="flex-1 py-6">
          <div className="container">

            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
