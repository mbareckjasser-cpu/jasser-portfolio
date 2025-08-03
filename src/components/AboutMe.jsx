import React from 'react';
import { motion } from 'framer-motion';
import myImage from '../assets/secondphpro.png';
import "../css/animations.css";
import { FaHandshake } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import { useState, useEffect } from "react";


const AboutMe = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return (

    <div className="w-full text-white flex flex-col md:flex-row items-center justify-center md:gap-10 mx-0 pt-0 pb-0 sm:pt-0 md:pb-0">            {/* Text Content */}

      <motion.div
        className="w-full min-h-screen bg-black/80  p-6 md:p-5 backdrop-blur-md  flex flex-col-reverse md:flex-row items-center justify-between gap-10"
        initial={{ opacity: 0, scale: isMobile ? 0.92 : 1, y: isMobile ? 40 : 0 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >





        <div className="w-full md:w-1/2 md:ml-20 font-serif text-neutral-100 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.h2
            className="text-2xl md:text-3xl font-extrabold mb-6 text-left text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
          >

            About <span className="text-cyan-300">Me</span>
          </motion.h2>


          <motion.p
            className="w-full max-w-screen-sm text-sm sm:text-base md:text-lg mb-4 leading-relaxed"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <strong className="text-cyan-300">Hello! I'm </strong>, a detail-oriented and service-driven web developer with a solid foundation in full-stack development. I hold a Bachelor's degree in Information Technologies, specializing in Information Systems Development. My passion lies in building clean, modern, and impactful digital experiences that solve real-world problems for users and businesses.
          </motion.p>

          <motion.p
            className="w-full max-w-screen-sm text-sm sm:text-base md:text-lg mb-4 leading-relaxed"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}

          >
            With hands-on experience in technologies like <strong className="text-cyan-300">ReactJS, Node.js, Express, and mongodb</strong>, I build scalable and responsive web applications tailored to user needs. I'm proficient in Git and GitHub workflows, which ensures seamless collaboration, version control, and continuous integration across development teams. As a certified <strong className="text-cyan-300">Scrum Master</strong>, I also embrace agile methodologies, promoting clear communication, efficient sprint planning, and iterative delivery of high-value features. This combination of technical expertise and agile mindset allows me to contribute effectively to team-driven projects and deliver impactful digital solutions.
          </motion.p>


          <motion.div
            className="text-center w-full md:-ml-10"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row justify-start sm:justify-center gap-4 w-full max-w-md sm:max-w-2xl mx-auto px-2">
              {[
                {
                  href: "#contact",
                  icon: <FaHandshake className="text-xl" />,
                  text: "Contact Me",
                },
                {
                  href: "/CV.pdf",
                  download: true,
                  icon: <HiOutlineDocumentDownload className="text-xl" />,
                  text: "Download Resume",
                },
              ].map(({ href, icon, text, download }, i) => (
                <a
                  key={i}
                  href={href}
                  download={download}
                  className="relative flex-1 max-w-[280px] sm:max-w-none flex items-center justify-center gap-2 px-6 py-2 sm:px-6 sm:py-2 border border-[#00FFFF] rounded-full text-white font-poppins text-sm md:text-base bg-transparent overflow-hidden group"
                >
                  {/* Animation miroir gauche */}
                  <span className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-400 rounded-l-full transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out z-0" />
                  {/* Animation miroir droite */}
                  <span className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-cyan-400 via-cyan-300 to-teal-400 rounded-r-full transform scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300 ease-in-out z-0" />

                  {/* Contenu visible au-dessus */}
                  <span className="relative z-10 flex items-center gap-2 text-white group-hover:text-[#0b0b0b] transition-colors duration-300 ease-in-out">
                    {icon}
                    {text}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>



        </div>



        <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-[480px] md:h-[480px] relative mt-6 md:mt-0 sm:mr-16 overflow-hidden rounded-2xl flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-cover bg-center rounded-2xl z-0"
            style={{
              backgroundImage: `url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExanJ1dnB2ZWg3bmtudnJtMXQ5NnhsdTczdWcyd3R3cG4wNGh2OXFyYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eKsk2j4bU2So7TTBHq/giphy.gif')`,
              animation: 'borderGlow 2s infinite',
              borderRadius: '1rem',
            }}
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 0.4, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          />

          <motion.img
            src={myImage}
            alt="Jasser Mbareck"
            className="w-[90%] h-[90%] object-contain rounded-2xl z-10"
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          />
        </div>

      </motion.div>



    </div>

  );
};

export default AboutMe;
