import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';
import { FiSend, FiUser, FiMail, FiPhone, FiMessageSquare, FiTag } from "react-icons/fi";

/* ─── Floating Label Input ─────────────────────────────────────────── */
const InputField = ({ label, name, type = "text", value, onChange, error, icon: Icon }) => (
  <div className="relative w-full group">
    <div className="relative">
      {Icon && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-500/60 group-focus-within:text-cyan-400 transition-colors duration-300 pointer-events-none z-10">
          <Icon size={15} />
        </span>
      )}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`
          peer w-full bg-white/[0.03] backdrop-blur-sm
          border ${error ? 'border-red-500/70' : 'border-white/10 group-focus-within:border-cyan-500/60'}
          rounded-xl ${Icon ? 'pl-10' : 'pl-4'} pr-4 pt-6 pb-2.5
          text-sm text-white/90 placeholder-transparent
          focus:outline-none transition-all duration-300
          shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]
          focus:bg-white/[0.05] focus:shadow-[0_0_0_1px_rgba(6,182,212,0.25),inset_0_1px_0_0_rgba(255,255,255,0.06)]
        `}
      />
      <label
        htmlFor={name}
        className={`
          absolute ${Icon ? 'left-10' : 'left-4'} top-2 text-[11px] font-medium tracking-widest uppercase
          transition-all duration-300 pointer-events-none select-none
          ${value ? 'opacity-100 text-cyan-400/70' : 'opacity-0'}
          peer-focus:opacity-100 peer-focus:text-cyan-400/70
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-white/30
          peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-widest
        `}
      >
        {label}
      </label>
    </div>
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="text-red-400/80 text-[11px] mt-1.5 ml-1 flex items-center gap-1"
        >
          <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

/* ─── Floating Label Textarea ───────────────────────────────────────── */
const TextareaField = ({ label, name, value, onChange, error }) => (
  <div className="w-full relative group">
    <div className="relative">
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        rows="9"
        className={`
          peer w-full bg-white/[0.03] backdrop-blur-sm
          border ${error ? 'border-red-500/70' : 'border-white/10 group-focus-within:border-cyan-500/60'}
          rounded-xl px-4 pt-7 pb-3
          text-sm text-white/90 placeholder-transparent resize-none
          focus:outline-none transition-all duration-300
          shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]
          focus:bg-white/[0.05] focus:shadow-[0_0_0_1px_rgba(6,182,212,0.25),inset_0_1px_0_0_rgba(255,255,255,0.06)]
        `}
      />
      <label
        htmlFor={name}
        className={`
          absolute left-4 top-2.5 text-[11px] font-medium tracking-widest uppercase
          transition-all duration-300 pointer-events-none select-none
          ${value ? 'opacity-100 text-cyan-400/70' : 'opacity-0'}
          peer-focus:opacity-100 peer-focus:text-cyan-400/70
          peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-white/30
          peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-widest
        `}
      >
        {label}
      </label>
    </div>
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="text-red-400/80 text-[11px] mt-1.5 ml-1 flex items-center gap-1"
        >
          <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

/* ─── Main Component ────────────────────────────────────────────────── */
const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phoneNumber: '', subject: '', message: ''
  });
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    const templateParams = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phoneNumber,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      await emailjs.send(
        'service_ttqlzmq',
        'template_6h10kxt',
        templateParams,
        'lkDl7rL6zE1eN73Ge'
      );
      setStatusMessage('success');
      setFormData({ fullName: '', email: '', phoneNumber: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatusMessage('error');
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatusMessage(''), 6000);
    }
  };

  /* Stagger children */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
  };

  return (
    <div className="relative min-h-screen bg-[#080c14] text-white overflow-hidden flex items-center justify-center py-24 px-4">

      {/* ── Ambient background glows ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-blue-700/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-cyan-900/10 blur-[80px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(6,182,212,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6,182,212,0.6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">

        {/* ── Heading ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-cyan-400/60 mb-3 font-medium">Get in touch</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Contact{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Me
            </span>
          </h1>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/50" />
          </div>
          <p className="mt-4 text-white/40 text-sm max-w-sm mx-auto">
            Have a project in mind? Let's talk about it.
          </p>
        </motion.div>

        {/* ── Status Alert ── */}
        <AnimatePresence>
          {statusMessage && (
            <motion.div
              key="alert"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              className={`
                mb-8 mx-auto max-w-md px-5 py-4 rounded-xl text-sm text-center font-medium
                backdrop-blur-md border flex items-center justify-center gap-2.5
                ${statusMessage === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
                  : 'bg-red-500/10 border-red-500/25 text-red-300'}
              `}
            >
              <span className={`w-2 h-2 rounded-full ${statusMessage === 'success' ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`} />
              {statusMessage === 'success'
                ? 'Message sent successfully! I\'ll get back to you soon.'
                : 'Failed to send message. Please try again later.'}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Form Card ── */}
        <motion.div
          className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl shadow-[0_0_80px_-20px_rgba(6,182,212,0.1)] overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Card inner top glow line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-10 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

              {/* ── LEFT column ── */}
              <motion.div
                className="space-y-5"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={item}>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-white/25 font-semibold mb-5">
                    Your Details
                  </p>
                </motion.div>
                <motion.div variants={item}>
                  <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} icon={FiUser} />
                </motion.div>
                <motion.div variants={item}>
                  <InputField label="Email Address *" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} icon={FiMail} />
                </motion.div>
                <motion.div variants={item}>
                  <InputField label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} icon={FiPhone} />
                </motion.div>
                <motion.div variants={item}>
                  <InputField label="Subject" name="subject" value={formData.subject} onChange={handleChange} icon={FiTag} />
                </motion.div>
              </motion.div>

              {/* ── Divider (desktop only) ── */}
              <div className="hidden md:block absolute top-10 bottom-10 left-1/2 w-px bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />

              {/* ── RIGHT column ── */}
              <motion.div
                className="flex flex-col gap-5"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={item}>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-white/25 font-semibold mb-5">
                    Your Message
                  </p>
                </motion.div>
                <motion.div variants={item} className="flex-1">
                  <TextareaField label="Message *" name="message" value={formData.message} onChange={handleChange} error={errors.message} />
                </motion.div>

                {/* ── Submit Button ── */}
                <motion.div variants={item} className="flex justify-end mt-1">
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="
                      relative inline-flex items-center gap-2.5 px-7 py-3 rounded-xl
                      font-semibold text-sm tracking-wide
                      bg-gradient-to-r from-cyan-500 to-blue-500
                      text-white shadow-[0_0_24px_rgba(6,182,212,0.3)]
                      hover:shadow-[0_0_36px_rgba(6,182,212,0.45)]
                      transition-shadow duration-300
                      disabled:opacity-60 disabled:cursor-not-allowed
                      overflow-hidden group
                    "
                  >
                    {/* Shimmer */}
                    <span
                      aria-hidden
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out
                        bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                    />
                    {isLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <FiSend
                          size={16}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </form>
        </motion.div>

        {/* ── Bottom note ── */}
        <motion.p
          className="text-center text-white/20 text-xs mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          I typically respond within 24 hours.
        </motion.p>
      </div>
    </div>
  );
};

export default ContactPage;