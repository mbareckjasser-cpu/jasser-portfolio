import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { FiSend } from "react-icons/fi";

const InputField = ({ label, name, type = "text", value, onChange, error }) => (
  <div className="relative w-full">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder=""
      className="peer w-full bg-transparent border border-cyan-500 focus:border-cyan-400 shadow-md focus:shadow-cyan-500/40
 rounded-2xl px-3 pt-5 pb-2 text-sm text-white focus:outline-none focus:border-blue-400"
    />
    <label
      htmlFor={name}
      className={`absolute left-4 top-2 text-sm text-cyan-300 transition-all duration-300 transform 
    ${value || value?.length > 0 ? 'opacity-0 scale-95 translate-y-[-8px]' : 'peer-focus:opacity-0'}`}
    >
      {label}
    </label>


    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const TextareaField = ({ label, name, value, onChange, error }) => (
  <div className="w-full relative">
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder=""
      rows="10"
      className="peer w-full bg-transparent border border-sky-500 rounded-2xl px-3 pt-5 pb-2 text-sm text-white resize-none focus:outline-none focus:border-blue-400"
    />
    <label
      htmlFor={name}
      className={`absolute left-3 top-2 text-sm text-cyan-300 transition-all duration-300 transform 
    ${value || value?.length > 0 ? 'opacity-0 scale-95 translate-y-[-8px]' : 'peer-focus:opacity-0'}`}
    >
      {label}
    </label>


    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

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
      setStatusMessage('✅ Message sent successfully!');
      setFormData({ fullName: '', email: '', phoneNumber: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatusMessage('❌ Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="relative min-h-screen py-20 px-4 md:px-20 md:pt-40 bg-black/80 text-white">
      <motion.h1
        className="text-center text-3xl md:text-4xl font-bold text-gray-100 mb-16 mt-8"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Contact <span className="text-cyan-300">Me</span>
      </motion.h1>

      {statusMessage && (
        <motion.div
          className={`p-4 rounded-lg mb-5 text-center ${statusMessage.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {statusMessage}
        </motion.div>
      )}

      <motion.form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 bg-opacity-20 rounded-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true }}
      >

        {/* LEFT */}
        <motion.div
          className="space-y-6 max-w-md w-full mx-auto"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
          <InputField label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
          <InputField label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} />
          <InputField label="Subject" name="subject" value={formData.subject} onChange={handleChange} />
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="flex flex-col justify-center items-center mx-auto max-w-md w-full space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <TextareaField label="Your Message *" name="message" value={formData.message} onChange={handleChange} error={errors.message} />

          <button
            type="submit"
            className="relative group inline-flex items-center justify-center px-8 py-2 rounded-full font-semibold text-white bg-black border border-transparent shadow-xl transition-all duration-500 ease-out hover:border-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 blur-xl scale-110 transition-all duration-700 ease-out pointer-events-none" />

            <FiSend
              size={22}
              className="relative mr-2 text-white transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-125 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            />

            <span className="relative tracking-wide text-sm md:text-base transition-all duration-500 ease-out group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
              Send Message
            </span>
          </button>


        </motion.div>

      </motion.form>
    </div>
  );
};

export default ContactPage;
