import { Link, useLocation } from "react-router-dom";
const SidebarItem = ({
  icon,
  label,
  path,
  active,
}: {
  icon: string;
  label: string;
  path: string;
  active: boolean;
}) => (
  <Link
    to={path}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
      active
        ? "bg-blue-500/10 text-blue-600 font-semibold"
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
    }`}
  >
    <span className={`material-symbols-outlined ${active ? "filled" : ""}`}>
      {icon}
    </span>
    <span className="text-sm">{label}</span>
  </Link>
);
export const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const isVendor = path.startsWith("/vendor");

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#16222d] flex flex-col transition-colors duration-200">
      <div className="p-4 flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl ${
            isVendor ? "bg-purple-600" : "bg-blue-500"
          }`}
        >
          {isVendor ? "V" : "G"}
        </div>
        <div>
          <h1 className="font-bold text-base">GadiSewa</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isVendor ? "Vendor Portal" : "Main Garage"}
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {isVendor ? (
          <>
            <SidebarItem
              icon="dashboard"
              label="Dashboard"
              path="/vendor"
              active={path === "/vendor"}
            />
            <SidebarItem
              icon="point_of_sale"
              label="Vendor POS"
              path="/vendor/pos"
              active={false}
            />
            <SidebarItem
              icon="inventory_2"
              label="Product Catalog"
              path="/vendor/products"
              active={path.startsWith("/vendor/products")}
            />
            <SidebarItem
              icon="shopping_cart"
              label="Orders"
              path="/vendor/orders"
              active={path.startsWith("/vendor/orders")}
            />
            <SidebarItem
              icon="store"
              label="Garage Network"
              path="/vendor/network"
              active={path.startsWith("/vendor/network")}
            />
            <SidebarItem
              icon="account_balance_wallet"
              label="Cash Flow & Budget"
              path="/vendor/cash-flow"
              active={path === "/vendor/cash-flow"}
            />
            <SidebarItem
              icon="payments"
              label="Financials"
              path="/vendor/financials"
              active={path === "/vendor/financials"}
            />
            <SidebarItem
              icon="campaign"
              label="Marketing"
              path="/vendor/marketing"
              active={path === "/vendor/marketing"}
            />
          </>
        ) : (
          <>
            <SidebarItem
              icon="dashboard"
              label="Dashboard"
              path="/"
              active={path === "/"}
            />

            <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Operations
            </div>
            <SidebarItem
              icon="calendar_month"
              label="Job Board"
              path="/jobs"
              active={
                path === "/jobs" ||
                path === "/jobs/new" ||
                path === "/jobs/list"
              }
            />
            <SidebarItem
              icon="schedule"
              label="Appointments"
              path="/appointments"
              active={path === "/appointments"}
            />
            <SidebarItem
              icon="point_of_sale"
              label="POS"
              path="/pos"
              active={false}
            />

            <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
              Management
            </div>
            <SidebarItem
              icon="inventory_2"
              label="Inventory"
              path="/inventory"
              active={path === "/inventory"}
            />
            <SidebarItem
              icon="group"
              label="Customers"
              path="/customers"
              active={path.startsWith("/customers")}
            />
            <SidebarItem
              icon="badge"
              label="Staff & HR"
              path="/staff"
              active={path === "/staff"}
            />

            <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
              Finance & Growth
            </div>
            <SidebarItem
              icon="account_balance_wallet"
              label="Cash Flow & Budget"
              path="/cash-flow"
              active={path === "/cash-flow"}
            />
            <SidebarItem
              icon="attach_money"
              label="Income"
              path="/financials"
              active={path === "/financials"}
            />
            <SidebarItem
              icon="money_off"
              label="Expenses"
              path="/expenses"
              active={path === "/expenses"}
            />
            <SidebarItem
              icon="receipt"
              label="Invoices"
              path="/invoices"
              active={path === "/invoices"}
            />
            <SidebarItem
              icon="campaign"
              label="Marketing"
              path="/marketing"
              active={path === "/marketing"}
            />
            <SidebarItem
              icon="bar_chart"
              label="Reports"
              path="/reports"
              active={path === "/reports"}
            />

            <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
              System
            </div>
            <SidebarItem
              icon="admin_panel_settings"
              label="User Mgmt"
              path="/admin/users"
              active={path === "/admin/users"}
            />
            <SidebarItem
              icon="history"
              label="Logs"
              path="/admin/logs"
              active={path === "/admin/logs"}
            />
          </>
        )}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        {!isVendor && (
          <Link
            to="/jobs/new"
            className="flex w-full items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium text-sm transition-colors mb-4"
          >
            <span className="material-symbols-outlined text-lg mr-2">add</span>
            Create Job
          </Link>
        )}
        {isVendor && (
          <Link
            to="/vendor/products/new"
            className="flex w-full items-center justify-center bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium text-sm transition-colors mb-4"
          >
            <span className="material-symbols-outlined text-lg mr-2">add</span>
            Add Product
          </Link>
        )}
        <div className="space-y-1">
          <SidebarItem
            icon="credit_card"
            label="Subscription"
            path="/subscription"
            active={path === "/subscription"}
          />
          <SidebarItem
            icon="help"
            label="Help & Support"
            path="/help"
            active={path === "/help"}
          />
          <SidebarItem
            icon="settings"
            label="Settings"
            path={isVendor ? "/vendor/settings" : "/settings"}
            active={path.includes("/settings")}
          />
          <Link
            to={isVendor ? "/" : "/vendor"}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <span className="material-symbols-outlined">swap_horiz</span>
            <span className="text-sm">
              Switch to {isVendor ? "Garage" : "Vendor"}
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
