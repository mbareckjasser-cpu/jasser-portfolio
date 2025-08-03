import React, { useRef, useState, useEffect } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { SparklesCore } from './SparklesCore.tsx';

const projects = [
    {
        title: "Plateforme de Formation",
        description: "Plateforme d’apprentissage et de formation en Tunisie développée avec React.js et Node.js.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        link: "https://formation-tunisie-demo.com",
        github: "https://github.com/jassermb/formation-tunisie",
    },
    {
        title: "Véhicule Électrique",
        description: "Site web de consultation des véhicules électriques développé avec Angular et Node.js.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        link: "https://vehicule-electrique-demo.com",
        github: "https://github.com/jassermb/vehicule-electrique",
    },
    {
        title: "Jeu de Mémoire",
        description: "Application mobile de jeu de mémoire développée avec Flutter.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        link: "https://jeu-memoire-demo.com",
        github: "https://github.com/jassermb/jeu-memoire-flutter",
    },
    {
        title: "Plateforme E-commerce",
        description: "Plateforme e-commerce avec authentification, gestion des produits et intégration de paiement.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        link: "https://ecommerce-demo.com",
        github: "https://github.com/jassermb/ecommerce-platform",
    },
    {
        title: "Digitalisation Workflow Demandes",
        description: "Site web de digitalisation du workflow des demandes de développement avec React.js, Node.js, Express, et MySQL. Optimise les processus internes et le suivi en temps réel.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        link: "https://workflow-demandes-demo.com",
        github: "https://github.com/jassermb/workflow-demandes",
    },
];


const Projects = () => {
    const cardCount = projects.length;
    const radius = 280;
    const tiltAngle = 10;
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isRotating, setIsRotating] = useState(true);
    const [currentAngle, setCurrentAngle] = useState(0);
    const animationRef = useRef(null);
    const videoRefs = useRef([]);

    // Initialiser les refs vidéo
    useEffect(() => {
        videoRefs.current = projects.map((_, i) => videoRefs.current[i] || React.createRef());
    }, []);

    // Gestion de la rotation
    useEffect(() => {
        if (!isRotating) {
            cancelAnimationFrame(animationRef.current);
            return;
        }

        const animate = () => {
            setCurrentAngle(prev => (prev + 0.1) % 360);
            animationRef.current = requestAnimationFrame(animate);
        };
        animationRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationRef.current);
    }, [isRotating]);

    // Gestion des vidéos
    useEffect(() => {
        videoRefs.current.forEach((ref, idx) => {
            const video = ref.current;
            if (!video) return;

            if (idx === hoveredIndex) {
                setTimeout(() => video.play().catch(console.warn), 100);
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    }, [hoveredIndex]);

    const getCardStyle = (index) => {
        const angle = ((360 / cardCount) * index + currentAngle) % 360;
        const rad = angle * (Math.PI / 180);

        const visibility = 0.4 + 0.6 * Math.pow(Math.cos(rad), 2);
        const scale = 0.85 + 0.15 * visibility;
        const brightness = 0.6 + 0.4 * visibility;

        return {
            transform: `
                rotateY(${angle}deg)
                translateZ(${radius}px)
                rotateY(${-angle}deg)
                rotateX(${tiltAngle}deg)
                scale(${scale})
            `,
            opacity: visibility,
            zIndex: Math.floor(visibility * 100),
            filter: `brightness(${brightness})`,
            transformStyle: 'preserve-3d',
            pointerEvents: visibility > 0.5 ? 'auto' : 'none',
        };
    };



    const navigate = (direction) => {
        setIsRotating(false);
        setCurrentAngle(prev => prev + direction * (360 / cardCount));
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black/50 ">
            <div className="h-[6rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
                <h1 className="md:text-4xl text-2xl lg:text-6xl font-bold text-center text-white relative z-20">
                    My Projects
                </h1>
                <div className="w-full h-40 relative">
                    {/* Gradients */}
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                    {/* Core component */}
                    <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={1}
                        particleDensity={1200}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />

                    {/* Radial Gradient to prevent sharp edges */}
                    <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                </div>
            </div>



            <div className="absolute inset-0 flex items-center justify-center mt-[-50px]">
                <div className="relative w-full h-[60vh]" style={{ perspective: '1200px' }}>
                    <div className=" absolute top-1/2 left-1/2 w-[340px] h-[420px] -ml-[170px] -mt-[210px] transition-all duration-500 ease-out">
                        <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#00ffff] to-white/70 border border-white/20 shadow-lg overflow-hidden flex flex-col">
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="absolute top-1/2 left-1/2 w-[420px] h-[480px] -ml-[160px] -mt-[190px] transition-transform duration-700 ease-out"
                                    style={getCardStyle(index)}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >


                                    <div className="w-full h-full rounded-2xl shadow-xl overflow-hidden flex flex-col bg-gray-900 border border-gray-700 backdrop-blur-md hover:shadow-2xl transition-transform duration-300 hover:scale-105">
                                        <div className="h-48 overflow-hidden border-b border-gray-600">
                                            <video
                                                ref={videoRefs.current[index]}
                                                src={project.video}
                                                className="w-full h-full object-cover"
                                                muted
                                                loop
                                                playsInline
                                                preload="metadata"
                                            />
                                        </div>
                                        <div className="flex-1 p-5 text-white flex flex-col justify-between">
                                            <div className="mb-4">
                                                <h2 className="text-xl font-semibold text-center mb-2">{project.title}</h2>
                                                <div className="h-[72px] overflow-y-auto custom-scrollbar text-sm text-gray-300 leading-relaxed">
                                                    {project.description}
                                                </div>
                                            </div>
                                            <div className="flex justify-center gap-4">
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 rounded-md border border-cyan-400 text-white text-sm font-medium hover:bg-cyan-600/80 transition-all flex items-center gap-2 backdrop-blur-sm"
                                                >
                                                    <FiExternalLink />
                                                    Voir le projet
                                                </a>
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-4 py-2 rounded-md border border-gray-400 text-white text-sm font-medium hover:bg-gray-700/80 transition-all flex items-center gap-2 backdrop-blur-sm"
                                                    >
                                                        <FiGithub />
                                                        Code source
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-cyan-500/90 hover:bg-cyan-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <button
                        onClick={() => setIsRotating(!isRotating)}
                        className="bg-cyan-500/90 hover:bg-cyan-600 text-white px-5 py-2 rounded-full shadow-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                        {isRotating ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="6" y="4" width="4" height="16" />
                                    <rect x="14" y="4" width="4" height="16" />
                                </svg>
                                Pause
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                                Play
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => navigate(1)}
                        className="bg-cyan-500/90 hover:bg-cyan-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Projects;
