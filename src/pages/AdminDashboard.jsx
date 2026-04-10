import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Shield,
  Activity,
  ListOrdered,
  ClipboardEdit,
  ChevronRight,
  Loader2,
  Server,
  Database,
  Wifi,
} from "lucide-react";

const AdminDashboard = () => {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/admin/dashboard-stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching dashboard stats", err);
      }
    };
    if (token) fetchStats();
  }, [token]);

  const resolutionRate =
    stats && stats.total > 0
      ? Math.round((stats.resolved / stats.total) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-orange-400" />
                <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider">
                  Admin Panel
                </p>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Welcome, {user?.username || "Admin"} 👑
              </h1>
              <p className="text-slate-400 mt-1">
                Monitor and manage civic issues across your jurisdiction.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/all-reports")}
                className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-2.5 px-5 rounded-xl border border-white/20 transition-all flex items-center gap-2 text-sm"
              >
                <ListOrdered className="w-4 h-4" />
                All Reports
              </button>
              <button
                onClick={() => navigate("/admin/update-status")}
                className="group bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-orange-600/20 flex items-center gap-2 text-sm"
              >
                <ClipboardEdit className="w-4 h-4" />
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-4 pb-12">
        {/* Stats Cards */}
        {!stats ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="animate-pulse space-y-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                  <div className="w-16 h-8 bg-gray-200 rounded" />
                  <div className="w-20 h-4 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Total Reports",
                value: stats.total,
                icon: FileText,
                accent: "border-blue-500",
                iconColor: "text-blue-500",
                bg: "bg-blue-50",
                tag: "ALL",
                tagColor: "bg-blue-100 text-blue-700",
              },
              {
                label: "Pending Review",
                value: stats.pending,
                icon: AlertCircle,
                accent: "border-red-500",
                iconColor: "text-red-500",
                bg: "bg-red-50",
                tag: "URGENT",
                tagColor: "bg-red-100 text-red-700",
              },
              {
                label: "In Progress",
                value: stats.inProgress,
                icon: Clock,
                accent: "border-amber-500",
                iconColor: "text-amber-500",
                bg: "bg-amber-50",
                tag: "ACTIVE",
                tagColor: "bg-amber-100 text-amber-700",
              },
              {
                label: "Resolved",
                value: stats.resolved,
                icon: CheckCircle,
                accent: "border-emerald-500",
                iconColor: "text-emerald-500",
                bg: "bg-emerald-50",
                tag: "DONE",
                tagColor: "bg-emerald-100 text-emerald-700",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${stat.accent} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.tagColor}`}>
                    {stat.tag}
                  </span>
                </div>
                <p className="text-3xl font-black text-gray-900">{stat.value.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Grid */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Resolution Progress */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-orange-500" />
                Resolution Overview
              </h3>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Overall Resolution Rate</span>
                  <span className="font-bold text-gray-900">{resolutionRate}%</span>
                </div>
                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${resolutionRate}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                  </div>
                </div>
              </div>

              {/* Breakdown bars */}
              <div className="space-y-4">
                {[
                  { label: "Pending", count: stats.pending, total: stats.total, color: "bg-red-500" },
                  { label: "In Progress", count: stats.inProgress, total: stats.total, color: "bg-amber-500" },
                  { label: "Resolved", count: stats.resolved, total: stats.total, color: "bg-emerald-500" },
                ].map((bar, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{bar.label}</span>
                      <span className="font-semibold text-gray-800">
                        {bar.count} <span className="text-gray-400 font-normal">/ {bar.total}</span>
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${bar.color} rounded-full transition-all duration-700`}
                        style={{ width: `${bar.total > 0 ? (bar.count / bar.total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick stats row */}
              <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-black text-gray-900">
                    {stats.pending + stats.inProgress}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Active Issues</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-black text-emerald-600">{resolutionRate}%</p>
                  <p className="text-xs text-gray-500 mt-1">Success Rate</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* System Status */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-500" />
                  System Status
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Platform", icon: Server, status: "Online" },
                    { label: "Database", icon: Database, status: "Connected" },
                    { label: "API", icon: Wifi, status: "Healthy" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2">
                      <span className="flex items-center gap-2 text-sm text-gray-600">
                        <item.icon className="w-4 h-4 text-gray-400" />
                        {item.label}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        {item.status}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Last refreshed</span>
                      <span className="text-xs font-medium text-gray-500">
                        {new Date().toLocaleTimeString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    { label: "View All Reports", icon: ListOrdered, path: "/all-reports", color: "bg-blue-100 text-blue-600" },
                    { label: "Update Status", icon: ClipboardEdit, path: "/admin/update-status", color: "bg-orange-100 text-orange-600" },
                  ].map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(action.path)}
                      className="w-full group flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all text-left"
                    >
                      <div className={`w-9 h-9 rounded-lg ${action.color} flex items-center justify-center`}>
                        <action.icon className="w-4 h-4" />
                      </div>
                      <span className="flex-1 font-medium text-gray-800 text-sm">{action.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-orange-500 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
