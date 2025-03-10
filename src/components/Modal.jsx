import { motion } from "motion/react";

export const Modal = ({ children, isVisible }) => {
    return (
        <>
            {isVisible ? (
                <motion.section
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="top-0 right-0 absolute flex justify-center items-center w-full min-h-full"
                >
                    {children}
                </motion.section>
            ) : null}
        </>
    );
};
