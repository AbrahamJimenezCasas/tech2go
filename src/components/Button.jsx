import { motion } from "motion/react";

const Button = ({ colors, children }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`${colors} px-4 py-1 rounded-2xl font-display cursor-pointer transition-colors duration-200`}
        >
            {children}
        </motion.button>
    );
};
export default Button;
