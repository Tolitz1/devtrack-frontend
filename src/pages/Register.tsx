import { useState } from "react";
import api from "../api/axios";
import { useEffect } from "react";
import { Listbox, } from "@headlessui/react";

export default function Register() {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [position, setPosition] = useState("");
  // State for UI feedback
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // dropdown
  // selectedValue should match the type of options (object or null)
  const [selectedValue, setSelectedValue] = useState<{ value: string; label: string } | null>(null);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await api.get("/offices/");
        const officeOptions = response.data.map((office: { office_code: string; office_name: string }) => ({
          value: office.office_code,
          label: office.office_name,
        }));
        setOptions(officeOptions);
      } catch (err) {
        console.error("Failed to fetch offices:", err);
      }
    };
    fetchOffices();
  }, []);


  // useNavigate lets us redirect the user programmatically

  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent the browser from refreshing the page on form submit
    e.preventDefault();

    // Clear any previous errors
    setError("");
    setSuccess("");

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
        last_name: lastName,
        position,
        office: selectedValue?.value,
      });

    } catch (err: any) {
      if (!selectedValue) {
        setError("Please select an office");
        return;
      }
      
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
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl mx-auto">

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
        {success && (
          <div className="bg-green-100 text-green-600 text-sm px-4 py-2 rounded-lg mb-4">
            {success}
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
          <div className="flex space-x-4">

            <div className="flex-1">
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
            <div className="flex-1">
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
            <div className="flex-1">
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

          {/* Position */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position
          </label>
          <input
            type="text"
            placeholder="e.g., Software Engineer"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* office dropdown */}
          <div>
            <Listbox value={selectedValue} onChange={setSelectedValue}>
              <div className="relative">
                <Listbox.Button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {selectedValue ? selectedValue.label : "-- Select an office --"}
                </Listbox.Button>

                <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option}
                      className={({ active, selected }) =>
                        `cursor-pointer px-4 py-2 ${active ? "bg-blue-100" : ""
                        } ${selected ? "font-semibold" : "font-normal"}`
                      }
                    >
                      {({ selected }) => (
                        <>
                          {option.label}
                          {selected && <span className="text-blue-600 ml-2">✔</span>}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
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