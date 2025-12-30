import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  employeeCreateSchema,
  type Employee,
  type EmployeeCreate,
} from "../../schemas/users.schema";
import {
  createGarageEmployee,
  deleteGarageEmployeeById,
  getGarageEmployees,
} from "../../services/users.services";
import ErrorMessage from "../../components/ErrorMessage";

export default function UserManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const employeeRoleChoices = [
    { value: "TECH", label: "Technician" },
    { value: "ADVISOR", label: "Service Advisor" },
    { value: "ADMIN", label: "Administrator" },
  ] as const;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeCreate>({
    resolver: zodResolver(employeeCreateSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("role", data.role);
      formData.append("password", data.password);
      formData.append("confirm_password", data.confirm_password);

      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }

      await createGarageEmployee(formData);
      await fetchEmployees();
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting garage employee:", error);
    }
  });

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
  };

  const fetchEmployees = async () => {
    try {
      const data = await getGarageEmployees();
      setEmployees(data.results);
    } catch (error) {
      console.error("Error fetching garage employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to deactivate this employee?"))
      return;

    try {
      await deleteGarageEmployeeById(id);
      // display toast
      await fetchEmployees();
    } catch (error) {
      console.error("Error deactiving employee:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-slate-500 text-sm">
            Manage admin access and permissions.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <span className="material-symbols-outlined">person_add</span>
          Add Admin User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Last Active</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {employee.avatar && (
                      <img
                        src={employee.avatar}
                        className="w-10 h-10 rounded-full bg-slate-200"
                        alt={`${employee.first_name} ${employee.last_name}'s profile`}
                      />
                    )}
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {employee.first_name} {employee.last_name}
                      </p>
                      <p className="text-xs text-slate-500">{employee.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                    {employee.role}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      employee.is_active
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {employee.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-4 text-slate-500">
                  {employee.last_login ? employee.last_login : "No data"}
                </td>
                <td className="p-4 text-right">
                  <button className="text-slate-400 hover:text-blue-600 p-1 mr-2">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  {employee.is_active && (
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <span className="material-symbols-outlined">block</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 md:p-6">
          <div className="bg-white dark:bg-[#1e293b] w-full max-w-md md:max-w-lg lg:max-w-xl rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700">
            {/* Header */}
            <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-lg font-bold">Add New User</h3>
              <button onClick={handleCloseModal}>
                <span className="material-symbols-outlined text-slate-400">
                  close
                </span>
              </button>
            </div>
            <form onSubmit={onSubmit} className="p-6 space-y-4" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block mb-2 text-sm font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    {...register("first_name")}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage error={errors.first_name} />
                </div>
                <div className="space-y-1">
                  <label className="block mb-2 text-sm font-medium">
                    Last Name
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
                  <label className="block mb-2 text-sm font-medium">
                    Username
                  </label>
                  <input
                    type="text"
                    {...register("username")}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage error={errors.username} />
                </div>
                <div className="space-y-1">
                  <label className="block mb-2 text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage error={errors.email} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Avatar</label>
                <input
                  type="file"
                  {...register("avatar")}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <ErrorMessage error={errors.avatar} />

              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  {...register("role")}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {employeeRoleChoices.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ErrorMessage error={errors.role} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block mb-2 text-sm font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage error={errors.password} />
                </div>
                <div className="space-y-1">
                  <label className="block mb-2 text-sm font-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    {...register("confirm_password")}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage error={errors.confirm_password} />
                </div>
              </div>

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
