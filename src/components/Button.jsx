import { motion } from "motion/react";

export const Button = ({ colors, type, children }) => {
    return (
        <motion.button
            type={type || "button"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className={`${colors} px-6 py-2 lg:py-0.5 rounded-3xl font-display cursor-pointer transition-colors duration-200`}
        >
            {children}
        </motion.button>
    );
};
