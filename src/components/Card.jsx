import { motion } from "motion/react";

export const Card = ({ index, children }) => {
    return (
        <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.3,
                delay: 0.3 * index,
            }}
            className="flex justify-between items-center gap-4 hover:bg-electric-violet-200 shadow-2xl shadow-dark/20 px-4 py-2 rounded-3xl w-full h-20 transition-colors duration-200 list-none"
        >
            {children}
        </motion.li>
    );
};
