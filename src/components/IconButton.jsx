import { motion } from "motion/react";
import { Link } from "react-router-dom";
export const IconButton = ({ colors, path, children, toggle }) => {
    return (
        <>
            {path ? (
                <Link to={path} onClick={toggle}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        className={`${colors} rounded-full font-display cursor-pointer transition-colors duration-200 w-10 h-10 flex justify-center items-center`}
                    >
                        {children}
                    </motion.button>
                </Link>
            ) : (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    className={`${colors} rounded-full font-display cursor-pointer transition-colors duration-200 w-10 h-10 flex justify-center items-center`}
                >
                    {children}
                </motion.button>
            )}
        </>
    );
};
