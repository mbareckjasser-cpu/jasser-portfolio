"use client";
import { FiExternalLink, FiGithub, FiPlay } from "react-icons/fi";
import clsx from "clsx";
import React, { useEffect, useRef, useState, useMemo, memo } from "react";
import SparklesCore from './SparklesCore.tsx';
import projectVideo from "../assets/project.mp4";
import { motion } from "framer-motion";

/* ─── Data (unchanged) ──────────────────────────────────────────── */
const projects = [
  {
    title: "Plateforme de Formation",
    description: "Plateforme d'apprentissage développée avec React.js et Node.js.",
    link: "https://formation-tunisie-demo.com",
    github: "https://github.com/jassermb/formation-tunisie",
    video: projectVideo,
    tag: "EdTech",
  },
  {
    title: "Véhicule Électrique",
    description: "Site de consultation de véhicules électriques avec Angular et Node.js.",
    link: "https://vehicule-electrique-demo.com",
    github: "https://github.com/jassermb/vehicule-electrique",
    video: projectVideo,
    tag: "Angular",
  },
  {
    title: "Jeu de Mémoire",
    description: "Application mobile de jeu de mémoire développée avec Flutter.",
    link: "https://jeu-memoire-demo.com",
    github: "https://github.com/jassermb/jeu-memoire-flutter",
    video: projectVideo,
    tag: "Flutter",
  },
  {
    title: "Plateforme E-commerce",
    description: "E-commerce complet avec auth, gestion produits et paiement intégré.",
    link: "https://ecommerce-demo.com",
    github: "https://github.com/jassermb/ecommerce-platform",
    video: projectVideo,
    tag: "Full Stack",
  },
  {
    title: "Digitalisation Workflow",
    description: "Digitalisation du workflow des demandes avec React.js, Node.js et MySQL.",
    link: "https://workflow-demandes-demo.com",
    github: "https://github.com/jassermb/workflow-demandes",
    video: projectVideo,
    tag: "Workflow",
  },
];

/* ─── Tag color map ─────────────────────────────────────────────── */
const TAG_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  EdTech:     { bg: "rgba(6,182,212,0.1)",   border: "rgba(6,182,212,0.3)",   text: "#67e8f9" },
  Angular:    { bg: "rgba(239,68,68,0.1)",    border: "rgba(239,68,68,0.3)",   text: "#fca5a5" },
  Flutter:    { bg: "rgba(99,102,241,0.1)",   border: "rgba(99,102,241,0.3)",  text: "#c4b5fd" },
  "Full Stack":{ bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.3)",  text: "#6ee7b7" },
  Workflow:   { bg: "rgba(251,191,36,0.1)",   border: "rgba(251,191,36,0.3)",  text: "#fde68a" },
};

/* ─── Project Card ──────────────────────────────────────────────── */
const ProjectCard = memo(({ proj, idx }: { proj: typeof projects[0]; idx: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const tagColor = TAG_COLORS[proj.tag] ?? TAG_COLORS["EdTech"];

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <li
      className="relative w-[88vw] sm:w-[340px] md:w-[360px] max-w-[400px] shrink-0 rounded-2xl group cursor-pointer outline-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      aria-label={`Project: ${proj.title}`}
      style={{
        transform: isHovered ? "translateY(-5px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease",
        boxShadow: isHovered
          ? "0 20px 56px rgba(0,0,0,0.55), 0 0 30px rgba(34,211,238,0.07)"
          : "0 4px 24px rgba(0,0,0,0.35)",
      }}
    >
      {/* Gradient border on hover */}
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none z-10 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: "linear-gradient(135deg, rgba(34,211,238,0.45) 0%, rgba(99,102,241,0.2) 50%, transparent 100%)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      {/* Static border */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.07] pointer-events-none z-10" />

      {/* Top accent */}
      <div
        className="absolute top-0 left-10 right-10 h-px z-20 transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0, background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.6), transparent)" }}
      />

      {/* Card body */}
      <div
        className="relative flex flex-col h-full rounded-2xl overflow-hidden"
        style={{ background: "linear-gradient(160deg, rgba(13,16,28,0.98) 0%, rgba(9,11,20,0.99) 100%)", backdropFilter: "blur(24px)" }}
      >
        {/* Video */}
        <div className="relative overflow-hidden bg-black/50" style={{ aspectRatio: "16/9" }}>
          <video
            ref={videoRef}
            src={proj.video}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedMetadata={() => setVideoLoaded(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{ transform: isHovered ? "scale(1.04)" : "scale(1)" }}
          />

          {/* Video gradient overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-400"
            style={{
              background: "linear-gradient(to top, rgba(9,11,20,0.85) 0%, rgba(9,11,20,0.2) 50%, transparent 100%)",
              opacity: isHovered ? 1 : 0.6,
            }}
          />

          {/* Play indicator */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-350"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <div
              className="flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-350"
              style={{
                background: "rgba(34,211,238,0.18)",
                border: "1px solid rgba(34,211,238,0.45)",
                backdropFilter: "blur(8px)",
                transform: isHovered ? "scale(1)" : "scale(0.75)",
              }}
            >
              <FiPlay className="text-cyan-300 w-3.5 h-3.5 ml-0.5" />
            </div>
          </div>

          {/* Tag */}
          <div
            className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase"
            style={{ background: tagColor.bg, border: `1px solid ${tagColor.border}`, color: tagColor.text, backdropFilter: "blur(8px)" }}
          >
            {proj.tag}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-4">
          <div>
            <h3
              className="text-base font-bold leading-snug tracking-tight mb-1.5 transition-colors duration-300"
              style={{ color: isHovered ? "#e0f7fa" : "#f1f5f9" }}
            >
              {proj.title}
            </h3>
            <p className="text-xs text-white/40 leading-relaxed">{proj.description}</p>
          </div>

          {/* Divider */}
          <div className="h-px" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.04), rgba(34,211,238,0.12), rgba(255,255,255,0.04))" }} />

          {/* Action buttons */}
          <div className="flex gap-2.5 mt-auto">
            <a
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${proj.title}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60"
              style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.22)", color: "#67e8f9" }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(34,211,238,0.16)";
                el.style.borderColor = "rgba(34,211,238,0.5)";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 6px 20px rgba(34,211,238,0.12)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(34,211,238,0.08)";
                el.style.borderColor = "rgba(34,211,238,0.22)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <FiExternalLink className="w-3 h-3 flex-shrink-0" />
              Demo
            </a>

            <a
              href={proj.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View GitHub source of ${proj.title}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.55)" }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.09)";
                el.style.borderColor = "rgba(255,255,255,0.2)";
                el.style.color = "white";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.04)";
                el.style.borderColor = "rgba(255,255,255,0.09)";
                el.style.color = "rgba(255,255,255,0.55)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <FiGithub className="w-3 h-3 flex-shrink-0" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </li>
  );
});

ProjectCard.displayName = "ProjectCard";

/* ─── Main Section ──────────────────────────────────────────────── */
const ProjectsCardsInfinite = ({
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const content = Array.from(scrollerRef.current.children);
      content.forEach((item) => {
        scrollerRef.current?.appendChild(item.cloneNode(true));
      });
      setAnimationProperties();
      setStart(true);
    }
  }, []);

  const setAnimationProperties = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty("--animation-direction", direction === "left" ? "forwards" : "reverse");
    const dur = speed === "fast" ? "20s" : speed === "slow" ? "80s" : "40s";
    containerRef.current.style.setProperty("--animation-duration", dur);
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "#070810" }}>

      {/* ── Ambient background ──────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(34,211,238,0.05) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 inset-x-0 h-40"
          style={{ background: "linear-gradient(to top, rgba(7,8,16,0.95), transparent)" }} />
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-cyan-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-indigo-700/5 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(34,211,238,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.6) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ── Section Header ──────────────────────────────────────────── */}
      <div className="relative z-10 w-full px-4 sm:px-8 pt-20 sm:pt-24 pb-2">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.22em] uppercase"
            style={{ border: "1px solid rgba(34,211,238,0.22)", background: "rgba(34,211,238,0.05)", color: "#22d3ee" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Featured Projects
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold tracking-tight leading-none mb-3">
            <span className="text-white">My </span>
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500"
              style={{ filter: "drop-shadow(0 0 24px rgba(34,211,238,0.35))" }}
            >
              Projects
            </span>
          </h1>

          <p className="max-w-sm text-sm text-white/35 font-light leading-relaxed mt-1">
            Digital products built with precision and clean code.
          </p>
        </motion.div>

        {/* Sparkle divider */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="relative w-full max-w-md mx-auto h-14 mt-4"
        >
          <div className="absolute inset-x-12 top-2 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(34,211,238,0.6), rgba(99,102,241,0.6), transparent)" }} />
          <div className="absolute inset-x-12 top-2 h-px blur-sm"
            style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.5), transparent)" }} />
          <SparklesCore
            background="transparent"
            minSize={0.2}
            maxSize={0.7}
            particleDensity={700}
            className="absolute inset-0 w-full h-full"
            particleColor="#22d3ee"
          />
          <div className="absolute inset-0"
            style={{ maskImage: "radial-gradient(260px 100px at top, transparent 10%, white)" }} />
        </motion.div>
      </div>

      {/* ── Infinite scroll track ───────────────────────────────────── */}
      <div className="relative z-10 pb-20">
        <div
          ref={containerRef}
          className={clsx("scroller relative max-w-[100vw] overflow-hidden", className)}
          style={{ maskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)" }}
        >
          <ul
            ref={scrollerRef}
            className={clsx(
              "flex w-max min-w-full shrink-0 flex-nowrap gap-4 sm:gap-5 py-8 px-4 sm:px-6",
              start && "animate-scroll",
              pauseOnHover && "hover:[animation-play-state:paused]"
            )}
          >
            {projects.map((proj, idx) => (
              <ProjectCard key={idx} proj={proj} idx={idx} />
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom label */}
      <div className="relative z-10 flex justify-center pb-10">
        <div className="flex items-center gap-3 text-white/15 text-[10px] tracking-[0.25em] uppercase font-medium">
          <div className="w-10 h-px bg-white/10" />
          More coming soon
          <div className="w-10 h-px bg-white/10" />
        </div>
      </div>
    </div>
  );
};

export default ProjectsCardsInfinite;