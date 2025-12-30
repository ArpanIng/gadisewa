import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#101a22] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-[#101a22] transition-colors duration-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
