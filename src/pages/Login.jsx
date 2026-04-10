import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  LogIn,
  User,
  Lock,
  Shield,
  Eye,
  EyeOff,
  ArrowRight,
  Building2,
  CheckCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import heroBg from "../assets/hero_city.png";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/login", form);
      const token = res.data.token;
      login(token);
      const decoded = JSON.parse(atob(token.split(".")[1]));
      if (decoded.role === "admin") {
        navigate("/all-reports");
      } else {
        navigate("/my-reports");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-indigo-900/80" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xl font-bold">UrbanVoice</span>
          </div>

          {/* Middle content */}
          <div>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Welcome back to <br />
              <span className="text-orange-400">UrbanVoice</span>
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-md">
              Sign in to track your civic reports, view resolutions, and continue making your city better.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-sm">
              {[
                { icon: Users, value: "45K+", label: "Citizens" },
                { icon: CheckCircle, value: "9.8K", label: "Resolved" },
                { icon: TrendingUp, value: "78%", label: "Rate" },
              ].map((s, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
                  <s.icon className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                  <p className="text-white font-bold text-lg">{s.value}</p>
                  <p className="text-slate-400 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-slate-500 text-sm">
            © 2025 UrbanVoice · Designed by Roshan, IIIT Ranchi
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900 text-xl font-bold">UrbanVoice</span>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-500">Access your civic dashboard</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-red-600" />
              </div>
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              {[
                { value: "user", label: "Citizen", icon: User },
                { value: "admin", label: "Admin", icon: Shield },
              ].map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setForm({ ...form, role: r.value })}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    form.role === r.value
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <r.icon className="w-4 h-4" />
                  {r.label}
                </button>
              ))}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-800 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-orange-500 hover:text-orange-600 font-semibold cursor-pointer"
              >
                Create Account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
