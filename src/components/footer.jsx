import { motion } from 'framer-motion';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const NAV_LINKS = ["Home", "About Me", "Service", "Skills", "Projects", "Contact"];
const SOCIAL_ICONS = [FaLinkedinIn, FaFacebookF, FaInstagram, FaTwitter];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#080c14] text-white">

      {/* ── Top glow separator ─────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent blur-sm" />

      {/* ── Ambient glow blobs ─────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-12 left-1/4 w-72 h-72 rounded-full bg-cyan-600/6 blur-[100px]" />
        <div className="absolute -bottom-8 right-1/4 w-60 h-60 rounded-full bg-blue-700/6 blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-14 flex flex-col items-center gap-10">

        {/* ── Logo / Brand ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-1"
        >
          <span
            className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg,#22d3ee,#60a5fa)", filter: "drop-shadow(0 0 10px rgba(6,182,212,0.35))" }}
          >
            J.M
          </span>
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/25 font-medium">
            Full Stack Developer
          </p>
        </motion.div>

        {/* ── Divider ────────────────────────────────────────────────── */}
        <div className="w-px h-6 bg-gradient-to-b from-white/10 to-transparent" />

        {/* ── Social icons ───────────────────────────────────────────── */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {SOCIAL_ICONS.map((Icon, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="
                flex items-center justify-center w-9 h-9 rounded-xl
                bg-white/[0.04] border border-white/[0.08]
                text-white/40 hover:text-cyan-300
                hover:bg-cyan-500/10 hover:border-cyan-500/30
                hover:shadow-[0_0_16px_rgba(6,182,212,0.2)]
                transition-colors duration-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60
              "
            >
              <Icon size={14} />
            </motion.a>
          ))}
        </motion.div>

        {/* ── Navigation links ───────────────────────────────────────── */}
        <motion.nav
          className="flex flex-wrap justify-center gap-x-6 gap-y-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {NAV_LINKS.map((text, index) => (
            <a
              key={index}
              href="#Home"
              className="relative text-[11px] font-semibold uppercase tracking-[0.15em] text-white/35 hover:text-white transition-colors duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 rounded"
            >
              {text}
              <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all duration-400 group-hover:w-full" />
            </a>
          ))}
        </motion.nav>

        {/* ── Thin separator ─────────────────────────────────────────── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

        {/* ── Copyright ──────────────────────────────────────────────── */}
        <motion.p
          className="text-[10px] tracking-[0.2em] uppercase text-white/20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          © {new Date().getFullYear()} Jasser MBareck · All Rights Reserved
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;