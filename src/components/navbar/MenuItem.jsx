import { Link } from "react-router-dom";
import { motion } from "motion/react";

export const MenuItem = ({ path, text, toggle }) => {
    const items = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 },
            },
        },
        closed: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 },
            },
        },
    };

    return (
        <motion.li variants={items}>
            <Link
                onClick={toggle}
                className="hover:text-electric-violet-200 transition-colors 00"
                to={path}
            >
                {text}
            </Link>
        </motion.li>
    );
};
