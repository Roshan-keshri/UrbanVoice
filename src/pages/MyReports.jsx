import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  Tag,
  Building2,
  Plus,
  Loader2,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Filter,
  Image as ImageIcon,
} from "lucide-react";
import emptyStateImg from "../assets/empty_state.png";

const statusConfig = {
  resolved: {
    icon: CheckCircle,
    label: "Resolved",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-800",
  },
  "in-progress": {
    icon: Clock,
    label: "In Progress",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-800",
  },
  pending: {
    icon: AlertCircle,
    label: "Pending",
    bg: "bg-slate-50",
    text: "text-slate-600",
    border: "border-slate-200",
    dot: "bg-slate-400",
    badge: "bg-slate-100 text-slate-700",
  },
};

const categoryIcons = {
  roads: "🛣️",
  sanitation: "🗑️",
  streetlights: "💡",
  water: "💧",
  parks: "🌳",
  noise: "🔊",
  utilities: "⚡",
  safety: "🛡️",
  other: "📋",
};

const MyReports = () => {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("/api/user/my-reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(Array.isArray(res.data.reports) ? res.data.reports : []);
      } catch (err) {
        console.error("Error fetching reports", err);
        setReports([]);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchReports();
  }, [token]);

  const totalReports = reports.length;
  const resolvedCount = reports.filter((r) => r.status === "resolved").length;
  const inProgressCount = reports.filter((r) => r.status === "in-progress").length;
  const pendingCount = reports.filter((r) => r.status === "pending").length;
  const resolutionRate = totalReports > 0 ? Math.round((resolvedCount / totalReports) * 100) : 0;

  const filteredReports =
    filter === "all" ? reports : reports.filter((r) => r.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider mb-1">
                Dashboard
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Welcome back, {user?.username || "Citizen"} 👋
              </h1>
              <p className="text-slate-400 mt-1">
                Track and manage all your civic reports in one place.
              </p>
            </div>
            <button
              onClick={() => navigate("/report")}
              className="group bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-orange-600/20 flex items-center gap-2 w-fit"
            >
              <Plus className="w-5 h-5" />
              New Report
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Reports", value: totalReports, icon: FileText, accent: "border-blue-500", iconColor: "text-blue-500", bg: "bg-blue-50" },
            { label: "Resolved", value: resolvedCount, icon: CheckCircle, accent: "border-emerald-500", iconColor: "text-emerald-500", bg: "bg-emerald-50" },
            { label: "In Progress", value: inProgressCount, icon: Clock, accent: "border-amber-500", iconColor: "text-amber-500", bg: "bg-amber-50" },
            { label: "Resolution Rate", value: `${resolutionRate}%`, icon: TrendingUp, accent: "border-orange-500", iconColor: "text-orange-500", bg: "bg-orange-50" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${stat.accent} hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filter bar + reports */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-10">
          {/* Filter Tabs */}
          <div className="border-b border-gray-200 px-6 py-4 flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 mr-1" />
            {[
              { key: "all", label: "All" },
              { key: "pending", label: "Pending" },
              { key: "in-progress", label: "In Progress" },
              { key: "resolved", label: "Resolved" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filter === f.key
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.label}
                {f.key !== "all" && (
                  <span className="ml-1.5 text-xs">
                    {f.key === "pending"
                      ? pendingCount
                      : f.key === "in-progress"
                      ? inProgressCount
                      : resolvedCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Loading your reports...</p>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <img
                src={emptyStateImg}
                alt="No reports yet"
                className="w-40 h-40 object-contain mb-6 opacity-80"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {filter === "all"
                  ? "No Reports Yet"
                  : `No ${filter.replace("-", " ")} reports`}
              </h3>
              <p className="text-gray-500 mb-6 max-w-sm">
                {filter === "all"
                  ? "You haven't submitted any civic issues yet. Start making your city better today!"
                  : "No reports match this filter right now."}
              </p>
              {filter === "all" && (
                <button
                  onClick={() => navigate("/report")}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Submit Your First Report
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredReports.map((r) => {
                const status = statusConfig[r.status] || statusConfig.pending;
                const StatusIcon = status.icon;
                const isExpanded = expandedCard === r._id;
                return (
                  <div
                    key={r._id}
                    className="px-6 py-5 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={() =>
                      setExpandedCard(isExpanded ? null : r._id)
                    }
                  >
                    <div className="flex items-start gap-4">
                      {/* Category emoji */}
                      <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">
                        {categoryIcons[r.category?.toLowerCase()] || "📋"}
                      </div>

                      {/* Main content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <h3 className="font-bold text-gray-900 text-base truncate">
                            {r.title}
                          </h3>
                          <span
                            className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status.badge}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                            {status.label}
                          </span>
                        </div>
                        <p className={`text-sm text-gray-500 ${isExpanded ? "" : "line-clamp-1"}`}>
                          {r.description}
                        </p>

                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-3 mt-2.5 text-xs text-gray-400">
                          {r.category && (
                            <span className="flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              {r.category}
                            </span>
                          )}
                          {r.state && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {r.state}
                            </span>
                          )}
                          {r.area && (
                            <span className="flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              {r.area}
                            </span>
                          )}
                          {r.createdAt && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(r.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          )}
                        </div>

                        {/* Expanded image */}
                        {isExpanded && r.imageUrl && (
                          <div className="mt-4">
                            <img
                              src={r.imageUrl}
                              alt="Report evidence"
                              className="w-full max-w-md h-48 object-cover rounded-xl border border-gray-200 shadow-sm"
                            />
                          </div>
                        )}
                      </div>

                      {/* Thumbnail (collapsed) */}
                      {!isExpanded && r.imageUrl && (
                        <div className="flex-shrink-0 relative">
                          <img
                            src={r.imageUrl}
                            alt="Report"
                            className="w-16 h-16 object-cover rounded-xl border border-gray-200"
                          />
                          <div className="absolute inset-0 bg-black/10 rounded-xl flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-white drop-shadow" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReports;
