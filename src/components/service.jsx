import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Smartphone, Cpu, Database, GitBranch } from "lucide-react";
// import sqlImage from "../assets/uml11.jpg";
// import dev from "../assets/devfuullstackweb.png";
// import flutter from "../assets/mobil1.jpg";
import backgroundVideo from "../assets/12813817_1920_1080_30fps.mp4"; // ta vidéo par défaut

const services = [
    {
        title: "Full-Stack Development",
        icon: <GitBranch size={40} className="text-cyan-400" />,
        description:
            "End-to-end web app development using React.js, Node.js, and Angular. Integration of microservices, RESTful APIs, and JWT-based authentication.",
        note: "Projects: Digital workflow platform, EV fleet management system",
        colors: "from-cyan-400 to-blue-600",
    },
    {
        title: "Mobile Development",
        icon: (
            <div className="relative">
                <Smartphone size={40} className="text-orange-400" />
                <Cpu size={20} className="absolute -right-2 -bottom-2 text-purple-300" />
            </div>
        ),
        description:
            "Cross-platform apps built with Flutter and Kotlin. Performance optimization and native sensor integration.",
        note: "Projects: Memory game, Native Android apps",
        colors: "from-purple-400 to-indigo-600",
    },
    {
        title: "Information Systems Engineering",
        icon: (
            <div className="flex gap-2">
                <Database size={32} className="text-green-400" />
                <Code2 size={32} className="text-teal-400" />
            </div>
        ),
        description:
            "UML modeling and relational database design. Business software built with Symfony and PostgreSQL.",
        note: "Expertise: ERD diagrams, complex SQL queries",
        colors: "from-green-400 to-teal-600",
    },
];

const ServicesSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // const backgroundImage =
    //     hoveredIndex !== null ? services[hoveredIndex].backgroundImage : "none";


    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative min-h-screen py-20 px-4 sm:px-6 md:px-8 transition-all duration-500"
        >
            <div className="absolute inset-0 z-0 w-full h-full">
                {/* <video
                    className="w-full h-full object-cover"
                    src={backgroundVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    style={{
                        pointerEvents: "none",
                        transition: "opacity 0.5s ease-in-out",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "translateZ(0)",
                        opacity: 0.4,
                        filter: "brightness(150%) contrast(110%)", 

                    }}
                /> */}
                <div className="absolute inset-0 bg-black/80 mix-blend-overlay  pointer-events-none"></div>
            </div>





            {/* <div className="backdrop-blur-md bg-slate-900/80 w-full h-full absolute inset-0 -z-10"></div> */}

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="
    text-4xl md:text-5xl font-extrabold text-center mb-16
    bg-gradient-to-r from-cyan-300 via-white to-blue-200
    bg-clip-text text-transparent
    drop-shadow-xl
    tracking-wide
    cursor-default
    select-none
    relative
    overflow-hidden
  "
                >
                    <span
                        className="
      text-cyan-400
      relative
      z-10
      after:absolute after:content-[''] after:block after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-cyan-400 after:rounded-full after:scale-x-0 after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-100
    "
                    >
                        My
                    </span>{" "}
                    Services
                </motion.h2>







                <div className="grid grid-cols-1 gap-12 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
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

const ServiceCard = ({ service, index, onHover, onLeave }) => {
    const colorPalettes = [
        { border: ['#30f2f2', '#2d00f7', '#c200fb'], icon: '#30f2f2', title: '#30f2f2' }, // Aqua/Blue
        { border: ['#ec7d10', '#ff00aa', '#ffcc00'], icon: '#ec7d10', title: '#ec7d10' }, // Orange/Pink
        { border: ['#00ff88', '#00ccff', '#7700ff'], icon: '#00ff88', title: '#00ff88' }, // Green/Blue
        { border: ['#ff00aa', '#7700ff', '#00ccff'], icon: '#ff00aa', title: '#ff00aa' }, // Pink/Purple
    ];

    const colors = colorPalettes[index % colorPalettes.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.109, boxShadow: '0 35px 65px -15px rgba(0,0,0,0.6)' }}
            transition={{ delay: index * 0.2, type: "spring", stiffness: 150, damping: 15 }}
            className="relative group rounded-2xl h-full p-0.5 overflow-visible shadow-[0_45px_45px_-10px_rgba(255,255,255,0.25)]"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >

            <div
                className="absolute inset-0 rounded-2xl p-[0.5px] group-hover:opacity-100 opacity-0 transition-opacity duration-700"
                style={{
                    backgroundImage: `
                        conic-gradient(
                            from var(--angle, 0turn),
                            #111,
                            #222 50%,
                            #111
                        ),
                        conic-gradient(
                            from var(--angle, 0turn),
                            transparent 20%,
                            ${colors.border[0]},
                            ${colors.border[1]},
                            ${colors.border[2]}
                        )`,
                    backgroundBlendMode: "overlay",
                    animation: "spin-border 8s linear infinite",
                    filter: "blur(0.5px)",
                }}
            ></div>

            <style jsx global>{`
                @property --angle {
                    syntax: '<angle>';
                    initial-value: 0turn;
                    inherits: false;
                }
                @keyframes spin-border {
                    0% { --angle: 0turn; }
                    100% { --angle: 1turn; }
                }
            `}</style>

            <div
                className="relative z-10 rounded-2xl p-6 sm:p-8 h-full flex flex-col items-center text-center"
                style={{ backgroundColor: '#000000' }}
            >
                <div
                    className="mb-6 flex items-center justify-center"
                    style={{ color: colors.icon, minHeight: '48px', minWidth: '48px' }}
                >
                    {service.icon}
                </div>

                <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: colors.title, minHeight: '56px', lineHeight: '1.2' }}
                >
                    {service.title}
                </h3>

                <span className="text-sm text-slate-300 font-medium mb-6 min-h-[20px]">
                    {service.note}
                </span>

                <p className="text-gray-500 leading-relaxed max-w-xs max-h-40 overflow-auto">
                    {service.description}
                </p>
            </div>


        </motion.div>
    );
};




export default ServicesSection;
