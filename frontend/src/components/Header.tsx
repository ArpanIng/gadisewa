import { createContext, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const ThemeContext = createContext({ isDark: false, toggleTheme: () => {} });
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const location = useLocation();
  const path = location.pathname;

  const isVendor = path.startsWith("/vendor");

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#16222d] flex items-center justify-between px-6 flex-shrink-0 transition-colors duration-200">
      <h2 className="text-xl font-bold capitalize">
        {path === "/"
          ? "Dashboard"
          : path.startsWith("/admin")
          ? "Administration"
          : path === "/cash-flow" || path === "/vendor/cash-flow"
          ? "Cash Flow & Budget"
          : path === "/vendor"
          ? "Vendor Dashboard"
          : path.split("/").pop()?.replace("-", " ")}
      </h2>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
            search
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none w-64 transition-colors"
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
          title="Toggle Theme"
        >
          <span className="material-symbols-outlined">
            {isDark ? "light_mode" : "dark_mode"}
          </span>
        </button>

        <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        <Link
          to="/profile"
          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold border cursor-pointer hover:opacity-80 transition-opacity ${
            isVendor
              ? "bg-purple-100 text-purple-600 border-purple-200"
              : "bg-indigo-100 text-indigo-600 border-indigo-200"
          }`}
        >
          {isVendor ? "VP" : "JD"}
        </Link>
      </div>
    </header>
  );
};

export default Header;
