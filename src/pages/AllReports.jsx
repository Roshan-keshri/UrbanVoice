import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  MapPin,
  Tag,
  Building2,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  ClipboardEdit,
  FileText,
  Copy,
  Loader2,
  ListOrdered,
  Shield,
  X,
} from "lucide-react";

const statusConfig = {
  resolved: {
    label: "Resolved",
    dot: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-800",
  },
  "in-progress": {
    label: "In Progress",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-800",
  },
  pending: {
    label: "Pending",
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-700",
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

const AllReports = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterArea, setFilterArea] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/reports", {
        headers: { Authorization: `Bearer ${token}` },
        params: filterArea ? { area: filterArea } : {},
      });
      setReports(Array.isArray(res.data.reports) ? res.data.reports : []);
    } catch (err) {
      console.error("Admin report fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user?.role === "admin") fetchReports();
  }, [filterArea, token, user]);

  const filteredReports =
    filterStatus === "all"
      ? reports
      : reports.filter((r) => r.status === filterStatus);

  const copyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const counts = {
    all: reports.length,
    pending: reports.filter((r) => r.status === "pending").length,
    "in-progress": reports.filter((r) => r.status === "in-progress").length,
    resolved: reports.filter((r) => r.status === "resolved").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-orange-400" />
                <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider">
                  Admin
                </p>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                <ListOrdered className="w-7 h-7" />
                All Reports
              </h1>
              <p className="text-slate-400 mt-1">
                View and manage all civic reports from your jurisdiction.
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/update-status")}
              className="group bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-orange-600/20 flex items-center gap-2 text-sm w-fit"
            >
              <ClipboardEdit className="w-4 h-4" />
              Update Status
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-4 pb-12">
        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Filter by area name..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-800 placeholder-gray-400 text-sm"
                value={filterArea}
                onChange={(e) => setFilterArea(e.target.value.toLowerCase())}
              />
              {filterArea && (
                <button
                  onClick={() => setFilterArea("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {/* Status tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { key: "all", label: "All" },
                { key: "pending", label: "Pending" },
                { key: "in-progress", label: "Active" },
                { key: "resolved", label: "Resolved" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilterStatus(f.key)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filterStatus === f.key
                      ? "bg-orange-500 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                  <span className="ml-1 opacity-70">{counts[f.key]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reports */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Loading reports...</p>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Reports Found</h3>
              <p className="text-gray-500 text-sm">
                {filterArea || filterStatus !== "all"
                  ? "Try adjusting your filters."
                  : "Reports will appear here once citizens submit them."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredReports.map((r) => {
                const status = statusConfig[r.status] || statusConfig.pending;
                const isExpanded = expandedCard === r._id;
                return (
                  <div
                    key={r._id}
                    className="px-6 py-5 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Category emoji */}
                      <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">
                        {categoryIcons[r.category?.toLowerCase()] || "📋"}
                      </div>

                      {/* Main content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <h3 className="font-bold text-gray-900 text-base">
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
                          {/* Copy-able ID */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyId(r._id);
                            }}
                            className="flex items-center gap-1 hover:text-orange-500 transition-colors font-mono"
                            title="Click to copy Report ID"
                          >
                            <Copy className="w-3 h-3" />
                            {copiedId === r._id ? (
                              <span className="text-emerald-500 font-sans font-semibold">Copied!</span>
                            ) : (
                              <span>
                                {r._id.slice(0, 8)}…
                              </span>
                            )}
                          </button>
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

                        {/* Expand toggle */}
                        <button
                          onClick={() => setExpandedCard(isExpanded ? null : r._id)}
                          className="mt-2 text-xs font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1"
                        >
                          {isExpanded ? (
                            <>
                              Show less <ChevronUp className="w-3 h-3" />
                            </>
                          ) : (
                            <>
                              Show more <ChevronDown className="w-3 h-3" />
                            </>
                          )}
                        </button>

                        {/* Expanded content */}
                        {isExpanded && (
                          <div className="mt-4 space-y-3">
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                              <p className="text-xs text-gray-400 mb-1">Full Report ID</p>
                              <p className="text-sm font-mono text-gray-700 break-all">{r._id}</p>
                            </div>
                            {r.imageUrl && (
                              <img
                                src={r.imageUrl}
                                alt="Report evidence"
                                className="w-full max-w-lg h-56 object-cover rounded-xl border border-gray-200 shadow-sm"
                              />
                            )}
                          </div>
                        )}
                      </div>

                      {/* Thumbnail */}
                      {!isExpanded && r.imageUrl && (
                        <div className="flex-shrink-0 relative hidden sm:block">
                          <img
                            src={r.imageUrl}
                            alt="Report"
                            className="w-16 h-16 object-cover rounded-xl border border-gray-200"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Results footer */}
        {filteredReports.length > 0 && (
          <p className="text-center text-sm text-gray-400 mt-4">
            Showing {filteredReports.length} of {reports.length} report
            {reports.length !== 1 ? "s" : ""}
            {filterArea && ` matching "${filterArea}"`}
          </p>
        )}
      </div>
    </div>
  );
};

export default AllReports;
