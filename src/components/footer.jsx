import { motion } from 'framer-motion';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-black/90 to-black text-white backdrop-blur-md py-8 px-4">
            <div className="flex flex-col items-center space-y-6">

                {/* Réseaux sociaux */}
                <motion.div
                    className="flex space-x-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    {[FaLinkedinIn, FaFacebookF, FaInstagram, FaTwitter].map((Icon, index) => (
                        <motion.a
                            key={index}
                            href="#"
                            whileHover={{
                                scale: 1.2,
                                boxShadow: "0 0 20px 6px rgba(0, 255, 200, 0.6)",
                                backgroundColor: "rgba(0, 255, 200, 0.1)",
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="text-teal-400 border border-teal-400 rounded-full p-3 transition-all duration-300 ease-in-out"
                        >
                            <Icon size={12} />
                        </motion.a>
                    ))}
                </motion.div>

                {/* Liens */}
                <motion.div
                    className="flex flex-wrap justify-center gap-6 text-sm text-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    {["Home", "About Me", "Service", "Skills", "Projects", "Contact"].map((text, index) => (
                        <a
                            key={index}
                            href="#"
                            className="relative text-white text-base font-medium transition duration-300 ease-in-out group"
                        >
                            {text}
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </motion.div>

                {/* Copyright */}
                <motion.div
                    className="text-xs text-gray-500 mt-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    © Jasser MBareck | All Rights Reserved
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
