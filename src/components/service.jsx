import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Code2, Smartphone, Cpu, Database, GitBranch } from "lucide-react";
import backgroundVideo from "../assets/12813817_1920_1080_30fps.mp4";

/* ─── Services data (unchanged) ──────────────────────────────────── */
const services = [
  {
    title: "Full-Stack Development",
    icon: <GitBranch size={28} className="text-cyan-400" />,
    description:
      "End-to-end web app development using React.js, Node.js, and Angular. Integration of microservices, RESTful APIs, and JWT-based authentication.",
    note: "Digital workflow platform · EV fleet management system",
    colors: "from-cyan-400 to-blue-600",
  },
  {
    title: "Mobile Development",
    icon: (
      <div className="relative">
        <Smartphone size={28} className="text-orange-400" />
        <Cpu size={14} className="absolute -right-2 -bottom-2 text-purple-300" />
      </div>
    ),
    description:
      "Cross-platform apps built with Flutter and Kotlin. Performance optimization and native sensor integration.",
    note: "Memory game · Native Android apps",
    colors: "from-purple-400 to-indigo-600",
  },
  {
    title: "Information Systems Engineering",
    icon: (
      <div className="flex gap-2 items-center">
        <Database size={24} className="text-emerald-400" />
        <Code2 size={24} className="text-teal-400" />
      </div>
    ),
    description:
      "UML modeling and relational database design. Business software built with Symfony and PostgreSQL.",
    note: "ERD diagrams · Complex SQL queries",
    colors: "from-green-400 to-teal-600",
  },
];

/* ─── Color palette per card (unchanged logic) ──────────────────── */
const colorPalettes = [
  { glow: "rgba(6,182,212,0.18)",    accent: "#22d3ee", tag: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20" },
  { glow: "rgba(168,85,247,0.18)",   accent: "#c084fc", tag: "bg-purple-500/10 text-purple-300 border-purple-500/20" },
  { glow: "rgba(52,211,153,0.18)",   accent: "#34d399", tag: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
];

/* ─── Mouse-tracking spotlight card ─────────────────────────────── */
const ServiceCard = ({ service, index, onHover, onLeave }) => {
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: "50%", y: "50%" });
  const palette = colorPalettes[index % colorPalettes.length];

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({
      x: `${((e.clientX - rect.left) / rect.width) * 100}%`,
      y: `${((e.clientY - rect.top)  / rect.height) * 100}%`,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6, boxShadow: `0 28px 60px -12px ${palette.glow}` }}
      transition={{ delay: index * 0.13, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative group rounded-2xl overflow-hidden cursor-default"
    >
      {/* Gradient border shell */}
      <div
        className="absolute -inset-[1px] rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${palette.accent}55, transparent 60%, ${palette.accent}22)` }}
      />

      {/* Static low-opacity border always visible */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.07] pointer-events-none" />

      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(180px circle at ${spotlight.x} ${spotlight.y}, ${palette.glow}, transparent 70%)`,
        }}
      />

      {/* Card body */}
      <div className="relative z-10 flex flex-col items-center text-center p-8 h-full bg-white/[0.025] backdrop-blur-sm rounded-2xl">

        {/* Icon container */}
        <motion.div
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.3 }}
          className="mb-6 flex items-center justify-center w-14 h-14 rounded-xl"
          style={{
            background: `${palette.glow}`,
            boxShadow: `0 0 20px ${palette.glow}`,
            border: `1px solid ${palette.accent}30`,
          }}
        >
          {service.icon}
        </motion.div>

        {/* Title */}
        <h3
          className="text-lg font-bold mb-3 leading-snug tracking-tight"
          style={{ color: palette.accent }}
        >
          {service.title}
        </h3>

        {/* Note tag */}
        <span
          className={`inline-block text-[10px] font-semibold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border mb-5 ${palette.tag}`}
        >
          {service.note}
        </span>

        {/* Divider */}
        <div
          className="w-8 h-px mb-5 rounded-full mx-auto"
          style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}80, transparent)` }}
        />

        {/* Description */}
        <p className="text-white/45 text-sm leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};

/* ─── Main Section ───────────────────────────────────────────────── */
const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative min-h-screen py-28 px-5 sm:px-8 overflow-hidden bg-[#080c14]"
    >
      {/* ── Ambient background glows ────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-600/8 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full bg-blue-700/8 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-purple-900/6 blur-[100px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(6,182,212,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6,182,212,0.8) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Video background (commented-out logic preserved) */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {/* <video className="w-full h-full object-cover" src={backgroundVideo}
          autoPlay loop muted playsInline preload="auto"
          style={{ pointerEvents:"none", opacity:0.4, filter:"brightness(150%) contrast(110%)", transform:"translateZ(0)" }}
        /> */}
        <div className="absolute inset-0 bg-black/80 mix-blend-overlay pointer-events-none" />
      </div>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section heading */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[10px] tracking-[0.3em] uppercase text-cyan-400/60 font-semibold mb-4"
          >
            What I offer
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white cursor-default select-none"
          >
            <span
              className="text-transparent bg-clip-text relative group"
              style={{ backgroundImage: "linear-gradient(90deg,#22d3ee,#60a5fa)", filter: "drop-shadow(0 0 16px rgba(6,182,212,0.35))" }}
            >
              My
            </span>{" "}
            <span className="text-white">Services</span>
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 mx-auto w-16 h-[2px] rounded-full origin-center"
            style={{ background: "linear-gradient(90deg,#22d3ee,#60a5fa)" }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 text-white/35 text-sm max-w-sm mx-auto"
          >
            A snapshot of what I build and how I can help your project succeed.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;