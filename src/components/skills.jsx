import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import ballonTexture from '../assets/7878.avif';
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiNextdotjs,
  SiTailwindcss, SiBootstrap, SiSass, SiVite, SiRedux,
  SiFramer, SiNodedotjs, SiExpress, SiNestjs, SiMongodb,
  SiPostgresql, SiRedis, SiFirebase, SiCloudinary, SiPrisma,
  SiGraphql, SiSocketdotio, SiAmazonwebservices, SiGooglecloud,
  SiDocker, SiNginx, SiLinux, SiGithubactions, SiGit,
  SiPostman, SiGithub, SiJirasoftware, SiSwagger, SiVercel, SiNetlify
} from "react-icons/si";
import { VscVscodeInsiders, VscAzureDevops } from "react-icons/vsc";
import { TbTools } from "react-icons/tb";

/* ─── TiltCard (logic unchanged, styling via wrapper) ─── */
const TiltCard = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => { x.set(0.5); y.set(0.5); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03, y: -6 }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      transition={{ type: "spring", stiffness: 80, damping: 14, mass: 0.6 }}
      className="transform-gpu will-change-transform h-full"
    >
      {children}
    </motion.div>
  );
};

/* ─── 3D Balloon (unchanged logic) ─── */
const Balloon = () => {
  const texture = useTexture(ballonTexture);
  const meshRef = useRef();

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1, 1);
  texture.offset.set(0, 0);
  texture.center.set(0.5, 0.5);
  texture.anisotropy = 16;

  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.8, 128, 128]} />
      <meshStandardMaterial map={texture} roughness={0.1} metalness={0.6} side={THREE.FrontSide} />
    </mesh>
  );
};

const BalloonScene = () => (
  <Canvas style={{ height: '100%', width: '100%' }}>
    <ambientLight intensity={4} />
    <directionalLight position={[5, 5, 5]} intensity={1.5} />
    <pointLight position={[0, 0, 2]} intensity={1.2} color="white" />
    <OrbitControls enableZoom={false} autoRotate />
    <Balloon />
  </Canvas>
);

/* ─── Skills Data (unchanged) ─── */
export const skillsData = [
  {
    title: "Frontend",
    icon: <SiHtml5 className="w-5 h-5 text-[#E44D26]" />,
    color: "from-cyan-500/10 to-blue-600/10",
    borderColor: "from-cyan-500/50 via-blue-500/30 to-transparent",
    glowColor: "rgba(34,211,238,0.12)",
    accentColor: "#22d3ee",
    items: [
      { name: "HTML5", icon: <SiHtml5 className="w-4 h-4 text-[#E44D26]" /> },
      { name: "CSS3", icon: <SiCss3 className="w-4 h-4 text-[#1572B6]" /> },
      { name: "JavaScript", icon: <SiJavascript className="w-4 h-4 text-[#F7DF1E]" /> },
      { name: "Next.js", icon: <SiNextdotjs className="w-4 h-4 text-white" /> },
      { name: "React.js", icon: <SiReact className="w-4 h-4 text-[#61DAFB]" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="w-4 h-4 text-[#38BDF8]" /> },
      { name: "Bootstrap", icon: <SiBootstrap className="w-4 h-4 text-[#7952B3]" /> },
      { name: "Sass", icon: <SiSass className="w-4 h-4 text-[#CC6699]" /> },
      { name: "Vite", icon: <SiVite className="w-4 h-4 text-[#646CFF]" /> },
      { name: "Redux", icon: <SiRedux className="w-4 h-4 text-[#764ABC]" /> },
      { name: "FM", icon: <SiFramer className="w-4 h-4 text-[#E31E73]" /> },
    ],
  },
  {
    title: "Backend",
    icon: <SiNodedotjs className="w-5 h-5 text-[#339933]" />,
    color: "from-emerald-500/10 to-teal-600/10",
    borderColor: "from-emerald-500/50 via-teal-500/30 to-transparent",
    glowColor: "rgba(52,211,153,0.10)",
    accentColor: "#34d399",
    items: [
      { name: "Node.js", icon: <SiNodedotjs className="w-4 h-4 text-[#339933]" /> },
      { name: "Express.js", icon: <SiExpress className="w-4 h-4 text-white" /> },
      { name: "Nest.js", icon: <SiNestjs className="w-4 h-4 text-[#E0234E]" /> },
      { name: "MongoDB", icon: <SiMongodb className="w-4 h-4 text-[#47A248]" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="w-4 h-4 text-[#336791]" /> },
      { name: "Redis", icon: <SiRedis className="w-4 h-4 text-[#DC382D]" /> },
      { name: "Firebase", icon: <SiFirebase className="w-4 h-4 text-[#FFCA28]" /> },
      { name: "Cloudinary", icon: <SiCloudinary className="w-4 h-4 text-[#3448C5]" /> },
      { name: "Prisma", icon: <SiPrisma className="w-4 h-4 text-[#2D3748]" /> },
      { name: "GraphQL", icon: <SiGraphql className="w-4 h-4 text-[#E10098]" /> },
      { name: "REST API", icon: <SiPostman className="w-4 h-4 text-[#FF6C37]" /> },
      { name: "Socket.io", icon: <SiSocketdotio className="w-4 h-4 text-white" /> },
    ],
  },
  {
    title: "DevOps",
    icon: <VscAzureDevops className="w-5 h-5 text-[#FF9900]" />,
    color: "from-orange-500/10 to-amber-600/10",
    borderColor: "from-orange-500/50 via-amber-500/30 to-transparent",
    glowColor: "rgba(251,146,60,0.10)",
    accentColor: "#fb923c",
    items: [
      { name: "AWS", icon: <SiAmazonwebservices className="w-4 h-4 text-[#FF9900]" /> },
      { name: "Google Cloud", icon: <SiGooglecloud className="w-4 h-4 text-[#4285F4]" /> },
      { name: "Docker", icon: <SiDocker className="w-4 h-4 text-[#2496ED]" /> },
      { name: "Nginx", icon: <SiNginx className="w-4 h-4 text-[#009639]" /> },
      { name: "Linux", icon: <SiLinux className="w-4 h-4 text-[#FCC624]" /> },
      { name: "CI/CD", icon: <SiGithubactions className="w-4 h-4 text-[#2088FF]" /> },
    ],
  },
  {
    title: "Tools",
    icon: <TbTools className="w-5 h-5 text-[#F05032]" />,
    color: "from-rose-500/10 to-pink-600/10",
    borderColor: "from-rose-500/50 via-pink-500/30 to-transparent",
    glowColor: "rgba(244,63,94,0.10)",
    accentColor: "#f43f5e",
    items: [
      { name: "Git", icon: <SiGit className="w-4 h-4 text-[#F05032]" /> },
      { name: "VS Code", icon: <VscVscodeInsiders className="w-4 h-4 text-[#007ACC]" /> },
      { name: "Postman", icon: <SiPostman className="w-4 h-4 text-[#FF6C37]" /> },
      { name: "GitHub", icon: <SiGithub className="w-4 h-4 text-white" /> },
      { name: "Jira", icon: <SiJirasoftware className="w-4 h-4 text-[#0052CC]" /> },
      { name: "Swagger", icon: <SiSwagger className="w-4 h-4 text-[#85EA2D]" /> },
      { name: "Vercel", icon: <SiVercel className="w-4 h-4 text-white" /> },
      { name: "Netlify", icon: <SiNetlify className="w-4 h-4 text-[#00C7B7]" /> },
      { name: "Docker", icon: <SiDocker className="w-4 h-4 text-[#2496ED]" /> },
    ],
  },
];

/* ─── Skill Badge ─── */
const SkillBadge = ({ item, accentColor }) => (
  <motion.div
    whileHover={{ scale: 1.06, y: -2 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl
      bg-white/[0.03] hover:bg-white/[0.08]
      border border-white/[0.06] hover:border-white/[0.18]
      cursor-pointer overflow-hidden transition-colors duration-300"
    style={{ '--accent': accentColor }}
  >
    {/* Hover glow */}
    <span
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
      style={{ background: `radial-gradient(ellipse at 30% 50%, ${accentColor}18 0%, transparent 70%)` }}
    />
    {/* Icon wrapper */}
    <span className="relative z-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
      {item.icon}
    </span>
    <span className="relative z-10 text-sm font-medium text-white/70 group-hover:text-white/95 transition-colors duration-300 whitespace-nowrap">
      {item.name}
    </span>
  </motion.div>
);

/* ─── Skill Card ─── */
const SkillCard = ({ category, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 48 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true, amount: 0.15 }}
    className="h-full"
  >
    <TiltCard>
      {/* Gradient glow backdrop */}
      <div
        className="absolute inset-0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{ background: category.glowColor }}
      />

      {/* Card shell */}
      <div
        className="relative h-full rounded-2xl overflow-hidden"
        style={{ background: 'rgba(10,12,20,0.7)', backdropFilter: 'blur(20px)' }}
      >
        {/* Gradient border via pseudo-element simulation */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            padding: '1px',
            background: `linear-gradient(135deg, ${category.accentColor}55 0%, ${category.accentColor}11 50%, transparent 100%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${category.accentColor}88, transparent)` }}
        />

        {/* Card content */}
        <div className="relative z-10 p-6 md:p-7">
          {/* Card header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{ background: `${category.accentColor}15`, border: `1px solid ${category.accentColor}30` }}
            >
              {category.icon}
            </div>
            <div>
              <h3
                className="text-lg font-bold tracking-tight text-white"
                style={{ textShadow: `0 0 24px ${category.accentColor}55` }}
              >
                {category.title}
              </h3>
              <p className="text-xs text-white/35 mt-0.5">{category.items.length} technologies</p>
            </div>
            {/* Decorative pill count */}
            <div
              className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase"
              style={{ background: `${category.accentColor}18`, color: category.accentColor, border: `1px solid ${category.accentColor}30` }}
            >
              {category.items.length}
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px w-full mb-5"
            style={{ background: `linear-gradient(90deg, ${category.accentColor}30, transparent)` }}
          />

          {/* Skill badges */}
          <div className="flex flex-wrap gap-2.5">
            {category.items.map((item, idx) => (
              <SkillBadge key={idx} item={item} accentColor={category.accentColor} />
            ))}
          </div>
        </div>

        {/* Subtle radial glow inside card */}
        <div
          className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none"
          style={{ background: `radial-gradient(circle at 80% 80%, ${category.accentColor}12, transparent 70%)` }}
        />
      </div>
    </TiltCard>
  </motion.div>
);

/* ─── Main Component ─── */
const SkillsPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070810]">

      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep radial base */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,211,238,0.06) 0%, transparent 70%)' }} />
        {/* Bottom dark fade */}
        <div className="absolute bottom-0 inset-x-0 h-64"
          style={{ background: 'linear-gradient(to top, rgba(7,8,16,0.9), transparent)' }} />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* ── 3D Balloon – anchored top-center, blended ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        style={{ width: 'min(320px, 55vw)', height: 'min(320px, 55vw)', opacity: 0.85 }}>
        {/* Glow halo behind balloon */}
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 70%)' }}
        />
        <BalloonScene />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-52 sm:pt-56 pb-20">

        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Eyebrow label */}
          <motion.div
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-[0.2em] uppercase"
            style={{
              borderColor: 'rgba(34,211,238,0.25)',
              background: 'rgba(34,211,238,0.06)',
              color: '#22d3ee',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Technical Arsenal
          </motion.div>

          {/* Main title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none mb-5">
            <span className="text-white">My </span>
            <span
              className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500"
              style={{ filter: 'drop-shadow(0 0 32px rgba(34,211,238,0.4))' }}
            >
              Skills
            </span>
          </h2>

          {/* Subtitle */}
          <p className="max-w-md mx-auto text-sm sm:text-base text-white/40 font-light leading-relaxed tracking-wide">
            A curated stack of technologies I've wielded to craft scalable,
            performant, and visually refined digital products.
          </p>

          {/* Decorative underline */}
          <div className="mt-6 mx-auto w-24 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)' }} />
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-7 max-w-6xl mx-auto group">
          {skillsData.map((category, index) => (
            <SkillCard key={index} category={category} index={index} />
          ))}
        </div>

        {/* Bottom ambient decoration */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 text-white/20 text-xs tracking-widest uppercase font-medium">
            <div className="w-12 h-px bg-white/10" />
            <span>Always learning</span>
            <div className="w-12 h-px bg-white/10" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsPage;