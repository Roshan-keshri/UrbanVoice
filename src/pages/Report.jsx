import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Upload,
  Send,
  CheckCircle,
  AlertTriangle,
  X,
  MapPin,
  FileText,
  Tag,
  Info,
  ChevronRight,
  Construction,
  Lightbulb,
  Trash2,
  Droplets,
  TreePine,
  Volume2,
  Zap,
  Shield,
  HelpCircle,
} from "lucide-react";

const categories = [
  { value: "roads", label: "Roads & Transport", icon: Construction, color: "orange" },
  { value: "sanitation", label: "Sanitation & Waste", icon: Trash2, color: "green" },
  { value: "streetlights", label: "Street Lighting", icon: Lightbulb, color: "yellow" },
  { value: "water", label: "Water & Drainage", icon: Droplets, color: "blue" },
  { value: "parks", label: "Parks & Recreation", icon: TreePine, color: "emerald" },
  { value: "noise", label: "Noise Pollution", icon: Volume2, color: "purple" },
  { value: "utilities", label: "Public Utilities", icon: Zap, color: "amber" },
  { value: "safety", label: "Public Safety", icon: Shield, color: "red" },
  { value: "other", label: "Other", icon: HelpCircle, color: "slate" },
];

const colorMap = {
  orange: { bg: "bg-orange-50", border: "border-orange-300", ring: "ring-orange-500", iconBg: "bg-orange-100", iconColor: "text-orange-600" },
  green: { bg: "bg-green-50", border: "border-green-300", ring: "ring-green-500", iconBg: "bg-green-100", iconColor: "text-green-600" },
  yellow: { bg: "bg-yellow-50", border: "border-yellow-300", ring: "ring-yellow-500", iconBg: "bg-yellow-100", iconColor: "text-yellow-600" },
  blue: { bg: "bg-blue-50", border: "border-blue-300", ring: "ring-blue-500", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-300", ring: "ring-emerald-500", iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
  purple: { bg: "bg-purple-50", border: "border-purple-300", ring: "ring-purple-500", iconBg: "bg-purple-100", iconColor: "text-purple-600" },
  amber: { bg: "bg-amber-50", border: "border-amber-300", ring: "ring-amber-500", iconBg: "bg-amber-100", iconColor: "text-amber-600" },
  red: { bg: "bg-red-50", border: "border-red-300", ring: "ring-red-500", iconBg: "bg-red-100", iconColor: "text-red-600" },
  slate: { bg: "bg-slate-50", border: "border-slate-300", ring: "ring-slate-500", iconBg: "bg-slate-100", iconColor: "text-slate-600" },
};

const Report = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      await axios.post("/api/user/report", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("success");
      setTitle("");
      setDescription("");
      setCategory("");
      removeImage();
    } catch (err) {
      console.error(err);
      setMessage("error");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedCat = categories.find((c) => c.value === category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider mb-1">
            New Report
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold">Report a Civic Issue</h1>
          <p className="text-slate-400 mt-1">
            Help improve your community — describe the problem and we'll route it to the right authority.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4 pb-12">
        {/* Success overlay */}
        {message === "success" && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-emerald-900">Report Submitted Successfully!</h3>
              <p className="text-emerald-700 text-sm mt-1">
                Your report has been received and will be reviewed within 24-48 hours.
              </p>
              <button
                onClick={() => navigate("/my-reports")}
                className="mt-3 text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                View My Reports <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        {message === "error" && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-red-900">Submission Failed</h3>
              <p className="text-red-700 text-sm mt-1">Please try again or check your connection.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  Issue Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Pothole on Main Street near City Park"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-800 placeholder-gray-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Category Grid */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Tag className="w-4 h-4 text-gray-400" />
                  Category
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                  {categories.map((cat) => {
                    const c = colorMap[cat.color];
                    const isSelected = category === cat.value;
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setCategory(cat.value)}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center ${
                          isSelected
                            ? `${c.bg} ${c.border} ring-2 ${c.ring}`
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg ${isSelected ? c.iconBg : "bg-gray-100"} flex items-center justify-center`}>
                          <cat.icon className={`w-4 h-4 ${isSelected ? c.iconColor : "text-gray-500"}`} />
                        </div>
                        <span className={`text-xs font-medium leading-tight ${isSelected ? "text-gray-900" : "text-gray-600"}`}>
                          {cat.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Info className="w-4 h-4 text-gray-400" />
                  Description
                </label>
                <textarea
                  rows="5"
                  placeholder="Describe the issue in detail — include landmarks, severity, and how long it has been present..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-800 placeholder-gray-400 resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-400">Be as specific as possible</p>
                  <p className={`text-xs ${description.length < 20 ? "text-gray-400" : "text-emerald-500"}`}>
                    {description.length} chars
                  </p>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Camera className="w-4 h-4 text-gray-400" />
                  Photo Evidence
                  <span className="text-xs font-normal text-gray-400">(optional)</span>
                </label>

                {!preview ? (
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50/30 transition-all group"
                  >
                    <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3 group-hover:text-orange-400 transition-colors" />
                    <p className="text-gray-600 font-medium">Click to upload an image</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-gray-200">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-52 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs rounded-lg px-3 py-1.5">
                      {image.name}
                    </div>
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting || !title || !category || !description}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 flex items-center justify-center gap-2 text-base"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Report
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location auto-filled */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                Your Location
              </h4>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-0.5">State</p>
                  <p className="font-semibold text-gray-800 text-sm">{user?.state || "—"}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-0.5">Area</p>
                  <p className="font-semibold text-gray-800 text-sm">{user?.area || "—"}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Location is auto-filled from your profile.
              </p>
            </div>

            {/* Guidelines */}
            <div className="bg-orange-50 rounded-2xl border border-orange-200 p-6">
              <h4 className="font-bold text-orange-900 mb-3">📋 Quick Tips</h4>
              <ul className="space-y-2.5 text-sm text-orange-800">
                {[
                  "Include nearby landmarks for precise location",
                  "Attach a clear photo for faster processing",
                  "Pick the right category — it routes to the correct dept",
                  "Reports are reviewed within 24–48 hours",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
