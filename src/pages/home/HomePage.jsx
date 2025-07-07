
import { useState } from "react";
import NewsCarousel from "../../components/NewsCarousel";
import WorkshopCarousel from "../../components/WorkshopCarousel";
import Sidebar from "../../partials/Sidebar";
import Toppbar from "../../partials/Topbar";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  

  return (
    <>
      <Toppbar onToggleNav={() => setSidebarOpen((v) => !v)} />
      <Sidebar open={sidebarOpen} onToggleNav={() => setSidebarOpen((v) => !v)} />
      <section>
        <NewsCarousel />
      </section>
      <section className="pt-20">
        <h2 className="text-center font-bold text-2xl">ATELIERS</h2>
        <WorkshopCarousel />
      </section>
    </>
  );
}

