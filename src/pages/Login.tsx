import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for UI feedback
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // useNavigate lets us redirect the user programmatically
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    // Prevent browser from refreshing the page on form submit
    e.preventDefault();

    // Clear any previous errors
    setError("");

    try {
      // Show loading state while waiting for API response
      setLoading(true);

      // Send login request to the backend
      const response = await api.post("/users/login", { email, password });

      // Save the token in localStorage so we stay logged in
      localStorage.setItem("token", response.data.access_token);

      // Redirect to dashboard on success
      navigate("/dashboard");
    } catch (error) {
      // Show error message instead of using alert()
      setError("Invalid email or password");
    } finally {
      // Always turn off loading when request is done
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
          Welcome Back
        </h2>

        {/* Error message — only shows when there's an error */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

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

          {/* Submit button — disabled and shows different text while loading */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Link to register page for new users */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline cursor-pointer font-medium"
          >
            Register here
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;