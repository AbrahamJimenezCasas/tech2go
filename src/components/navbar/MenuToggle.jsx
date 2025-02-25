import { motion } from "motion/react";

const MenuPath = (props) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        strokeLinecap="round"
        {...props}
    />
);

export const MenuToggle = ({ toggle }) => (
    <button
        onClick={toggle}
        className="z-10 relative stroke-light hover:stroke-electric-violet-200 p-3.75 scale-125 transition-colors duration-200 cursor-pointer"
    >
        <svg width="23" height="23" viewBox="0 0 23 23" className="pt-0.5">
            <MenuPath
                variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" },
                }}
            />
            <MenuPath
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
                transition={{ duration: 0.3 }}
            />
            <MenuPath
                variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" },
                }}
            />
        </svg>
    </button>
);
