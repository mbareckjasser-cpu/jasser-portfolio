import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import throttle from "lodash.throttle";
const useScroll = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrolled(window.scrollY > 1);
    }, 100); // Déclenche la mise à jour toutes les 100ms
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return scrolled;
};

export default function Navbar() {
  const scrolled = useScroll();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 backdrop-blur-md  
    ${scrolled ? "shadow-lg border-b border-white/50 bg-transparent" : "  bg-black/80"} md:right-[10px]`}
    >  
      <div className="w-full max-w-7xl mx-auto px-0  py-3 flex justify-between items-center">
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide hover:tracking-widest transition-all duration-300 bg-gradient-to-r from-cyan-400 via-white to-blue-400 text-transparent bg-clip-text ml-2 md:ml-0">
  J<span className="text-gray-300">.M</span>
</h1>

        <div className="hidden md:flex mt-0.5 -mr-9 items-center gap-5 text-white text-xs font-medium uppercase tracking-wide">
          {[
            { label: "Home", href: "#Home" },
            { label: "Aboute Me", href: "#aboutme" },
            { label: "Service", href: "#Services" },
            { label: "Skills", href: "#skills" },
            { label: "Projects", href: "#Projects" },
            { label: "Contact", href: "#ContactPage" },
          ].map(({ label, href }, index) => (
            <React.Fragment key={label}>
              <motion.div
                className="relative group overflow-hidden"
                whileHover={{ scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <a
                  href={href}
                  className="relative inline-block transition-colors duration-300 ease-in-out group-hover:text-cyan-300"
                >
                  {label}
                  <span
                    className="block mt-0.5 w-full h-0.5 bg-cyan-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left "
                  />
                </a>
              </motion.div>
              {index !== 5 && (
                <motion.span
                  className="text-[#00FFFF] px-1"
                  style={{
                    textShadow: '0 0 1px #00FFFF, 0 0 5px #00FFFF, 0 0 10px #00FFFF',
                  }}
                  initial={{ opacity: 1, scale: 1 }}
                  whileHover={{ opacity: 1.2, }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  |
                </motion.span>
              )}

            </React.Fragment>
          ))}
        </div>

        <button
          className="md:hidden pr-1 text-white text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="md:hidden flex border-t  flex-col items-center bg-black bg-opacity-40 text-white py-0 pt-4 gap-3 text-xs font-medium uppercase tracking-wide"
        >
          {[
            { label: "About", href: "#Home" },
            { label: "Aboute Me", href: "#aboutme" },
            { label: "Service", href: "#Services" },
            { label: "Skills", href: "#skills" },
            { label: "Projects", href: "#Projects" },
            { label: "Contact", href: "#ContactPage" },
          ].map(({ label, href }, index) => (
            <React.Fragment key={label}>
              <motion.div
                className="relative group overflow-hidden"
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <a
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="relative inline-block transition-colors duration-300 ease-in-out group-hover:text-cyan-300"
                >
                  {label}
                </a>
              </motion.div>
              <span
                className={`block mt-0.5 w-full h-[0.8px]`}
                style={{
                  background: 'linear-gradient(to right, #ffffff, #000000, #00FFFF)',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </React.Fragment>
          ))}
        </motion.div>
      )}
      {!isOpen && (
        <span
          className="block w-full h-[0.5px]"
          style={{
            background: `linear-gradient(to right, #ffffff 0%, #00FFFF 50%, #ffffff 100%)`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            boxShadow: '0 0 6px #00FFFF',
            opacity: 0.9,
          }}
        />)}
    </motion.nav>
  );
}
