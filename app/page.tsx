"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // Prefilled demo credentials
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password123");
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Create custom demo token
    const token = "demo-auth-token";

    // ✅ Save token in cookie
    document.cookie = `auth_token=${token}; path=/; ${
      remember ? "max-age=604800;" : ""
    }`; // 7 days if remember me

    // ✅ Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Login"
        />

        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-sm text-blue-500">
          Demo login (no API)
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md text-black focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md text-black focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Remember */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 "
                style={{ backgroundColor: "#155dfc" }}
              />
              <label className="ml-2 text-sm text-gray-900">
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{ backgroundColor: "#155dfc" }}
              className="w-full py-2 px-4 rounded-md text-white  hover:bg-blue-600 transition"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
