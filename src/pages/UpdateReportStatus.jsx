import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  ClipboardEdit,
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  AlertCircle,
  Hash,
  RefreshCw,
  ArrowLeft,
  Loader2,
  Info,
} from "lucide-react";

const statusOptions = [
  {
    value: "pending",
    label: "Pending",
    desc: "Issue has been reported, awaiting admin review.",
    icon: AlertCircle,
    color: "border-red-300 bg-red-50",
    selectedColor: "border-red-500 bg-red-50 ring-2 ring-red-500",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    dot: "bg-red-500",
  },
  {
    value: "in-progress",
    label: "In Progress",
    desc: "Issue acknowledged, work is underway.",
    icon: Clock,
    color: "border-amber-300 bg-amber-50",
    selectedColor: "border-amber-500 bg-amber-50 ring-2 ring-amber-500",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    dot: "bg-amber-500",
  },
  {
    value: "resolved",
    label: "Resolved",
    desc: "Issue has been fixed and verified.",
    icon: CheckCircle,
    color: "border-emerald-300 bg-emerald-50",
    selectedColor: "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    dot: "bg-emerald-500",
  },
];

const UpdateReportStatus = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reportId, setReportId] = useState("");
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSubmitting(true);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/report/${reportId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "Status updated successfully!");
      setReportId("");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating status");
    } finally {
      setSubmitting(false);
    }
  };

  const selected = statusOptions.find((s) => s.value === status);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-orange-400" />
            <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider">
              Admin Action
            </p>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <ClipboardEdit className="w-7 h-7" />
            Update Report Status
          </h1>
          <p className="text-slate-400 mt-1">
            Change the status of any report using its Report ID.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4 pb-12">
        {/* Alerts */}
        {message && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-emerald-900">Success!</h3>
              <p className="text-emerald-700 text-sm mt-1">{message}</p>
            </div>
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-red-900">Error</h3>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Report ID */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Hash className="w-4 h-4 text-gray-400" />
                  Report ID
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={reportId}
                  onChange={(e) => setReportId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-800 placeholder-gray-400 font-mono text-sm"
                  placeholder="e.g., 507f1f77bcf86cd799439011"
                  required
                />
                <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Copy it from the All Reports page by clicking the ID.
                </p>
              </div>

              {/* Status Selection — visual cards */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <RefreshCw className="w-4 h-4 text-gray-400" />
                  New Status
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {statusOptions.map((opt) => {
                    const isSelected = status === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setStatus(opt.value)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center ${
                          isSelected ? opt.selectedColor : `${opt.color} hover:shadow-sm`
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl ${opt.iconBg} flex items-center justify-center`}>
                          <opt.icon className={`w-5 h-5 ${opt.iconColor}`} />
                        </div>
                        <span className="font-bold text-gray-900 text-sm">{opt.label}</span>
                        <span className="text-[11px] text-gray-500 leading-tight">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!reportId.trim() || submitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 flex items-center justify-center gap-2 text-base"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    Update Status
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar — Status Guide */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-bold text-gray-900 mb-4">📖 Status Guide</h4>
              <div className="space-y-3">
                {statusOptions.map((opt) => (
                  <div
                    key={opt.value}
                    className={`flex items-start gap-3 p-3 rounded-xl ${opt.color.split(" ")[1]} border ${opt.color.split(" ")[0]}`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${opt.dot} mt-1 flex-shrink-0`} />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{opt.label}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{opt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-50 rounded-2xl border border-orange-200 p-6">
              <h4 className="font-bold text-orange-900 mb-3">💡 Tips</h4>
              <ul className="space-y-2 text-sm text-orange-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>Report IDs can be copied from the All Reports page.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>Status changes are reflected immediately for citizens.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>Only mark "Resolved" once the issue is fully fixed.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateReportStatus;
