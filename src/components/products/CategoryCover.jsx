import { motion } from "motion/react";
import { Link } from "react-router-dom";

export const CategoryCover = ({ img, margin, category, path }) => {
    return (
        <Link to={path}>
            <motion.article
                whileHover={{
                    scale: 1.05,
                    zIndex: 10,
                    transition: {
                        type: "spring",
                        stiffness: 20,
                        restDelta: 2,
                    },
                }}
                whileTap={{
                    scale: 1.05,
                    zIndex: 10,
                    transition: {
                        type: "spring",
                        stiffness: 20,
                        restDelta: 2,
                    },
                }}
                className={`${img}  bg-blend-soft-light bg-electric-violet-800/20 hover:bg-blend-normal bg-cover bg-center shadow-lg shadow-dark/10 ${margin} rounded-3xl w-32 lg:w-44 xl:w-56 h-56 lg:h-72 xl:h-80  cursor-pointer relative`}
            >
                <h3
                    className={`bottom-0 absolute bg-electric-violet-800 px-3 lg:px-4 py-2 rounded-b-3xl w-full font-display text-electric-violet-50 text-sm lg:text-lg`}
                >
                    {category}
                </h3>
            </motion.article>
        </Link>
    );
};
