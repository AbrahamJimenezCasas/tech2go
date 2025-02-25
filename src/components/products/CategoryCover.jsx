import { motion } from "motion/react";

export const CategoryCover = ({ img, margin, category }) => {
    return (
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
            className={` bg-[url(${img})] bg-blend-soft-light bg-electric-violet-800/20 hover:bg-blend-normal bg-cover bg-center shadow-2xl ${margin} rounded-3xl w-36 lg:w-56 h-56 lg:h-80  cursor-pointer relative`}
        >
            <h3
                className={`bottom-0 absolute bg-electric-violet-200 px-4 py-2 rounded-b-3xl w-full font-display text-electric-violet-800 text-lg`}
            >
                {category}
            </h3>
        </motion.article>
    );
};
