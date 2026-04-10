import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  FileText,
  CheckCircle,
  Eye,
  Construction,
  Lightbulb,
  Trash2,
  Droplets,
  Phone,
  Mail,
  Clock,
  Shield,
  TrendingUp,
  Users,
  Building2,
  ChevronRight,
  BarChart3,
  MapPin,
  Star,
  Zap,
  Award,
  Quote,
  ArrowUpRight,
  Activity,
  CircleDot,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBg from "../assets/hero_city.png";
import phoneMockup from "../assets/phone_mockup.png";
import beforeStreet from "../assets/before_street.png";
import afterStreet from "../assets/after_street.png";
import citizen1 from "../assets/citizen1.png";
import citizen2 from "../assets/citizen2.png";
import communityImg from "../assets/community.png";
import workersImg from "../assets/workers.png";

/* ───── Animated counter hook ───── */
const useCounter = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!started) return;
    const num = parseInt(target.replace(/[^0-9]/g, "")) || 0;
    if (num === 0) return;
    const step = Math.ceil(num / (duration / 20));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return [count, setStarted];
};

/* ───── Live feed data (simulated) ───── */
const liveFeed = [
  { id: 1, type: "reported", text: "Pothole on MG Road, Sec-12", city: "Ranchi", time: "2 min ago", color: "text-orange-500", bg: "bg-orange-50" },
  { id: 2, type: "resolved", text: "Streetlight fixed near City Mall", city: "Lucknow", time: "8 min ago", color: "text-green-500", bg: "bg-green-50" },
  { id: 3, type: "in-progress", text: "Garbage overflow, Ward 15", city: "Patna", time: "14 min ago", color: "text-blue-500", bg: "bg-blue-50" },
  { id: 4, type: "resolved", text: "Water pipeline leak repaired", city: "Jamshedpur", time: "22 min ago", color: "text-green-500", bg: "bg-green-50" },
  { id: 5, type: "reported", text: "Broken divider on NH-33", city: "Dhanbad", time: "35 min ago", color: "text-orange-500", bg: "bg-orange-50" },
];

const Home = () => {
  const navigate = useNavigate();
  const [activeBeforeAfter, setActiveBeforeAfter] = useState("after");

  const [issuesCount, startIssues] = useCounter("12547");
  const [resolvedCount, startResolved] = useCounter("9832");
  const [usersCount, startUsers] = useCounter("45231");
  const [citiesCount, startCities] = useCounter("320");

  useEffect(() => {
    startIssues(true);
    startResolved(true);
    startUsers(true);
    startCities(true);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">

      {/* ══════════ TOP INFO BAR ══════════ */}
      <div className="bg-slate-900 text-white text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-orange-400" /> 1800 XXX XXXX
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-orange-400" /> support@urbanvoice.in
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-orange-400" /> Mon – Sat · 9 AM – 6 PM
          </span>
        </div>
      </div>

      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-indigo-900/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left copy */}
            <div className="text-left z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold text-white/90 uppercase tracking-wide">
                  Live — Tracking civic issues in real-time
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] mb-6">
                Your City,{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-orange-400">Your Voice</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-orange-400/20 rounded-sm -z-0" />
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300/90 mb-8 max-w-lg leading-relaxed">
                Snap. Report. Transform. UrbanVoice lets you photograph civic
                issues, tag them on a map, and watch authorities act — all from
                your phone.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/login")}
                  className="group bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-7 rounded-xl transition-all duration-300 shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 flex items-center gap-2"
                >
                  Report an Issue
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate("/all-reports")}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-3.5 px-7 rounded-xl border border-white/25 hover:border-white/50 transition-all duration-300 flex items-center gap-2"
                >
                  View Live Issues
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Mini trust badges */}
              <div className="mt-10 flex items-center gap-6 text-white/60 text-xs">
                <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> Secure</span>
                <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> Instant</span>
                <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> Trusted by 45K+</span>
              </div>
            </div>

            {/* Right — Phone mockup */}
            <div className="hidden lg:flex justify-center relative">
              <div className="relative">
                <img
                  src={phoneMockup}
                  alt="UrbanVoice App"
                  className="w-[320px] drop-shadow-2xl relative z-10 rounded-3xl"
                />
                {/* Decorative rings */}
                <div className="absolute -top-8 -right-8 w-64 h-64 border-2 border-white/10 rounded-full" />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 border-2 border-orange-400/20 rounded-full" />

                {/* Floating notification card */}
                <div className="absolute -left-16 top-20 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-3 animate-bounce-slow z-20">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-gray-800">Issue Resolved!</p>
                    <p className="text-gray-500">Pothole, MG Road</p>
                  </div>
                </div>

                {/* Floating stat badge */}
                <div className="absolute -right-10 bottom-24 bg-white rounded-xl shadow-xl px-4 py-3 text-center z-20">
                  <p className="text-2xl font-black text-orange-500">78%</p>
                  <p className="text-[10px] text-gray-500 font-medium">Resolved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ ANIMATED STATS BAR ══════════ */}
      <section className="bg-white border-y border-gray-100 -mt-px">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: issuesCount.toLocaleString(), suffix: "+", label: "Issues Reported", icon: FileText, accent: "text-blue-600" },
              { num: resolvedCount.toLocaleString(), suffix: "+", label: "Issues Resolved", icon: CheckCircle, accent: "text-green-600" },
              { num: usersCount.toLocaleString(), suffix: "+", label: "Active Citizens", icon: Users, accent: "text-orange-500" },
              { num: citiesCount.toLocaleString(), suffix: "+", label: "Cities Covered", icon: MapPin, accent: "text-indigo-600" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <s.icon className={`w-6 h-6 ${s.accent} mb-2`} />
                <p className="text-3xl sm:text-4xl font-black text-gray-900">{s.num}<span className="text-lg">{s.suffix}</span></p>
                <p className="text-gray-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ LIVE ACTIVITY FEED ══════════ */}
      <section className="px-4 sm:px-6 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
            <div>
              <span className="text-orange-500 font-semibold text-xs uppercase tracking-widest">Real-Time</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 flex items-center gap-2">
                <Activity className="w-6 h-6 text-orange-500" />
                Live Activity Feed
              </h2>
            </div>
            <button
              onClick={() => navigate("/all-reports")}
              className="text-sm font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1 transition-colors"
            >
              View all reports <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {liveFeed.map((item) => (
              <div
                key={item.id}
                className={`${item.bg} border border-gray-200/60 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <CircleDot className={`w-3.5 h-3.5 ${item.color}`} />
                  <span className={`text-xs font-bold uppercase tracking-wide ${item.color}`}>
                    {item.type.replace("-", " ")}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-800 mb-1">{item.text}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{item.city}</span>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ ISSUES WE SOLVE ══════════ */}
      <section className="px-4 sm:px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-orange-500 font-semibold text-xs uppercase tracking-widest">Categories</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-3">Issues We Help Solve</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Classify your report so the right department takes immediate action.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Construction, title: "Road & Infra", desc: "Potholes, broken dividers, dangerous debris on roads", gradient: "from-orange-500 to-amber-500", light: "bg-orange-50", border: "border-orange-200 hover:border-orange-400" },
              { icon: Lightbulb, title: "Street Lighting", desc: "Non-functional lights, dark alleys, damaged poles", gradient: "from-yellow-500 to-orange-400", light: "bg-yellow-50", border: "border-yellow-200 hover:border-yellow-400" },
              { icon: Trash2, title: "Waste & Sanitation", desc: "Garbage overflow, illegal dumping, missed bin pickups", gradient: "from-emerald-500 to-green-500", light: "bg-green-50", border: "border-green-200 hover:border-green-400" },
              { icon: Droplets, title: "Water Supply", desc: "Leaking pipelines, contamination, drainage blockages", gradient: "from-blue-500 to-cyan-500", light: "bg-blue-50", border: "border-blue-200 hover:border-blue-400" },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`group ${item.light} border-2 ${item.border} rounded-2xl p-7 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-hidden`}
              >
                {/* Accent bar */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BEFORE / AFTER TRANSFORMATION ══════════ */}
      <section className="px-4 sm:px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Image toggle */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={activeBeforeAfter === "before" ? beforeStreet : afterStreet}
                alt={activeBeforeAfter === "before" ? "Before UrbanVoice" : "After UrbanVoice"}
                className="w-full h-[380px] object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Toggle pills */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg z-10">
                <button
                  onClick={() => setActiveBeforeAfter("before")}
                  className={`px-5 py-2 text-sm font-bold rounded-full transition-all ${
                    activeBeforeAfter === "before"
                      ? "bg-red-500 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Before
                </button>
                <button
                  onClick={() => setActiveBeforeAfter("after")}
                  className={`px-5 py-2 text-sm font-bold rounded-full transition-all ${
                    activeBeforeAfter === "after"
                      ? "bg-green-500 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  After
                </button>
              </div>

              {/* Label */}
              <span className={`absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                activeBeforeAfter === "before"
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}>
                {activeBeforeAfter === "before" ? "Problem Reported" : "Issue Resolved"}
              </span>
            </div>

            {/* Copy */}
            <div>
              <span className="text-orange-500 font-semibold text-xs uppercase tracking-widest">Real Impact</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-5">
                See the Transformation
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Real stories from real neighborhoods. Every report you file
                drives tangible change — from damaged roads to clean, safe
                streets. Here is proof.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { label: "Average resolution time", value: "48 hours", icon: Clock },
                  { label: "Completion rate this month", value: "82%", icon: TrendingUp },
                  { label: "Community satisfaction", value: "4.8 ★", icon: Star },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white rounded-xl px-5 py-3.5 border border-gray-200 shadow-sm">
                    <item.icon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{item.label}</span>
                    <span className="ml-auto font-bold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/signup")}
                className="group bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md inline-flex items-center gap-2"
              >
                Join & Report
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS (vertical timeline) ══════════ */}
      <section className="px-4 sm:px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-orange-500 font-semibold text-xs uppercase tracking-widest">3-Step Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">How It Works</h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 via-blue-400 to-green-400 -translate-x-1/2" />

            {[
              { icon: FileText, step: "01", title: "Report", desc: "Snap a photo, pin it on the map, describe the problem, and hit submit. It takes less than a minute.", color: "bg-orange-500", img: communityImg, side: "left" },
              { icon: Eye, step: "02", title: "Verify", desc: "Nearby citizens corroborate the report. Community-backed issues rise in priority for faster resolution.", color: "bg-blue-500", img: workersImg, side: "right" },
              { icon: CheckCircle, step: "03", title: "Resolve", desc: "Authorities receive the report, take action, and upload proof of completion. You confirm it's fixed.", color: "bg-green-500", img: afterStreet, side: "left" },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col md:flex-row items-center gap-8 mb-16 last:mb-0 ${
                  item.side === "right" ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Card side */}
                <div className="md:w-5/12">
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                    <div className={`${item.color} text-white w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold mb-4`}>
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex w-2/12 justify-center relative z-10">
                  <div className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Image side */}
                <div className="md:w-5/12">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-2xl shadow-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="px-4 sm:px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-orange-500 font-semibold text-xs uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">What Citizens Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Priya Sharma",
                role: "Resident, Ranchi",
                avatar: citizen1,
                quote:
                  "I reported a broken streetlight near my lane and it was fixed within 3 days. For the first time, I feel like my complaint actually reached someone who cared.",
              },
              {
                name: "Amit Verma",
                role: "Community Volunteer, Lucknow",
                avatar: citizen2,
                quote:
                  "UrbanVoice gave our neighbourhood group a proper channel to escalate issues. The tracking dashboard is incredibly transparent. Authorities can no longer ignore us.",
              },
            ].map((t, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow relative">
                <Quote className="w-8 h-8 text-orange-200 absolute top-6 right-6" />
                <p className="text-gray-600 leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-orange-200" />
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 to-indigo-900/90" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-5">
            Ready to make a <span className="text-orange-400">difference</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Every report filed is a step towards a better city. Join tens of
            thousands of citizens who refuse to stay silent.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="group bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-9 rounded-xl text-lg transition-all duration-300 shadow-lg shadow-orange-600/30 inline-flex items-center gap-3"
            >
              Start Reporting
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-9 rounded-xl text-lg border border-white/25 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="bg-slate-900 text-gray-400 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-orange-400" /> UrbanVoice
              </h4>
              <p className="text-sm leading-relaxed">
                A transparent civic platform empowering citizens to report and
                track issues for cleaner, safer cities across India.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate("/all-reports")} className="hover:text-orange-400 transition-colors">View All Reports</button></li>
                <li><button onClick={() => navigate("/login")} className="hover:text-orange-400 transition-colors">Login</button></li>
                <li><button onClick={() => navigate("/signup")} className="hover:text-orange-400 transition-colors">Sign Up</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-orange-400" /> 1800 XXX XXXX</li>
                <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-orange-400" /> support@urbanvoice.in</li>
                <li className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-orange-400" /> Mon – Sat: 9 AM – 6 PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 text-center text-sm">
            <p>© 2025 UrbanVoice · Innovated &amp; Designed by <span className="text-white font-semibold">Roshan, IIIT Ranchi</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
