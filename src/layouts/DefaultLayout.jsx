import { useState } from "react";
import Sidebar from "@partials/Sidebar";
import Toppbar from "@partials/Topbar";

export default function DefaultLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Toppbar onToggleNav={() => setSidebarOpen((v) => !v)} />
            <Sidebar open={sidebarOpen} onToggleNav={() => setSidebarOpen((v) => !v)} />
            {children}
        </>
    )
}