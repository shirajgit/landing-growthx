"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2, Loader2, User, Mail, MessageSquare } from "lucide-react";

/* ── Floating orb particle ── */
function Orb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: "blur(60px)" }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 5 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

/* ── Animated counter ── */
function Counter({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 60);
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(t); }
      else setVal(start);
    }, 16);
    return () => clearInterval(t);
  }, [target]);
  return <>{val.toLocaleString()}</>;
}

/* ── Magnetic tilt card ── */
function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [4, -4]);
  const rotateY = useTransform(x, [-100, 100], [-4, 4]);

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current!.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }
  function onMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Fancy input ── */
function FancyInput({
  icon: Icon, name, type = "text", placeholder, value, onChange, disabled,
}: {
  icon: React.ElementType; name: string; type?: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; disabled: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative group">
      {/* glow ring */}
      <motion.div
        animate={{ opacity: focused ? 1 : 0 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: "0 0 0 1.5px rgba(139,92,246,0.5), 0 0 20px rgba(139,92,246,0.15)" }}
      />
      <div className="relative flex items-center">
        <div className="absolute left-4 flex items-center pointer-events-none">
          <Icon size={15} style={{ color: focused ? "#a78bfa" : "#4b5563", transition: "color 0.2s" }} />
        </div>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required
          style={{
            width: "100%",
            background: focused ? "rgba(139,92,246,0.04)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${focused ? "rgba(139,92,246,0.35)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: "14px",
            color: "white",
            fontSize: "14px",
            padding: "14px 16px 14px 42px",
            outline: "none",
            transition: "all 0.2s",
          }}
        />
      </div>
    </div>
  );
}

/* ── Fancy textarea ── */
function FancyTextarea({
  name, placeholder, value, onChange, disabled,
}: {
  name: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; disabled: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <motion.div
        animate={{ opacity: focused ? 1 : 0 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: "0 0 0 1.5px rgba(139,92,246,0.5), 0 0 20px rgba(139,92,246,0.15)" }}
      />
      <div className="relative flex items-start">
        <div className="absolute left-4 top-4 pointer-events-none">
          <MessageSquare size={15} style={{ color: focused ? "#a78bfa" : "#4b5563", transition: "color 0.2s" }} />
        </div>
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          rows={4}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: focused ? "rgba(139,92,246,0.04)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${focused ? "rgba(139,92,246,0.35)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: "14px",
            color: "white",
            fontSize: "14px",
            padding: "14px 16px 14px 42px",
            outline: "none",
            resize: "none",
            transition: "all 0.2s",
            fontFamily: "inherit",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function WishlistPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  const isReady = formData.name.trim() && formData.email.trim();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#080808", fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');`}</style>

      {/* ── Orbs ── */}
      <Orb x="5%" y="10%" size={400} color="rgba(139,92,246,0.12)" delay={0} />
      <Orb x="60%" y="60%" size={350} color="rgba(59,130,246,0.1)" delay={1.5} />
      <Orb x="80%" y="5%" size={250} color="rgba(52,211,153,0.07)" delay={3} />

      {/* ── Background grid ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
      }} />

      {/* ── Noise grain overlay ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "128px" }} />

      {/* ── Left decorative text (desktop only) ── */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8">
        {["EARLY", "ACCESS", "2025"].map((word, i) => (
          <motion.p
            key={word}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.06, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.3em", color: "white", writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {word}
          </motion.p>
        ))}
      </div>

      {/* ── Stats strip (desktop) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8"
      >
        {[
          { label: "on waitlist", value: 847 },
          { label: "avg. wait days", value: 14 },
          { label: "early perks", value: 3 },
        ].map(({ label, value }, i) => (
          <div key={label} className="text-center">
            <p className="text-xl font-black text-white tabular-nums">
              <Counter target={value} />
            </p>
            <p style={{ fontSize: "10px", color: "#4b5563", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>{label}</p>
          </div>
        ))}
      </motion.div>

      {/* ── Main card ── */}
      <TiltCard style={{ perspective: "1000px", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full"
          style={{
            maxWidth: "460px",
            width: "100%",
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "28px",
            padding: "40px",
            boxShadow: "0 40px 120px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Top shimmer line */}
          <div className="absolute top-0 left-8 right-8 h-px" style={{
            background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.6), rgba(96,165,250,0.4), transparent)",
          }} />

          {/* Corner glow */}
          <div className="absolute top-0 left-0 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />

          <AnimatePresence mode="wait">
            {success ? (
              /* ── Success ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center py-8"
              >
                {/* Pulse ring */}
                <div className="relative flex items-center justify-center mb-6 mx-auto" style={{ width: 72, height: 72 }}>
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: "rgba(52,211,153,0.2)" }}
                  />
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)" }}>
                    <CheckCircle2 size={28} style={{ color: "#34d399" }} />
                  </div>
                </div>

                <h2 className="text-2xl font-black text-white mb-2 tracking-tight">You're in! 🎉</h2>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  We'll send you an email the moment GrowthX is ready. <br />
                  Sit tight — it won't be long.
                </p>

                {/* Perks */}
                <div className="space-y-2 mb-8 text-left">
                  {[
                    ["⚡", "Priority access before public launch"],
                    ["🎁", "3 months Pro free for early members"],
                    ["🤝", "Direct line to the founder"],
                  ].map(([icon, text]) => (
                    <div key={text} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <span style={{ fontSize: "15px" }}>{icon}</span>
                      <span style={{ fontSize: "13px", color: "#9ca3af" }}>{text}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => setSuccess(false)}
                  className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                  Add another email →
                </button>
              </motion.div>
            ) : (
              /* ── Form ── */
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                  style={{
                    background: "rgba(139,92,246,0.1)",
                    border: "1px solid rgba(139,92,246,0.25)",
                    color: "#a78bfa",
                  }}
                >
                  <Sparkles size={11} />
                  Limited early access spots
                </motion.div>

                {/* Logo + heading */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black"
                      style={{
                        background: "linear-gradient(135deg, rgba(139,92,246,0.4), rgba(59,130,246,0.3))",
                        border: "1px solid rgba(139,92,246,0.4)",
                        color: "white",
                      }}>GX</div>
                    <span className="text-sm font-black tracking-tight text-gray-400">GrowthX</span>
                  </div>

                  <h1 className="font-black text-white tracking-tighter mb-2" style={{ fontSize: "clamp(26px, 5vw, 32px)", lineHeight: 1.15 }}>
                    Join the wishlist<span style={{ color: "#a78bfa" }}>.</span>
                  </h1>
                  <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                    Be the first to access GrowthX and unlock exclusive early-member perks.
                  </p>
                </motion.div>

                {/* Fields */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="space-y-3 mb-5"
                >
                  <FancyInput icon={User} name="name" placeholder="Your name" value={formData.name} onChange={handleChange} disabled={loading} />
                  <FancyInput icon={Mail} name="email" type="email" placeholder="Your email" value={formData.email} onChange={handleChange} disabled={loading} />
                  <FancyTextarea name="message" placeholder="What do you expect from GrowthX? (optional)" value={formData.message} onChange={handleChange} disabled={loading} />
                </motion.div>

                {/* Submit */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !isReady}
                    whileHover={isReady && !loading ? { scale: 1.02 } : {}}
                    whileTap={isReady && !loading ? { scale: 0.97 } : {}}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-black transition-all relative overflow-hidden"
                    style={{
                      background: isReady ? "white" : "rgba(255,255,255,0.06)",
                      color: isReady ? "black" : "#374151",
                      cursor: !isReady || loading ? "not-allowed" : "pointer",
                      boxShadow: isReady ? "0 8px 32px rgba(255,255,255,0.12)" : "none",
                    }}
                  >
                    {/* shimmer sweep on hover */}
                    {isReady && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)" }}
                      />
                    )}
                    {loading ? (
                      <><Loader2 size={15} className="animate-spin" /> Joining…</>
                    ) : (
                      <>Join the wishlist <ArrowRight size={15} /></>
                    )}
                  </motion.button>

                  <p className="text-center mt-4" style={{ fontSize: "11px", color: "#374151" }}>
                    No spam · Unsubscribe anytime · 100% free
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </TiltCard>
    </div>
  );
}