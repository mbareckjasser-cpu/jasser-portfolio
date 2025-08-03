import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const FancyInput = React.forwardRef(({ label, type = "text", name, value, onChange, error }, ref) => {
  const radius = 100;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [visible, setVisible] = React.useState(false);

  function handleMouseMove(e) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
            #3b82f6,
            transparent 80%
          )
        `
      }}
      className="group/input rounded-xl p-[2px] transition duration-300 w-full"
    >
      <div className="relative w-full">
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="shadow-input peer w-full h-10 rounded-xl bg-white/90 text-black px-4 pt-5 pb-1 text-sm placeholder-transparent outline-none transition-all duration-300 dark:bg-zinc-800 dark:text-white"
          placeholder={label}
        />
        <label
          htmlFor={name}
          className="absolute left-4 top-2.5 text-sm text-gray-500 transition-opacity duration-200 pointer-events-none peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-sky-400"
        >
          {label}
        </label>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </motion.div>
  );
});

export default FancyInput;
