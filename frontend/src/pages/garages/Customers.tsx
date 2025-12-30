import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
  customerCreateSchema,
  type Customer,
  type CustomerCreate,
} from "../../schemas/users.schema";
import {
  createGarageCustomer,
  getGarageCustomers,
} from "../../services/users.services";
import ErrorMessage from "../../components/ErrorMessage";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getGarageCustomers();
      setCustomers(data.results);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CustomerCreate>({
    resolver: zodResolver(customerCreateSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("phone_number", data.phone_number);
      formData.append("email", data.email);
      formData.append("address", data.role);

      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }

      await createGarageCustomer(formData);
      await fetchCustomers();
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting appointments:", error);
      if (axios.isAxiosError(error)) {
        const errors = error.response?.data;
        Object.entries(errors).forEach(([field, message]) => {
          setError(field as keyof typeof data, {
            type: "server",
            message: Array.isArray(message) ? message.join("") : message,
          });
        });
      }
    }
  });

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Customers</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add New Customer
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex gap-4">
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input
            type="text"
            placeholder="Search by name, phone, vehicle..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">
              filter_list
            </span>
          </button>
          <button className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">
              download
            </span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Contact</th>
              <th className="p-4 text-center">Vehicles</th>
              <th className="p-4 text-center">Total Jobs</th>
              <th className="p-4">Last Visit</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {customer.avatar && (
                      <img
                        src={customer.avatar}
                        alt={`${customer.first_name} ${customer.last_name}'s Profile`}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <div>
                      <Link
                        to={`/customers/${customer.id}`}
                        className="font-bold text-slate-900 dark:text-white hover:underline cursor-pointer"
                      >
                        {customer.first_name} {customer.last_name}
                      </Link>
                      {customer.email && (
                        <p className="text-xs text-slate-500">
                          {customer.email}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-300">
                  {customer.phone_number}
                </td>
                <td className="p-4 text-center">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
                    {customer.vehicle_count}
                  </span>
                </td>
                <td className="p-4 text-center font-bold">{customer.jobs}</td>
                <td className="p-4 text-slate-600 dark:text-slate-300">
                  {customer.lastVisit}
                </td>
                <td className="p-4 text-right">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 md:p-6">
          <div className="bg-white dark:bg-[#1e293b] w-full max-w-md md:max-w-lg lg:max-w-xl rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700">
            {/* Header */}
            <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-base md:text-lg font-bold">
                Add New customer
              </h3>
              <button onClick={handleCloseModal}>
                <span className="material-symbols-outlined text-slate-400">
                  close
                </span>
              </button>
            </div>

            <form
              onSubmit={onSubmit}
              className="p-5 md:p-6 space-y-4"
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    First name
                  </label>
                  <input
                    type="text"
                    {...register("first_name")}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage error={errors.first_name} />
                </div>

                <div className="space-y-1">
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Last name
                  </label>
                  <input
                    type="text"
                    {...register("last_name")}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage error={errors.last_name} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Phone number
                  </label>
                  <input
                    type="text"
                    {...register("phone_number")}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage error={errors.phone_number} />
                </div>

                <div className="space-y-1">
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage error={errors.email} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Address
                </label>
                <input
                  type="text"
                  {...register("address")}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage error={errors.address} />
              </div>
              <div className="space-y-1">
                <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Profile image
                </label>
                <input
                  type="file"
                  {...register("avatar")}
                  accept="image/*"
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage error={errors.avatar} />
              </div>

              {/* Actions */}
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                >
                  {isSubmitting ? "Loading..." : "Send Invitation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
