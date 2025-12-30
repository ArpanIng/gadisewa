import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  appointmentCreateSchema,
  type Appointment,
  type AppointmentCreate,
} from "../../schemas/appointments.schema";
import {
  createGarageAppointment,
  getGarageAppointments,
  getGarageServices,
  getGarageVehicles,
} from "../../services/garages.services";
import { type Service, type Vehicle } from "../../schemas/garages.schema";
import {
  getGarageCustomers,
  getGarageEmployees,
} from "../../services/users.services";
import type { Customer, Employee } from "../../schemas/users.schema";
import ErrorMessage from "../../components/ErrorMessage";

export default function Appointments() {
  const [view, setView] = useState("list"); // 'list' or 'calendar'
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [mechanics, setMechanics] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const appointmentStatusChoices = [
    { value: "scheduled", label: "Scheduled" },
    { value: "in_progress", label: "In Progress" },
    { value: "confirmed", label: "Confirmed" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ] as const;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentCreate>({
    resolver: zodResolver(appointmentCreateSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createGarageAppointment(data);
      await fetchAppointments();
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting appointments:", error);
    }
  });

  const fetchAppointments = async () => {
    try {
      const data = await getGarageAppointments();
      setAppointments(data.results);
    } catch (error) {
      console.error("Error fetching garage appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGarageCustomers = async () => {
    try {
      const data = await getGarageCustomers();
      setCustomers(data.results);
    } catch (error) {
      console.error("Error fetching garage customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGarageVehicles = async () => {
    try {
      const data = await getGarageVehicles();
      setVehicles(data.results);
    } catch (error) {
      console.error("Error fetching garage vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGarageServices = async () => {
    try {
      const data = await getGarageServices();
      setServices(data.results);
    } catch (error) {
      console.error("Error fetching garage services:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGarageMechanics = async () => {
    try {
      const data = await getGarageEmployees({ role: "TECH" });
      setMechanics(data.results);
    } catch (error) {
      console.error("Error fetching garage mechanics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
  };

  useEffect(() => {
    fetchAppointments();
    fetchGarageVehicles();
    fetchGarageCustomers();
    fetchGarageServices();
    fetchGarageMechanics();
  }, []);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-slate-500 text-sm">
            Manage bookings and schedule.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white dark:bg-[#1e293b] p-1 rounded-lg border border-slate-200 dark:border-slate-700 flex">
            <button
              onClick={() => setView("calendar")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                view === "calendar"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                view === "list"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              List
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span> New Booking
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map(
          (status) => (
            <button
              key={status}
              className="px-4 py-1.5 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-full text-sm hover:border-blue-500 transition-colors whitespace-nowrap"
            >
              {status}
            </button>
          )
        )}
      </div>

      {view === "list" ? (
        <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex-1">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-4">Time</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Vehicle</th>
                <th className="p-4">Service Type</th>
                <th className="p-4">Mechanic</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="p-4 font-medium">
                    {appointment.appointment_date}
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    {appointment.customer.first_name}{" "}
                    {appointment.customer.last_name}
                  </td>
                  <td className="p-4 text-slate-500">
                    {appointment.vehicle.make}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300 rounded text-xs font-semibold">
                      {appointment.service.name}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">
                    {appointment.mechanic ? (
                      <>
                        {appointment.mechanic.first_name}{" "}
                        {appointment.mechanic.last_name}
                      </>
                    ) : (
                      "No mechanic assigned"
                    )}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        appointment.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : appointment.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : appointment.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                      <span className="material-symbols-outlined">
                        more_vert
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex-1 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 p-4 overflow-auto">
          <div className="grid grid-cols-8 gap-px bg-slate-200 dark:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            {/* Header Row */}
            <div className="bg-slate-50 dark:bg-slate-800 p-2 text-center text-xs font-bold text-slate-500">
              Time
            </div>
            {[
              "Mon 21",
              "Tue 22",
              "Wed 23",
              "Thu 24",
              "Fri 25",
              "Sat 26",
              "Sun 27",
            ].map((day) => (
              <div
                key={day}
                className={`bg-slate-50 dark:bg-slate-800 p-2 text-center text-sm font-bold ${
                  day.includes("24")
                    ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                    : ""
                }`}
              >
                {day}
              </div>
            ))}

            {/* Time Slots */}
            {[
              "09:00",
              "10:00",
              "11:00",
              "12:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00",
              "17:00",
            ].map((time) => (
              <React.Fragment key={time}>
                <div className="bg-white dark:bg-[#1e293b] p-2 text-xs text-slate-400 text-center border-t border-slate-100 dark:border-slate-800 h-24">
                  {time}
                </div>
                {[0, 1, 2, 3, 4, 5, 6].map((d) => (
                  <div
                    key={d}
                    className="bg-white dark:bg-[#1e293b] border-t border-l border-slate-100 dark:border-slate-800 h-24 relative p-1"
                  >
                    {/* Mock Events */}
                    {time === "09:00" && d === 1 && (
                      <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 p-1.5 rounded text-xs font-medium h-full border-l-2 border-blue-500 cursor-pointer hover:opacity-80">
                        Full Service - Toyota
                      </div>
                    )}
                    {time === "11:00" && d === 3 && (
                      <div className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 p-1.5 rounded text-xs font-medium h-full border-l-2 border-green-500 cursor-pointer hover:opacity-80">
                        Oil Change - Honda
                      </div>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 md:p-6">
          <div className="bg-white dark:bg-[#1e293b] w-full max-w-md md:max-w-lg lg:max-w-xl rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700">
            {/* Header */}
            <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-base md:text-lg font-bold">
                Add New Appointment
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
                    Select customer
                  </label>
                  <select
                    {...register("customer_id", { valueAsNumber: true })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.first_name} {customer.last_name}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage error={errors.customer_id} />
                </div>

                <div className="space-y-1">
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Select vehicle
                  </label>
                  <select
                    {...register("vehicle_id", { valueAsNumber: true })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.make} {vehicle.model} {vehicle.year}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage error={errors.vehicle_id} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Select service
                  </label>
                  <select
                    {...register("service_id", { valueAsNumber: true })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage error={errors.service_id} />
                </div>

                <div className="space-y-1">
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Select mechanic
                  </label>
                  <select
                    {...register("mechanic_id", { valueAsNumber: true })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {mechanics.map((mechanic) => (
                      <option key={mechanic.id} value={mechanic.id}>
                        {mechanic.first_name} {mechanic.last_name} (
                        {mechanic.email})
                      </option>
                    ))}
                  </select>
                  <ErrorMessage error={errors.mechanic_id} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Appointment date
                  </label>
                  <input
                    type="datetime-local"
                    {...register("appointment_date")}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage error={errors.appointment_date} />
                </div>

                <div className="space-y-1">
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {appointmentStatusChoices.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage error={errors.status} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Notes
                </label>
                <textarea
                  {...register("notes")}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your notes here..."
                  rows={4}
                ></textarea>
                <ErrorMessage error={errors.notes} />
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
