import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import { OrbitControls, useTexture } from '@react-three/drei';
import ballonTexture from '../assets/7878.avif';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiVite,
  SiRedux,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  SiCloudinary,
  SiPrisma,
  SiGraphql,
  SiSocketdotio,
  SiAmazonwebservices,
  SiGooglecloud,
  SiDocker,
  SiNginx,
  SiLinux,
  SiGithubactions,
  SiGit,
  SiPostman,
  SiGithub,
  SiJirasoftware,
  SiSwagger,
  SiVercel,
  SiNetlify
} from "react-icons/si";
import { VscVscodeInsiders, VscAzureDevops } from "react-icons/vsc";
import { TbTools } from "react-icons/tb";


const TiltCard = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [15, -15]);
  const rotateY = useTransform(x, [0, 1], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.08 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      transition={{ type: "spring", stiffness: 100, damping: 10, mass: 0.5 }}
      className="transform-gpu will-change-transform"
    >
      {children}
    </motion.div>
  );
};

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
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5; // plus fluide avec le temps réel
    }
  });


  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.8, 128, 128]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.1}
        metalness={0.6}
        side={THREE.FrontSide}
      />
    </mesh>
  );
};


const BalloonScene = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100%' }}>
      <ambientLight intensity={4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[0, 0, 2]} intensity={1.2} color="white" />
      <OrbitControls enableZoom={false} autoRotate />
      <Balloon />
    </Canvas>
  );
};


export const skillsData = [
  {
    title: "Frontend",
    icon: <SiHtml5 className="w-5 h-5 text-[#E44D26] mr-2" />,
    color: "#4FC3F7",
    items: [
      { name: "HTML5", icon: <SiHtml5 className="w-4 h-4 text-[#E44D26]" /> },
      { name: "CSS3", icon: <SiCss3 className="w-4 h-4 text-[#1572B6]" /> },
      { name: "JavaScript", icon: <SiJavascript className="w-4 h-4 text-[#F7DF1E]" /> },
      { name: "Next.js", icon: <SiNextdotjs className="w-4 h-4 " /> },
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
    icon: <SiNodedotjs className="w-5 h-5 text-[#339933] mr-2" />,
    color: "#FFCA28",
    items: [
      { name: "Node.js", icon: <SiNodedotjs className="w-4 h-4 text-[#339933]" /> },
      { name: "Express.js", icon: <SiExpress className="w-4 h-4 " /> },
      { name: "Nest.js", icon: <SiNestjs className="w-4 h-4 text-[#E0234E] " /> },
      { name: "MongoDB", icon: <SiMongodb className="w-4 h-4 text-[#47A248]" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="w-4 h-4 text-[#336791]" /> },
      { name: "Redis", icon: <SiRedis className="w-4 h-4 text-[#DC382D]" /> },
      { name: "Firebase", icon: <SiFirebase className="w-4 h-4 text-[#FFCA28]" /> },
      { name: "Cloudinary", icon: <SiCloudinary className="w-4 h-4 text-[#3448C5]" /> },
      { name: "Prisma", icon: <SiPrisma className="w-4 h-4 text-[#2D3748]" /> },
      { name: "GraphQL", icon: <SiGraphql className="w-4 h-4 text-[#E10098]" /> },
      { name: "REST API", icon: <SiPostman className="w-4 h-4 text-[#FF6C37]" /> },
      { name: "Socket.io", icon: <SiSocketdotio className="w-4 h-4 " /> },
    ],
  },
  {
    title: "DevOps",
    icon: <VscAzureDevops className="w-5 h-5 text-[#FF9900] mr-2" />,
    color: "#66BB6A",
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
    icon: <TbTools className="w-5 h-5 text-[#F05032] mr-2" />,
    color: "#FF7043",
    items: [
      { name: "Git", icon: <SiGit className="w-4 h-4 text-[#F05032]" /> },
      { name: "VS Code", icon: <VscVscodeInsiders className="w-4 h-4 text-[#007ACC]" /> },

      { name: "Postman", icon: <SiPostman className="w-4 h-4 text-[#FF6C37]" /> },
      { name: "GitHub", icon: <SiGithub className="w-4 h-4 text-white" /> },
      { name: "Jira", icon: <SiJirasoftware className="w-4 h-4 text-[#0052CC]" /> },
      { name: "Swagger", icon: <SiSwagger className="w-4 h-4 text-[#85EA2D]" /> },
      { name: "Vercel", icon: <SiVercel className="w-4 h-4 " /> },
      { name: "Netlify", icon: <SiNetlify className="w-4 h-4 text-[#00C7B7]" /> },
      { name: "Docker", icon: <SiDocker className="w-4 h-4 text-[#2496ED]" /> },
    ],
  },
];

const SkillsPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden overflow-x-hidden bg-black/80 md:pt-6">
      <div className="relative z-10 container mx-auto px-4 py-10">
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="text-white">My </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Skills
          </span>
        </motion.h2>


        <motion.h2
          className="text-sm text-center text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Here are some of my skills on which I have been working on.
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-y-4 w-full max-w-7xl mx-auto justify-items-center"
          style={{ columnGap: '7rem' }}
        >
          {skillsData.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <TiltCard className="w-full max-w-[800px]">
                <div className={`bg-gradient-to-br ${category.color}/20 rounded-3xl p-2 shadow-2xl w-full`}>
                  <div className="h-full w-full bg-[#121212]/40 rounded-3xl p-4 border border-[#2986f3]/60">
                    <h3 className="flex items-center justify-center text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
                      {category.icon}
                      {category.title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {category.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 py-2 px-3 rounded-xl hover:bg-white/30 cursor-pointer border border-[#2986f3]/60 w-40"
                        >
                          {item.icon}
                          <span className="text-white font-semibold">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 3D Balloon Scene */}
      <div className="absolute w-48 h-48 rounded-full 
  left-1/2 -translate-x-1/2 
  top-0.1 sm:top-20 
  sm:left-1/2 sm:-translate-x-1/2">
  <BalloonScene />
</div>





    </div>
  );
};

export default SkillsPage;
