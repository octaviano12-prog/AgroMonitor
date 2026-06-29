"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "./Dashboard";
import EquipmentPage from "./EquipmentPage";
import OperatorsPage from "./OperatorsPage";
import FarmsPage from "./FarmsPage";
import CSVUpload from "./CSVUpload";
import TimelinePage from "./TimelinePage";
import MapView from "./MapView";
import AIAssistant from "./AIAssistant";
import ReportsPage from "./ReportsPage";
import NotificationsPage from "./NotificationsPage";
import SettingsPage from "./SettingsPage";
import IndicatorsPage from "./IndicatorsPage";
import PlotsPage from "./PlotsPage";
import MaintenancePage from "./MaintenancePage";
import AlertsPage from "./AlertsPage";

export type PageId = "dashboard" | "equipment" | "operators" | "farms" | "plots" | "maintenance" | "alerts" | "indicators" | "csv" | "timeline" | "map" | "ai" | "reports" | "notifications" | "settings";

export default function AppShell() {
  const [page, setPage] = useState<PageId>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pages: Record<PageId, React.ReactNode> = {
    dashboard: <Dashboard />,
    equipment: <EquipmentPage />,
    operators: <OperatorsPage />,
    farms: <FarmsPage />,
    plots: <PlotsPage />,
    maintenance: <MaintenancePage />,
    alerts: <AlertsPage />,
    indicators: <IndicatorsPage />,
    csv: <CSVUpload />,
    timeline: <TimelinePage />,
    map: <MapView />,
    ai: <AIAssistant />,
    reports: <ReportsPage />,
    notifications: <NotificationsPage />,
    settings: <SettingsPage />,
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#08111d]">
      <Sidebar currentPage={page} onNavigate={setPage} open={sidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={setPage} />
        <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.08),transparent_34%),linear-gradient(180deg,#08111d,#050a12)] px-6 py-5 2xl:px-8 2xl:py-6">
          <div className="w-full max-w-[1760px] mx-auto">
            {pages[page]}
          </div>
        </main>
      </div>
    </div>
  );
}
