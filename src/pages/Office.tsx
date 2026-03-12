import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function OfficeManagement() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-md p-8">

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
              name="office_code"
              placeholder="e.g. HO-001"
              maxLength={20}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Submit Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-lg transition">
            Create Office
          </button>

        </div>
      </div>
    </div>
  );
}

export default OfficeManagement;