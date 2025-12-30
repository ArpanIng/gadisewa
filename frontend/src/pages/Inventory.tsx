import { useEffect, useState } from "react";
import {
  type Category,
  type Part,
  type Supplier,
} from "../schemas/inventory.schema";
import { getGaragesInventoryPart } from "../services/inventory.service";
import {
  getGarageCategories,
  getGarageSuppliers,
} from "../services/garages.services";

export default function Inventory() {
  const [inventoryItems, setInventoryItems] = useState<Part[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInventoryItems = async () => {
    try {
      const data = await getGaragesInventoryPart();
      setInventoryItems(data.results);
    } catch (error) {
      console.error("Error fetching garage inventory items:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getGarageCategories();
      setCategories(data.results);
    } catch (error) {
      console.error("Error fetching garage categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const data = await getGarageSuppliers();
      setSuppliers(data.results);
    } catch (error) {
      console.error("Error fetching garage suppliers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryItems();
    fetchCategories();
    fetchSuppliers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Inventory Dashboard</h1>
          <p className="text-slate-500 text-sm">
            Overview of your garage's inventory.
          </p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Add New Product
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Total Value
          </p>
          <p className="text-2xl font-bold mt-1">₹12,50,450</p>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Low Stock
              </p>
              <p className="text-2xl font-bold mt-1">15</p>
            </div>
            <span className="material-symbols-outlined text-yellow-500">
              warning
            </span>
          </div>
          <button className="text-xs text-blue-500 font-medium mt-2 hover:underline">
            View Items
          </button>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Out of Stock
              </p>
              <p className="text-2xl font-bold mt-1 text-red-500">8</p>
            </div>
          </div>
          <button className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded mt-2 font-medium">
            Reorder Now
          </button>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Pending Orders
              </p>
              <p className="text-2xl font-bold mt-1">5</p>
            </div>
          </div>
          <button className="text-xs text-blue-500 font-medium mt-2 hover:underline">
            Quick View
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search part name, SKU, brand..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Suppliers</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">
                  Part
                </th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">
                  SKU
                </th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">
                  Category
                </th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-400 text-center">
                  Stock
                </th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">
                  Price (Buy/Sell)
                </th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">
                  Supplier
                </th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {inventoryItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={`${item.name} image`}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100"
                        />
                      )}
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-500">{item.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-xs text-slate-500">
                    {item.sku}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">
                    {item.category.name}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.in_stock
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : item.in_low_stock
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {item.in_stock
                        ? "In Stock"
                        : item.in_low_stock
                        ? "Low Stock"
                        : "Out of Stock"}{" "}
                      ({item.quantity})
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-xs">
                      <p className="text-slate-500">
                        Buy: ₹{item.purchase_price}
                      </p>
                      <p className="font-bold text-slate-900 dark:text-white">
                        Sell: ₹{item.selling_price}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">
                    {item.supplier.name}
                  </td>
                  <td className="p-4">
                    <button className="text-slate-400 hover:text-blue-500">
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
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold">1-4</span> of 1000
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-sm">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-sm">
              2
            </button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
