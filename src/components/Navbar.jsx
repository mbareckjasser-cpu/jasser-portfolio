import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import throttle from "lodash.throttle";

const NAV_LINKS = [
  { label: "Home",       href: "#Home" },
  { label: "About Me",   href: "#aboutme" },
  { label: "Services",   href: "#Services" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#Projects" },
  { label: "Contact",    href: "#ContactPage" },
];

/* ─── Scroll hook (unchanged) ─── */
const useScroll = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = throttle(() => { setScrolled(window.scrollY > 1); }, 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrolled;
};

/* ─── Active-link tracker (unchanged) ─── */
const useActiveLink = () => {
  const [active, setActive] = useState("#Home");
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); }); },
      { threshold: 0.4 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return active;
};

/* ─── Main component ─── */
export default function Navbar() {
  const scrolled = useScroll();
  const active   = useActiveLink();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════
          DESKTOP NAV BAR
      ══════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-[999]
          transition-all duration-500 ease-out
          ${scrolled
            ? [
                "bg-[#070810]/75",
                "backdrop-blur-2xl",
                "border-b border-white/[0.055]",
                "shadow-[0_1px_0_rgba(34,211,238,0.10),0_16px_48px_-12px_rgba(0,0,0,0.7)]",
              ].join(" ")
            : "bg-transparent backdrop-blur-none border-b border-transparent"}
        `}
      >
        {/* Inner container */}
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-[62px] flex items-center justify-between">

          {/* ── Logo ── */}
          <motion.a
            href="#Home"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="relative group flex items-center gap-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 rounded"
            aria-label="Go to top"
          >
            {/* Halo */}
            <span
              aria-hidden
              className="absolute -inset-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                bg-cyan-500/8 blur-xl pointer-events-none"
            />
            <span className="relative text-[1.65rem] font-black tracking-tight leading-none select-none
              bg-gradient-to-br from-cyan-300 via-cyan-400 to-blue-500
              bg-clip-text text-transparent
              drop-shadow-[0_0_14px_rgba(34,211,238,0.45)]">
              J
            </span>
            <span className="relative text-[1.65rem] font-black tracking-tight leading-none text-white/30 select-none">
              .dev
            </span>
          </motion.a>

          {/* ── Desktop links ── */}
          <ul className="hidden md:flex items-center gap-0.5" role="navigation">
            {NAV_LINKS.map(({ label, href }, i) => {
              const isActive = active === href;
              return (
                <li key={href}>
                  <motion.a
                    href={href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i + 0.25, duration: 0.45, ease: "easeOut" }}
                    className={`
                      relative px-3.5 py-2 rounded-lg
                      text-[10.5px] font-semibold uppercase tracking-[0.13em]
                      transition-colors duration-250 group outline-none
                      focus-visible:ring-2 focus-visible:ring-cyan-500/50
                      ${isActive
                        ? "text-cyan-300"
                        : "text-white/45 hover:text-white/90"}
                    `}
                  >
                    {/* Hover / active bg pill */}
                    <span
                      className={`
                        absolute inset-0 rounded-lg transition-all duration-300
                        ${isActive
                          ? "bg-cyan-500/[0.08] ring-1 ring-inset ring-cyan-500/[0.15]"
                          : "bg-transparent group-hover:bg-white/[0.035]"}
                      `}
                    />
                    {/* Label */}
                    <span className="relative">{label}</span>
                    {/* Animated underline — Vercel style */}
                    <span
                      className={`
                        absolute bottom-1 left-1/2 -translate-x-1/2 h-[1.5px] rounded-full
                        bg-gradient-to-r from-cyan-400 to-blue-400
                        transition-all duration-350 ease-out
                        ${isActive
                          ? "w-5 opacity-100"
                          : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-50"}
                      `}
                    />
                  </motion.a>
                </li>
              );
            })}

            {/* ── Hire Me CTA ── */}
            <li className="ml-4">
              <motion.a
                href="#ContactPage"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.72, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="
                  group relative inline-flex items-center gap-1.5
                  px-5 py-2 rounded-full overflow-hidden
                  text-[10.5px] font-bold uppercase tracking-[0.15em]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60
                  transition-all duration-300
                "
                style={{ isolation: 'isolate' }}
              >
                {/* Glass base */}
                <span
                  className="absolute inset-0 rounded-full transition-opacity duration-300
                    bg-gradient-to-r from-cyan-400/[0.12] to-blue-500/[0.12]
                    ring-1 ring-inset ring-cyan-400/[0.28]
                    group-hover:from-cyan-400/[0.0] group-hover:to-blue-500/[0.0]"
                />
                {/* Solid fill on hover */}
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
                    transition-all duration-350 ease-out
                    bg-gradient-to-r from-cyan-400 to-blue-500"
                />
                {/* Glow */}
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
                    transition-opacity duration-350 blur-md
                    bg-gradient-to-r from-cyan-400/40 to-blue-500/40 -z-10"
                />
                {/* Text — inverts on hover */}
                <span className="relative z-10 text-cyan-300 group-hover:text-[#070810] transition-colors duration-300">
                  Hire&nbsp;me
                </span>
                {/* Dot indicator */}
                <span className="relative z-10 w-1 h-1 rounded-full bg-cyan-400 group-hover:bg-[#070810] transition-colors duration-300" />
              </motion.a>
            </li>
          </ul>

          {/* ── Mobile hamburger ── */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.88 }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="
              md:hidden relative w-9 h-9 flex items-center justify-center rounded-xl
              text-white/60 hover:text-white/90
              bg-white/[0.035] hover:bg-white/[0.07]
              border border-white/[0.07] hover:border-white/[0.14]
              transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50
            "
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              {isOpen ? <FiX size={17} /> : <FiMenu size={17} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Scrolled bottom hairline glow */}
        <motion.div
          animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 h-px origin-center
            bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
        />
      </motion.nav>

      {/* ══════════════════════════════════════
          MOBILE MENU PANEL
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-[6px] md:hidden"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1,  y: 0,   scale: 1   }}
              exit={{   opacity: 0,  y: -16,  scale: 0.96 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="
                fixed top-[70px] left-3 right-3 z-[999] md:hidden
                rounded-2xl overflow-hidden
                border border-white/[0.07]
                shadow-[0_32px_80px_-16px_rgba(0,0,0,0.85),0_0_0_1px_rgba(34,211,238,0.07)]
              "
              style={{
                background: 'rgba(7, 8, 16, 0.88)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
              }}
            >
              {/* Panel top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px
                bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent" />

              {/* Panel ambient glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.06) 0%, transparent 70%)' }} />

              <ul className="flex flex-col py-3.5 px-2">
                {NAV_LINKS.map(({ label, href }, i) => {
                  const isActive = active === href;
                  return (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.28, ease: "easeOut" }}
                    >
                      <a
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={`
                          flex items-center justify-between
                          px-4 py-3 mx-0.5 rounded-xl
                          text-[10.5px] font-semibold uppercase tracking-[0.15em]
                          transition-all duration-200 outline-none
                          focus-visible:ring-2 focus-visible:ring-cyan-500/50
                          ${isActive
                            ? "text-cyan-300 bg-cyan-500/[0.08] ring-1 ring-inset ring-cyan-500/[0.14]"
                            : "text-white/45 hover:text-white/85 hover:bg-white/[0.04]"}
                        `}
                      >
                        <span>{label}</span>
                        {isActive && (
                          <span className="flex items-center gap-1.5">
                            <span className="w-1 h-4 rounded-full bg-cyan-400/60" />
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400
                              shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
                          </span>
                        )}
                      </a>
                    </motion.li>
                  );
                })}

                {/* Mobile CTA */}
                <motion.li
                  className="px-1 pb-1 pt-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.04 + 0.05, duration: 0.3 }}
                >
                  <div className="h-px mb-3.5
                    bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                  <a
                    href="#ContactPage"
                    onClick={() => setIsOpen(false)}
                    className="
                      group relative block w-full text-center py-3.5 rounded-xl overflow-hidden
                      text-[10.5px] font-bold uppercase tracking-[0.16em]
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60
                      transition-all duration-300
                    "
                    style={{ isolation: 'isolate' }}
                  >
                    {/* Glass base */}
                    <span className="absolute inset-0 rounded-xl
                      bg-gradient-to-r from-cyan-400/[0.11] to-blue-500/[0.11]
                      ring-1 ring-inset ring-cyan-400/[0.25]
                      transition-opacity duration-300 group-hover:opacity-0" />
                    {/* Solid fill on hover */}
                    <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                      bg-gradient-to-r from-cyan-400 to-blue-500" />
                    <span className="relative z-10 text-cyan-300 group-hover:text-[#070810] transition-colors duration-300">
                      Hire&nbsp;me
                    </span>
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}