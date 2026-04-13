"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, CheckSquare, Folder, Users, Flame,
  Sparkles, Briefcase, Notebook, Zap, Shield,
  ChevronRight, Star, Menu, X,
} from "lucide-react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const FEATURES = [
  {
    icon: CheckSquare,
    title: "Task Manager",
    desc: "Capture, organize, and complete tasks with lightning speed. Filter by status, track completion streaks, and never drop the ball.",
    color: "#34d399",
    tag: "Productivity",
  },
  {
    icon: Folder,
    title: "Project Tracker",
    desc: "Manage every project with visual progress bars, tech stack tags, and smart timestamps. Know exactly where everything stands.",
    color: "#3b82f6",
    tag: "Build",
  },
  {
    icon: Users,
    title: "Client CRM",
    desc: "Track your clients, their companies, and relationship status in one clean table. Never forget who's active or pending.",
    color: "#ec4899",
    tag: "Relationships",
  },
  {
    icon: Flame,
    title: "Lead Pipeline",
    desc: "Move leads through New → Contacted → Converted with inline status updates, WhatsApp links, and search-as-you-type filtering.",
    color: "#f87171",
    tag: "Growth",
  },
  {
    icon: Briefcase,
    title: "Job Applications",
    desc: "Track every application, interview, and offer in a visual card view. Update status on the fly and stay on top of your career.",
    color: "#f59e0b",
    tag: "Career",
  },
  {
    icon: Notebook,
    title: "Smart Notes",
    desc: "A gorgeous color-coded note grid with expand/collapse, auto-timestamps, and instant search. Your second brain, perfected.",
    color: "#a78bfa",
    tag: "Ideas",
  },
  {
    icon: Sparkles,
    title: "AI Assistant",
    desc: "Ask anything. Get real-time insights, suggested priorities, productivity scoring, and a chat interface that actually helps.",
    color: "#60a5fa",
    tag: "Intelligence",
  },
  {
    icon: Shield,
    title: "Privacy First",
    desc: "AES-256 encryption, SOC 2 via Clerk, GDPR & CCPA compliant. Export all your data as JSON any time. You own it.",
    color: "#64748b",
    tag: "Security",
  },
];

const HOW_STEPS = [
  { step: "01", title: "Sign in with Clerk", desc: "One click. Enterprise-grade authentication, no password required." },
  { step: "02", title: "Set up your workspace", desc: "Add your tasks, projects, clients, and leads. Everything lives in one place." },
  { step: "03", title: "Let AI work for you", desc: "Get a live productivity score, priorities, and smart suggestions every day." },
  { step: "04", title: "Ship faster", desc: "Less time managing, more time building. GrowthX gets out of your way." },
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for getting started.",
    features: ["50 tasks", "5 projects", "10 clients", "Basic AI insights", "Community support"],
    cta: "Get started free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    desc: "For serious builders and freelancers.",
    features: ["Unlimited everything", "Full AI Assistant", "Lead pipeline", "Job tracker", "Data export", "Priority support"],
    cta: "Start Pro trial",
    highlight: true,
  },
  {
    name: "Team",
    price: "$39",
    period: "per month",
    desc: "For small teams moving fast.",
    features: ["Everything in Pro", "5 team seats", "Shared projects", "Admin controls", "SSO / SAML", "Dedicated support"],
    cta: "Contact sales",
    highlight: false,
  },
];

const TESTIMONIALS = [
  { name: "Alex M.", role: "Freelance Developer", text: "GrowthX replaced 4 different tools for me. Tasks, clients, projects, and AI — all in one gorgeous dark UI.", avatar: "AM" },
  { name: "Priya S.", role: "Startup Founder", text: "The lead pipeline alone is worth it. I can see exactly where every prospect is and message them on WhatsApp in one click.", avatar: "PS" },
  { name: "Jordan K.", role: "Product Designer", text: "The AI productivity score keeps me accountable. It's weirdly motivating to see that number go up.", avatar: "JK" },
];

const FAQS = [
  { q: "Is there a free trial?", a: "Yes — the Free plan is free forever. No credit card required to get started. Upgrade to Pro anytime." },
  { q: "Can I export my data?", a: "Absolutely. Go to Privacy & Data in your settings and export everything as a JSON file instantly." },
  { q: "How does the AI work?", a: "GrowthX uses Anthropic's Claude API to generate insights from your workspace data. Nothing is stored or shared." },
  { q: "Is it mobile friendly?", a: "Yes. GrowthX is fully responsive. On mobile the sidebar becomes a slide-out drawer." },
  { q: "What authentication does it use?", a: "Clerk — SOC 2 Type II certified. Supports Google, GitHub, and email sign-in out of the box." },
];

/* ─────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────── */

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,8,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black"
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.4), rgba(59,130,246,0.3))",
            border: "1px solid rgba(139,92,246,0.4)",
          }}>
          GX
        </div>
        <span className="text-base font-black tracking-tight text-white">GrowthX</span>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((l) => (
          <a key={l.label} href={l.href}
            className="text-sm text-gray-500 hover:text-white transition-colors duration-200 font-medium">
            {l.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="hidden md:flex items-center gap-3">
        <Link href="/sign-in">
          <span className="text-sm text-gray-400 hover:text-white transition-colors font-medium cursor-pointer">Sign in</span>
        </Link>
        <Link href="/wishlist">
          <motion.span
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer text-sm font-semibold px-4 py-2 rounded-xl transition-all"
            style={{
              background: "white",
              color: "black",
              boxShadow: "0 4px 20px rgba(255,255,255,0.1)",
            }}
          >
            Get early access
          </motion.span>
        </Link>
      </div>

      {/* Mobile burger */}
      <button className="md:hidden text-gray-400" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 p-6 flex flex-col gap-4"
            style={{ background: "#0a0a0e", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                className="text-sm text-gray-400 hover:text-white transition-colors font-medium">
                {l.label}
              </a>
            ))}
            <hr style={{ borderColor: "rgba(255,255,255,0.07)" }} />
            <Link href="/wishlist">
              <span className="block text-center py-3 rounded-xl text-sm font-semibold cursor-pointer"
                style={{ background: "white", color: "black" }}>
                Get early access
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-4xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8"
          style={{
            background: "rgba(139,92,246,0.1)",
            border: "1px solid rgba(139,92,246,0.25)",
            color: "#a78bfa",
          }}
        >
          <Sparkles size={12} />
          Now with AI-powered productivity insights
          <ChevronRight size={11} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-black tracking-tighter leading-none mb-6"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "clamp(48px, 8vw, 96px)",
          }}
        >
          <span className="text-white">Your entire</span>
          <br />
          <span style={{
            background: "linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            work life,
          </span>
          <br />
          <span className="text-white">one place.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ fontSize: "clamp(15px, 2vw, 18px)" }}
        >
          Tasks. Projects. Clients. Leads. Jobs. Notes. AI.
          <br />
          GrowthX is the workspace for builders who move fast.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <Link href="/wishlist">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-sm font-bold transition-all"
              style={{
                background: "white",
                color: "black",
                boxShadow: "0 8px 32px rgba(255,255,255,0.15)",
              }}
            >
              Start for free <ArrowRight size={16} />
            </motion.span>
          </Link>
          <a href="#features">
            <motion.span
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-sm font-semibold transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#9ca3af",
              }}
            >
              See features
            </motion.span>
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-600"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill="#f59e0b" stroke="none" />
            ))}
            <span className="ml-1">4.9/5 from 200+ users</span>
          </div>
          <span className="hidden sm:block opacity-30">·</span>
          <span>No credit card required</span>
          <span className="hidden sm:block opacity-30">·</span>
          <span>Free forever plan</span>
        </motion.div>
      </motion.div>

      {/* Dashboard preview */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-20 w-full max-w-5xl mx-auto px-4"
      >
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >
          {/* Fake top bar */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="flex gap-1.5">
              {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
                <div key={c} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.6 }} />
              ))}
            </div>
            <div className="flex-1 flex justify-center">
              <div className="text-xs text-gray-600 font-mono px-4 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                growthx.app/dashboard
              </div>
            </div>
          </div>

          {/* Fake dashboard grid */}
          <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            {[
              { label: "Tasks", value: "12", color: "#34d399" },
              { label: "Projects", value: "5", color: "#3b82f6" },
              { label: "Clients", value: "8", color: "#ec4899" },
              { label: "Leads", value: "23", color: "#f87171" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-xs text-gray-600 mb-1">{s.label}</p>
                <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Fake AI card */}
          <div className="mx-5 mb-5 rounded-2xl p-4"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.06))",
              border: "1px solid rgba(139,92,246,0.2)",
            }}>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles size={14} style={{ color: "#a78bfa" }} />
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">AI Insight</p>
            </div>
            <p className="text-sm text-white font-medium mb-1">You have 3 overdue tasks and 2 hot leads.</p>
            <p className="text-xs text-gray-500">Focus on closing lead "Rahul S." — last contact was 5 days ago.</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-gray-600">AI Productivity Score</span>
              <span className="text-xl font-black" style={{
                background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>82%</span>
            </div>
          </div>

          {/* Gradient fade bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{ background: "linear-gradient(to top, #080808, transparent)" }} />
        </div>
      </motion.div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-32 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <p className="text-[11px] tracking-[0.25em] uppercase text-gray-600 font-semibold mb-3">Everything you need</p>
        <h2 className="font-black tracking-tighter text-white mb-4"
          style={{ fontSize: "clamp(32px, 5vw, 56px)", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          8 tools. Zero tab-switching.
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
          Every feature is built into one cohesive workspace. No integrations, no duct tape, no chaos.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl p-5 cursor-default"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at top left, ${f.color}10, transparent 60%)` }} />

              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${f.color}15`, border: `1px solid ${f.color}25` }}>
                <Icon size={18} style={{ color: f.color }} />
              </div>

              <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 inline-block"
                style={{ background: `${f.color}12`, color: f.color }}>
                {f.tag}
              </span>

              <h3 className="text-sm font-bold text-white mb-2">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function HowSection() {
  return (
    <section id="how" className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)",
        }} />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-[11px] tracking-[0.25em] uppercase text-gray-600 font-semibold mb-3">Simple by design</p>
          <h2 className="font-black tracking-tighter text-white"
            style={{ fontSize: "clamp(32px, 5vw, 56px)", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
            Up and running in minutes
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {HOW_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex gap-5 p-6 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex-shrink-0">
                <span className="font-black text-3xl leading-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(139,92,246,0.5), rgba(59,130,246,0.3))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                  {step.step}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-white mb-1 text-sm">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-[11px] tracking-[0.25em] uppercase text-gray-600 font-semibold mb-3">Loved by builders</p>
        <h2 className="font-black tracking-tighter text-white"
          style={{ fontSize: "clamp(28px, 4vw, 48px)", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          People actually love this
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={12} fill="#f59e0b" stroke="none" />
              ))}
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-5">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(59,130,246,0.2))",
                  border: "1px solid rgba(139,92,246,0.2)",
                  color: "#a78bfa",
                }}>
                {t.avatar}
              </div>
              <div>
                <p className="text-xs font-bold text-white">{t.name}</p>
                <p className="text-[11px] text-gray-600">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-32 px-4 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-[11px] tracking-[0.25em] uppercase text-gray-600 font-semibold mb-3">Simple pricing</p>
        <h2 className="font-black tracking-tighter text-white"
          style={{ fontSize: "clamp(32px, 5vw, 56px)", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          Pay for what you use
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-5">
        {PRICING.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative rounded-3xl p-6"
            style={{
              background: plan.highlight
                ? "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(59,130,246,0.08))"
                : "rgba(255,255,255,0.02)",
              border: plan.highlight
                ? "1px solid rgba(139,92,246,0.3)"
                : "1px solid rgba(255,255,255,0.07)",
              boxShadow: plan.highlight ? "0 0 60px rgba(139,92,246,0.1)" : "none",
            }}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)" }} />
            )}
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="text-[10px] font-bold px-3 py-1 rounded-full"
                  style={{ background: "rgba(139,92,246,0.9)", color: "white" }}>
                  Most Popular
                </span>
              </div>
            )}

            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-600 mb-3">{plan.name}</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-black text-white">{plan.price}</span>
              <span className="text-xs text-gray-600 mb-1.5">/{plan.period}</span>
            </div>
            <p className="text-xs text-gray-500 mb-6">{plan.desc}</p>

            <ul className="space-y-2.5 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-xs text-gray-300">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(34,197,94,0.15)" }}>
                    <Zap size={9} style={{ color: "#22c55e" }} />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/wishlist">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer block text-center py-3 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: plan.highlight ? "white" : "rgba(255,255,255,0.06)",
                  color: plan.highlight ? "black" : "#9ca3af",
                  border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {plan.cta}
              </motion.span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-[11px] tracking-[0.25em] uppercase text-gray-600 font-semibold mb-3">Got questions?</p>
        <h2 className="font-black tracking-tighter text-white"
          style={{ fontSize: "clamp(28px, 4vw, 48px)", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          Answers right here
        </h2>
      </motion.div>

      <div className="space-y-2">
        {FAQS.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: openIdx === i ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${openIdx === i ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-white">{faq.q}</span>
              <motion.div animate={{ rotate: openIdx === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronRight size={15} className="text-gray-600" style={{ transform: "rotate(90deg)" }} />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {openIdx === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-5 pb-5">
                    <div className="h-px mb-4" style={{ background: "rgba(255,255,255,0.06)" }} />
                    <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-32 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto relative rounded-3xl overflow-hidden text-center p-16"
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(59,130,246,0.08), rgba(52,211,153,0.06))",
          border: "1px solid rgba(139,92,246,0.2)",
          boxShadow: "0 40px 100px rgba(139,92,246,0.1)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(59,130,246,0.3), transparent)" }} />

        {/* Glow orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)", filter: "blur(30px)" }} />

        <p className="text-[11px] tracking-[0.25em] uppercase text-purple-400 font-semibold mb-4 relative z-10">
          Start today
        </p>
        <h2 className="font-black tracking-tighter text-white mb-4 relative z-10"
          style={{ fontSize: "clamp(32px, 5vw, 56px)", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          Build your best work
        </h2>
        <p className="text-gray-400 text-sm mb-10 max-w-md mx-auto leading-relaxed relative z-10">
          Join thousands of builders using GrowthX to manage their work, grow their clients, and ship faster.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
          <Link href="/wishlist">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-black"
              style={{
                background: "white",
                color: "black",
                boxShadow: "0 8px 40px rgba(255,255,255,0.2)",
              }}
            >
              Get early access  <ArrowRight size={16} />
            </motion.span>
          </Link>
          <span className="text-xs text-gray-600">No credit card · Free forever plan</span>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t px-6 py-10" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.2))",
              border: "1px solid rgba(139,92,246,0.3)",
            }}>
            GX
          </div>
          <span className="text-sm font-black text-gray-400">GrowthX</span>
        </div>
        <p className="text-xs text-gray-700 text-center">
          © 2025 GrowthX. Built with Next.js, MongoDB, Clerk & Claude AI.
        </p>
        <div className="flex gap-5">
          {["Privacy", "Terms", "Help"].map((l) => (
            <a key={l} href="#" className="text-xs text-gray-600 hover:text-white transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        background: "#080808",
      }}
    >
      {/* Google font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900&display=swap');
      `}</style>

      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}