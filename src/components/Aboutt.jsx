import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import photo from "../assets/phprobl.png";
import {
  FaLinkedin, FaGithub, FaWhatsapp, FaInstagram,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

/* ─── Typing animation (logic unchanged) ──────────────────────────── */
const NameAnimated = () => {
  const name = "Full Stack MERN Developer";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (index < name.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + name.charAt(index));
        setIndex(index + 1);
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [index, name]);

  return (
    <span
      className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent font-bold"
      style={{ filter: "drop-shadow(0 0 10px rgba(6,182,212,0.5))" }}
    >
      {displayedText}
      <motion.span
        className="inline-block ml-0.5 w-[2px] h-[1.1em] align-middle bg-cyan-400 rounded-full"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
      />
    </span>
  );
};

/* ─── Social icon button ───────────────────────────────────────────── */
const SocialBtn = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    whileHover={{ scale: 1.15, y: -2 }}
    whileTap={{ scale: 0.9 }}
    className="
      relative flex items-center justify-center w-10 h-10 rounded-xl
      bg-white/[0.04] border border-white/[0.08]
      text-white/50 hover:text-cyan-300
      hover:bg-cyan-500/10 hover:border-cyan-500/30
      hover:shadow-[0_0_16px_rgba(6,182,212,0.2)]
      transition-all duration-300
      focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60
    "
  >
    <Icon size={17} />
  </motion.a>
);

/* ─── Floating image with mouse parallax ──────────────────────────── */
const FloatingImage = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });
  const rotateY = useTransform(springX, [-120, 120], [-6, 6]);
  const rotateX = useTransform(springY, [-120, 120], [5, -5]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top  - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      className="relative w-fit mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient glow behind image */}
      <div className="absolute inset-0 rounded-[32px] bg-cyan-500/20 blur-3xl scale-110 pointer-events-none" />

      {/* Gradient border ring */}
      <div
        className="absolute -inset-[2px] rounded-[32px] pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(6,182,212,0.6) 0%, rgba(59,130,246,0.3) 50%, rgba(6,182,212,0.1) 100%)",
        }}
      />

      {/* Floating bob */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <motion.img
          src={photo}
          alt="Jasser Mbareck"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="
            relative z-10
            w-[180px] h-[240px] md:w-[280px] md:h-[380px]
            object-cover object-center rounded-[30px]
            shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          "
          initial={{ scale: 0.92, opacity: 0, rotate: -3 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          style={{ rotate: -3 }}
        />
      </motion.div>

      {/* Corner accent dots */}
      <div className="absolute -top-3 -right-3 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
      <div className="absolute -bottom-3 -left-3 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
    </motion.div>
  );
};

/* ─── Main Component ───────────────────────────────────────────────── */
export function About() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollEffect = scrollY / 0; // original logic preserved

  const textVariants = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080c14] text-white px-5 py-24 md:py-0">

      {/* ── Ambient background ──────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -left-24 w-80 h-80 rounded-full bg-cyan-600/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-blue-700/10 blur-[120px]" />
      </div>

      {/* ── Two-column layout ───────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* ── Image column ────────────────────────────────────────────── */}
        <div className="flex justify-center md:justify-end">
          <FloatingImage />
        </div>

        {/* ── Text column ─────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col items-center md:items-start text-center md:text-left"
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.1, delayChildren: 0.35 }}
        >
          {/* Eyebrow */}
          <motion.p
            variants={textVariants}
            transition={{ duration: 0.5 }}
            className="text-[11px] tracking-[0.28em] uppercase text-cyan-400/60 font-semibold mb-3"
          >
            Portfolio · 2025
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={textVariants}
            transition={{ duration: 0.55 }}
            className="text-3xl md:text-[2.6rem] font-extrabold leading-tight tracking-tight text-white mb-1"
          >
            Hi, It's{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #22d3ee, #60a5fa)",
                filter: "drop-shadow(0 0 14px rgba(6,182,212,0.4))",
              }}
            >
              Jasser Mbareck
            </span>
          </motion.h1>

          {/* Typing role */}
          <motion.h2
            variants={textVariants}
            transition={{ duration: 0.55 }}
            className="text-base md:text-xl font-medium text-white/60 mt-2 mb-5 min-h-[1.8em]"
          >
            I'm a <NameAnimated />
          </motion.h2>

          {/* Divider */}
          <motion.div
            variants={textVariants}
            transition={{ duration: 0.45 }}
            className="w-12 h-px bg-gradient-to-r from-cyan-500 to-transparent mb-5 mx-auto md:mx-0"
          />

          {/* Bio */}
          <motion.p
            variants={textVariants}
            transition={{ duration: 0.55 }}
            className="text-sm md:text-[0.93rem] text-white/45 leading-relaxed max-w-md"
          >
            Passionate about modern web development, I use React, Node.js, MongoDB, and
            more to build interactive and high-performance experiences. I enjoy solving
            complex problems and turning them into efficient digital solutions.
          </motion.p>

          {/* Social icons */}
          <motion.div
            variants={textVariants}
            transition={{ duration: 0.45 }}
            className="flex gap-3 mt-8"
          >
            <SocialBtn href="https://www.linkedin.com/in/jassermbareck" icon={FaLinkedin} label="LinkedIn" />
            <SocialBtn href="https://github.com/ton_github"              icon={FaGithub}   label="GitHub" />
            <SocialBtn href="https://wa.me/216xxxxxxxx"                  icon={FaWhatsapp} label="WhatsApp" />
            <SocialBtn href="https://instagram.com/ton_instagram"        icon={FaInstagram} label="Instagram" />
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={textVariants}
            transition={{ duration: 0.45 }}
            className="mt-8"
          >
            <motion.a
              href="#ContactPage"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="
                relative group inline-flex items-center gap-2
                px-7 py-3 rounded-full
                font-semibold text-sm tracking-wide text-cyan-950
                bg-gradient-to-r from-cyan-400 to-blue-400
                shadow-[0_0_20px_rgba(6,182,212,0.35)]
                hover:shadow-[0_0_36px_rgba(6,182,212,0.55)]
                transition-shadow duration-300 overflow-hidden
              "
            >
              {/* Shimmer sweep */}
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                  transition-transform duration-700 ease-out
                  bg-gradient-to-r from-transparent via-white/30 to-transparent
                  skew-x-12 pointer-events-none"
              />
              <span className="relative">Let's Collaborate</span>
              <FiArrowUpRight
                size={16}
                className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          </motion.div>

          {/* Small stat strip */}
          <motion.div
            variants={textVariants}
            transition={{ duration: 0.5 }}
            className="mt-10 flex gap-8 text-center md:text-left"
          >
            {[
              { value: "2+",  label: "Years exp." },
              { value: "20+", label: "Projects" },
              { value: "10+", label: "Clients" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-xl font-extrabold text-white leading-none">{value}</span>
                <span className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;