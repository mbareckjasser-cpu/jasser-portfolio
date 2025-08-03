"use client";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import SparklesCore from './SparklesCore.tsx';
import projectVideo from "../assets/project.mp4";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Plateforme de Formation",
    description: "Plateforme d’apprentissage et de formation en Tunisie développée avec React.js et Node.js.",
    link: "https://formation-tunisie-demo.com",
    github: "https://github.com/jassermb/formation-tunisie",
    video: projectVideo,
  },
  {
    title: "Véhicule Électrique",
    description: "Site web de consultation des véhicules électriques développé avec Angular et Node.js.",
    link: "https://vehicule-electrique-demo.com",
    github: "https://github.com/jassermb/vehicule-electrique",
    video: projectVideo,
  },
  {
    title: "Jeu de Mémoire",
    description: "Application mobile de jeu de mémoire développée avec Flutter.",
    link: "https://jeu-memoire-demo.com",
    github: "https://github.com/jassermb/jeu-memoire-flutter",
    video: projectVideo,
  },
  {
    title: "Plateforme E-commerce",
    description: "Plateforme e-commerce avec authentification, gestion des produits et intégration de paiement.",
    link: "https://ecommerce-demo.com",
    github: "https://github.com/jassermb/ecommerce-platform",
    video: projectVideo,
  },
  {
    title: "Digitalisation Workflow Demandes",
    description: "Site web de digitalisation du workflow des demandes avec React.js, Node.js, Express et MySQL.",
    link: "https://workflow-demandes-demo.com",
    github: "https://github.com/jassermb/workflow-demandes",
    video: projectVideo,
  },
];

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
        const clone = item.cloneNode(true);
        scrollerRef.current?.appendChild(clone);
      });
      setAnimationProperties();
      setStart(true);
    }
  }, []);

  const setAnimationProperties = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );

      const duration =
        speed === "fast"
          ? "20s"
          : speed === "normal"
            ? "40s"
            : speed === "slow"
              ? "80s"
              : "120s"; 

      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };


  return (
    <div className="min-h-screen bg-black/80  pb-16   ">
<div className="w-full bg-black rounded-xl overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16 pt-32">
<motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center justify-center space-y-2 text-center "
        >          <h1 className="text-white font-extrabold text-xl md:text-2xl lg:text-3xl tracking-tight">
            My Projects
          </h1>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative w-full h-20 mt-2"
        >
          <div className="absolute inset-x-24 top-1 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
          <div className="absolute inset-x-24 top-1 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />


          <SparklesCore
            background="transparent"
            minSize={0.3}
            maxSize={1}
            particleDensity={1400}
            className="absolute inset-0 w-full h-full"
            particleColor="#ffffff"
          />

          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(300px_150px_at_top,transparent_10%,white)]" />
        </motion.div>
      </div>




      <div
        ref={containerRef}
        className={clsx(
          "scroller relative z-20 max-w-7xl overflow-hidden mx-auto [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
          className
        )}
      >
        <ul
          ref={scrollerRef}
          className={clsx(
            "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-6 px-4 sm:px-0",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {projects.map((proj, idx) => (
            <li
              key={idx}
              className="relative w-[300px] sm:w-[350px] max-w-full shrink-0 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 dark:border-zinc-700 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative group flex flex-col h-full p-5">
                <div className="overflow-hidden rounded-xl mb-4">
                  <video
                    src={proj.video}
                    muted
                    loop
                    playsInline
                    className="rounded-xl w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-zinc-800 dark:text-white mb-1">{proj.title}</h3>

                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 flex-grow mb-4 leading-relaxed">
                  {proj.description}
                </p>

                <div className="flex justify-between items-center mt-auto pt-3 border-t border-zinc-200 dark:border-zinc-700">
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2 rounded-md border border-cyan-500 text-cyan-600 hover:bg-cyan-600 hover:text-white transition-colors duration-300 ease-in-out shadow-sm hover:shadow-lg"
                  >
                    <FiExternalLink className="text-lg group-hover:text-white transition-colors duration-300 ease-in-out" />
                    <span className="font-medium">Demo</span>
                  </a>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2 rounded-md border border-zinc-800 dark:border-zinc-200 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:text-white dark:hover:text-black transition-colors duration-300 ease-in-out shadow-sm hover:shadow-lg"
                  >
                    <FiGithub className="text-lg group-hover:text-white dark:group-hover:text-black transition-colors duration-300 ease-in-out" />
                    <span className="font-medium">GitHub</span>
                  </a>
                </div>

              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};
export default ProjectsCardsInfinite;  