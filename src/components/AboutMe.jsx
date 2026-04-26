import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import myImage from '../assets/secondphpro.png';
import "../css/animations.css";
import { FaHandshake } from 'react-icons/fa';
import { HiOutlineDocumentDownload } from 'react-icons/hi';

/* ─── Logic unchanged ─────────────────────────────────────────────── */
const AboutMe = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* Stagger helper */
  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
    viewport:   { once: true, amount: 0.2 },
  });

  return (
    <div className="relative w-full overflow-hidden bg-[#080c14] text-white">

      {/* ── Ambient background glows ──────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 w-[480px] h-[480px] rounded-full bg-cyan-600/8 blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-700/8 blur-[110px]" />
      </div>

      {/* ── Main motion wrapper (isMobile logic preserved) ────────────── */}
      <motion.div
        className="relative z-10 w-full min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 px-6 md:px-16 lg:px-24 py-24"
        initial={{ opacity: 0, scale: isMobile ? 0.92 : 1, y: isMobile ? 40 : 0 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >

        {/* ════════════════════════════════════
            TEXT COLUMN
        ════════════════════════════════════ */}
        <div className="w-full md:w-1/2 max-w-xl flex flex-col items-center md:items-start text-center md:text-left">

          {/* Eyebrow */}
          <motion.p {...fadeUp(0)} className="text-[10px] tracking-[0.3em] uppercase text-cyan-400/60 font-semibold mb-3">
            Who I am
          </motion.p>

          {/* Section title */}
          <motion.h2 {...fadeUp(0.05)} className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2">
            About{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg,#22d3ee,#60a5fa)", filter: "drop-shadow(0 0 12px rgba(6,182,212,0.4))" }}
            >
              Me
            </span>
          </motion.h2>

          {/* Accent rule */}
          <motion.div {...fadeUp(0.1)} className="w-10 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mb-7 mx-auto md:mx-0" />

          {/* Para 1 */}
          <motion.p
            className="text-sm md:text-[0.93rem] text-white/55 leading-[1.85] mb-5"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="text-cyan-300 font-semibold">Hello! I'm </span>a detail-oriented and service-driven web developer with a solid foundation in full-stack development. I hold a Bachelor's degree in Information Technologies, specializing in Information Systems Development. My passion lies in building clean, modern, and impactful digital experiences that solve real-world problems for users and businesses.
          </motion.p>

          {/* Para 2 */}
          <motion.p
            className="text-sm md:text-[0.93rem] text-white/55 leading-[1.85] mb-9"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            With hands-on experience in{" "}
            <span className="text-cyan-300 font-semibold">ReactJS, Node.js, Express, and MongoDB</span>, I build scalable and responsive web applications tailored to user needs. As a certified{" "}
            <span className="text-cyan-300 font-semibold">Scrum Master</span>, I embrace agile methodologies, promoting clear communication, efficient sprint planning, and iterative delivery of high-value features.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              {
                href: "#contact",
                icon: <FaHandshake size={16} />,
                text: "Contact Me",
                primary: true,
              },
              {
                href: "/CV.pdf",
                download: true,
                icon: <HiOutlineDocumentDownload size={17} />,
                text: "Download Resume",
                primary: false,
              },
            ].map(({ href, icon, text, download, primary }, i) => (
              <motion.a
                key={i}
                href={href}
                download={download}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`
                  relative inline-flex items-center justify-center gap-2
                  px-6 py-2.5 rounded-full text-sm font-semibold
                  overflow-hidden group transition-shadow duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60
                  ${primary
                    ? "text-cyan-950 bg-gradient-to-r from-cyan-400 to-blue-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_32px_rgba(6,182,212,0.5)]"
                    : "text-white/70 border border-white/[0.12] bg-white/[0.03] backdrop-blur-sm hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/[0.06] hover:shadow-[0_0_16px_rgba(6,182,212,0.15)]"
                  }
                `}
              >
                {/* Shimmer sweep (primary only) */}
                {primary && (
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out
                      bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none"
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {icon}
                  {text}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ════════════════════════════════════
            IMAGE COLUMN
        ════════════════════════════════════ */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-[420px] md:h-[420px]">

            {/* Outer glow ring */}
            <div className="absolute -inset-[3px] rounded-2xl pointer-events-none"
              style={{ background: "linear-gradient(135deg,rgba(6,182,212,0.55),rgba(59,130,246,0.25),rgba(6,182,212,0.08))" }}
            />

            {/* Ambient glow blob */}
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/15 blur-2xl scale-110 pointer-events-none" />

            {/* GIF background (original logic/url preserved) */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center rounded-2xl z-0"
              style={{
                backgroundImage: `url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExanJ1dnB2ZWg3bmtudnJtMXQ5NnhsdTczdWcyd3R3cG4wNGh2OXFyYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eKsk2j4bU2So7TTBHq/giphy.gif')`,
                animation: 'borderGlow 2s infinite',
                borderRadius: '1rem',
              }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 0.25, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            />

            {/* Floating image */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="relative z-10 w-full h-full"
            >
              <motion.img
                src={myImage}
                alt="Jasser Mbareck"
                className="w-full h-full object-contain rounded-2xl drop-shadow-[0_20px_48px_rgba(0,0,0,0.7)]"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.3 }}
              />
            </motion.div>

            {/* Corner accent dots */}
            <div className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
            <div className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.9)]" />
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default AboutMe;