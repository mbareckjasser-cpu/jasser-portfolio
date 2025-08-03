import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import photo from "../assets/phprobl.png";
import { FaLinkedin, FaGithub, FaFacebook, FaTwitter, FaWhatsapp, FaInstagram } from "react-icons/fa";
import "../css/BorderAnimation.css"; // fichier CSS externe

export function About() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollEffect = (scrollY / 0);

    const NameAnimated = () => {
        const name = "Full Stack MERN Developer";
        const [displayedText, setDisplayedText] = useState("");
        const [index, setIndex] = useState(0);

        const isComplete = index === name.length;

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
                className="text-[#00FFFF] font-semibold tracking-wide"
                style={{
                    textShadow: '0 0 1.5px #00FFFF, 0 0 16px #00FFFF, 0 0 20px #00FFFF',
                }}
            >
                {displayedText}
                <motion.span
                    className="inline-block ml-1 text-white font-light"
                    animate={{
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "easeInOut",
                    }}
                >
                    |
                </motion.span>
            </span>
        );


    };

    return (
        <div className="min-h-screen text-white flex flex-col md:flex-row items-center justify-center px-10  gap-20">
            <div className="flex justify-center items-center ">
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <div
                        className="w-[150px] h-[200px] md:w-[300px] md:h-[420px] rounded-[30px] z-19  mx-auto md:ml-[10%] lg:ml-[15%] xl:ml-[20%] mt-20 md:mt-0"

                    >
                        <motion.img
                            src={photo}
                            alt="Jasser Mbareck"
                            className="w-full h-full object-cover object-center rounded-[30px] z-20 transition-transform duration-300"
                            initial={{ scale: 0.9, opacity: 0, rotate: -3 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                rotate: 0,
                            }}
                            whileHover={{
                                scale: 1.1, // légèrement réduit pour un rendu plus naturel
                                rotate: 0,
                            }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                                delay: 0.2
                            }}
                        />

                    </div>
                </motion.div>
            </div>

            <motion.div
                className="max-w-4xl rounded-2xl bg-black/50 p-6 md:p-10 backdrop-blur-md mx-auto text-center md:text-left mb-6 md:mb-0"
                initial={{ opacity: 0, x: -150 }}
                animate={{ opacity: 0.8, x: 0 }}
                transition={{ duration: 0.7 }}
                style={{
                    boxShadow: "0 10px 60px rgba(0, 255, 255, 0.25)",
                }}
            >
                <h1 className="text-2xl md:text-4xl font-poppins font-semibold text-white tracking-tight leading-snug">
                    Hi, It's{" "}
                    <span className="text-[#00FFFF] font-semibold">
                        Jasser Mbareck
                    </span>
                </h1>

                <h2 className="text-lg md:text-2xl font-semibold text-white tracking-tight leading-snug mt-4">
                    I'm a <NameAnimated />
                </h2>

                <p className="text-center md:text-justify text-sm md:text-base text-base mt-4 leading-relaxed tracking-wide font-poppins px-4 md:px-0">
                    Passionate about modern web development, I use React, Node.js, MongoDB, and more to build interactive and high-performance experiences. I enjoy solving complex problems and turning them into efficient digital solutions.
                </p>

                <div className="mt-6 flex justify-center md:justify-start gap-6 text-white text-2xl">
                    <a
                        href="https://www.linkedin.com/in/jassermbareck"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#00FFFF] transition"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://github.com/ton_github"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#00FFFF] transition"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://wa.me/216xxxxxxxx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#00FFFF] transition"
                    >
                        <FaWhatsapp />
                    </a>
                    <a
                        href="https://instagram.com/ton_instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#00FFFF] transition"
                    >
                        <FaInstagram />
                    </a>
                </div>

                <div className="mt-6 flex justify-center md:justify-start gap-4">
                    <a
                        href="#ContactPage"
                        className="relative inline-block px-5 py-2 md:px-8 md:py-3 border border-[#00FFFF] rounded-full bg-[#00FFFF] text-black font-semibold font-poppins transition-all duration-300 ease-in-out shadow-md overflow-hidden group"
                    >
                        <span className="absolute inset-0 bg-black rounded-full transition-transform duration-500 ease-in-out scale-x-0 group-hover:scale-x-100 origin-left z-0"></span>

                        <span className="relative z-10 transition-colors duration-300 group-hover:text-[#00FFFF]">
                            Let’s Collaborate
                        </span>
                    </a>
                </div>




            </motion.div>

        </div>
    );
}
export default About;
