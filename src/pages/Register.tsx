import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  // State for UI feedback
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // useNavigate lets us redirect the user programmatically
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent the browser from refreshing the page on form submit
    e.preventDefault();

    // Clear any previous errors
    setError("");

    // Client-side validation before hitting the API
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Show loading state while waiting for API response
      setLoading(true);

      // Send registration request to the backend
      await api.post("/users/register", { 
        email, 
        password,
        first_name: firstName,
        middle_name: middleName || null,
        last_name: lastName, });

      // On success, redirect to login page
      navigate("/");
    } catch (err: any) {
      // Show error from backend (e.g. "Email already exists")
      // Falls back to a generic message if backend gives no detail
      setError(err.response?.data?.detail || "Registration failed");
    } finally {
      // Always turn off loading spinner when request is done
      setLoading(false);
    }
  };

  return (
    // Full screen centered layout
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      {/* Card container */}
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create an Account
        </h2>

        {/* Error message — only shows when there's an error */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* First name field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Middle name field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Middle Name (optional)
            </label>
            <input
              type="text"
              placeholder="A."
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Last name field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm password field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit button — disabled and shows different text while loading */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

        </form>
      </div>
    </div>
  );
}