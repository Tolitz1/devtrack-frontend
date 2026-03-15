import { useState } from "react";
import api from "../api/axios";
import { useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

type Office = {
  id: number;
  office_name: string;
  office_code: string;
  created_at: string;
  updated_at: string;
};

function OfficeManagement() {
  const [officeName, setOfficeName] = useState("");
  const [officeCode, setOfficeCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [offices, setOffices] = useState<Office[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    const fetchOffices = async () => {
      const response = await api.get("/offices/");
      setOffices(response.data);
    };
    fetchOffices();
  }, []);
  const columns: ColumnDef<Office>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "office_name", header: "Office Name" },
    { accessorKey: "office_code", header: "Office Code" },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
    },
    { accessorKey: "actions", header: "Actions", cell: () => <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 cursor-pointer">Edit</button> }
  ];

  const table = useReactTable({
    data: offices,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  });

  const handleSubmit = async () => {
    // Frontend validation
    if (!officeName.trim() || !officeCode.trim()) {
      setError("Office name and code cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const response = await api.post("/offices/", {
        office_name: officeName,
        office_code: officeCode,
      });
      if (response.status === 201) {
        setSuccess(`Office "${response.data.office_name}" with code "${response.data.office_code}" created successfully!`);
        setOfficeName("");
        setOfficeCode("");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to create office");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6class">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-md p-8 items-center mx-auto">
          {error && (
            <div className="bg-red-100 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-600 text-sm px-4 py-2 rounded-lg mb-4">
              {success}
            </div>
          )}
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Office Management</h1>
            <p className="text-sm text-gray-500 mt-1">Register a new office to the system</p>
          </div>

          {/* Form */}
          <div className="space-y-5">

            {/* Office Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Office Name
              </label>
              <input
                value={officeName}
                onChange={(e) => setOfficeName(e.target.value)}
                name="office_name"
                placeholder="e.g. Head Office"
                maxLength={100}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Office Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Office Code
              </label>
              <input
                value={officeCode}
                onChange={(e) => setOfficeCode(e.target.value)}
                name="office_code"
                placeholder="e.g. HO-001"
                maxLength={20}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            {/* Submit Button */}
            <button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-lg transition">
              {loading ? "Creating Office..." : "Register Office"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-8 w-full mt-6">
          <div className="p-4">
            {/* Search */}
            <input
              type="text"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search offices..."
              className="border px-4 py-2 rounded-lg mb-4 w-full"
            />
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="bg-gray-100">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                        >
                          <div className="flex items-center gap-1">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getIsSorted() === "asc" ? " 🔼"
                              : header.column.getIsSorted() === "desc" ? " 🔽"
                                : " ↕️"}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="text-sm text-gray-700 px-4 py-2 border-b"
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>

  );
}

export default OfficeManagement;