import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  MapPin,
  Building2,
  Shield,
  CheckCircle,
  Mail,
  FileText,
  Clock,
  TrendingUp,
  LogOut,
  ChevronRight,
  Settings,
  Star,
} from "lucide-react";

const UserProfile = () => {
  const { token, user: ctxUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.user);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile.");
      }
    };

    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/user/my-reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const reports = res.data.reports || [];
        setStats({
          total: reports.length,
          resolved: reports.filter((r) => r.status === "resolved").length,
          pending: reports.filter((r) => r.status === "pending").length,
        });
      } catch (err) {
        // Silent — stats are non-critical
      }
    };

    if (token) {
      fetchProfile();
      fetchStats();
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Profile</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );

  if (!profile)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading profile...</p>
        </div>
      </div>
    );

  const initials = profile.username
    ? profile.username.slice(0, 2).toUpperCase()
    : "UV";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header gradient */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-24">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider mb-1">
            Account
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Your Profile</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 pb-12">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          {/* Avatar row */}
          <div className="px-6 sm:px-8 pt-8 pb-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-orange-500/20">
                {initials}
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-[3px] border-white rounded-full" />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">{profile.username}</h2>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    profile.role === "admin"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {profile.role === "admin" ? (
                    <Shield className="w-3 h-3" />
                  ) : (
                    <User className="w-3 h-3" />
                  )}
                  {profile.role === "admin" ? "Municipal Admin" : "Citizen"}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="w-3.5 h-3.5" />
                  {profile.state || "India"}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 border border-red-200 transition-all font-medium text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Stats row */}
          <div className="border-t border-gray-100 px-6 sm:px-8 py-5 grid grid-cols-3 gap-4">
            {[
              { label: "Total Reports", value: stats.total, icon: FileText, color: "text-blue-500" },
              { label: "Resolved", value: stats.resolved, icon: CheckCircle, color: "text-emerald-500" },
              { label: "Pending", value: stats.pending, icon: Clock, color: "text-amber-500" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-1`} />
                <p className="text-2xl font-black text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { label: "Username", value: profile.username, icon: User },
            { label: "Email", value: profile.email || "—", icon: Mail },
            { label: "State", value: profile.state || "—", icon: MapPin },
            { label: "Area", value: profile.area || "—", icon: Building2 },
          ].map((field, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                <field.icon className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">{field.label}</p>
                <p className="text-base font-semibold text-gray-900">{field.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Badge */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="font-bold text-emerald-900">Account Verified</p>
            <p className="text-sm text-emerald-700">Your identity has been verified. You can submit and track civic reports.</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/report")}
            className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md hover:border-orange-300 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">Submit New Report</p>
              <p className="text-xs text-gray-500">Report a civic issue in your area</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
          </button>

          <button
            onClick={() => navigate("/my-reports")}
            className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md hover:border-blue-300 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">View My Reports</p>
              <p className="text-xs text-gray-500">Track all your submitted reports</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
