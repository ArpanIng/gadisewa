import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { type CustomerDetail } from "../../schemas/users.schema";
import { getGarageCustomerById } from "../../services/users.services";

export default function CustomerProfile() {
  type RouteParams = {
    customerId: string;
  };

  const { customerId } = useParams<RouteParams>();
  const [activeTab, setActiveTab] = useState("overview");
  const [customer, setCustomer] = useState<CustomerDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCustomer = async () => {
    try {
      const data = await getGarageCustomerById(Number(customerId));
      console.log(data);

      setCustomer(data);
    } catch (error) {
      console.error("Error fetching customer insntace:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <Link
          to="/customers"
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="text-2xl font-bold">Customer Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm flex flex-col items-center text-center">
            <img
              src="https://i.pravatar.cc/150?u=1"
              className="w-24 h-24 rounded-full mb-4 border-4 border-slate-100 dark:border-slate-700"
              alt="Profile"
            />
            <h2 className="text-xl font-bold">
              {customer?.first_name} {customer?.last_name}
            </h2>
            <p className="text-slate-500 text-sm">
              Customer ID: {customer?.id}
            </p>

            <div className="flex items-center gap-1 text-yellow-500 font-bold mt-2">
              <span className="material-symbols-outlined filled">star</span> 4.8
            </div>

            <div className="grid grid-cols-3 gap-2 w-full mt-6 border-t border-slate-200 dark:border-slate-700 pt-4">
              <div>
                <p className="text-xs text-slate-500">Jobs</p>
                <p className="font-bold text-lg">12</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Vehicles</p>
                <p className="font-bold text-lg">{customer?.vehicle_count}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Points</p>
                <p className="font-bold text-lg text-purple-600">450</p>
              </div>
            </div>

            <div className="w-full mt-6 space-y-3">
              <button className="w-full py-2 bg-primary-600 text-white rounded-lg font-bold text-sm hover:bg-primary-700">
                Create Job
              </button>
              <div className="flex gap-2">
                <button className="flex-1 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
                  Call
                </button>
                <button className="flex-1 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
            <h3 className="font-bold border-b border-slate-200 dark:border-slate-700 pb-2">
              Contact Details
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500 text-xs">Phone</p>
                <p>{customer?.phone_number}</p>
              </div>
              {customer?.email && (
                <div>
                  <p className="text-slate-500 text-xs">Email</p>
                  <p>{customer?.email}</p>
                </div>
              )}
              <div>
                <p className="text-slate-500 text-xs">Address</p>
                <p>{customer?.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
            {["overview", "vehicles", "history", "invoices", "notes"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium capitalize border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          <div className="p-6 flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-bold text-lg">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-sm">
                        build
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        Job Completed - Toyota Camry
                      </p>
                      <p className="text-xs text-slate-500">
                        Yesterday at 4:30 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-sm">
                        payment
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        Invoice Paid #INV-2024
                      </p>
                      <p className="text-xs text-slate-500">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vehicles" && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">Registered Vehicles</h3>
                  <button className="text-primary-600 text-sm font-medium hover:underline">
                    + Add Vehicle
                  </button>
                </div>
                {customer?.vehicles.length === 0 ? (
                  <div>No vehicles have been added yet.</div>
                ) : (
                  customer?.vehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex gap-4 items-center"
                    >
                      {vehicle.image && (
                        <img
                          src={vehicle.image}
                          className="w-20 h-20 object-cover rounded-lg"
                          alt={`${vehicle.make} ${vehicle.model}'s image`}
                        />
                      )}
                      <div>
                        <h4 className="font-bold">
                          {vehicle.make} {vehicle.model} {vehicle.year}
                        </h4>
                        <p className="text-sm text-slate-500">
                          {vehicle.registration_number}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="font-bold text-lg">Service History</h3>
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
                    <tr>
                      <th className="p-3 rounded-l-lg">Date</th>
                      <th className="p-3">Job ID</th>
                      <th className="p-3">Service</th>
                      <th className="p-3 rounded-r-lg text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    <tr>
                      <td className="p-3">24 Oct, 2024</td>
                      <td className="p-3 font-medium">JOB-12345</td>
                      <td className="p-3">Oil Change, General Service</td>
                      <td className="p-3 text-right">₹4,500</td>
                    </tr>
                    <tr>
                      <td className="p-3">15 Sep, 2024</td>
                      <td className="p-3 font-medium">JOB-11200</td>
                      <td className="p-3">Brake Pad Replacement</td>
                      <td className="p-3 text-right">₹2,800</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
