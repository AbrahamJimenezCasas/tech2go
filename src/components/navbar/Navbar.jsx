import { Link } from "react-router-dom";
import { motion, useCycle } from "motion/react";
import menuList from "../../mocks/menu.json";
import { Logo } from "../Logo.jsx";
import { MenuItem } from "./MenuItem.jsx";
import { MenuToggle } from "./MenuToggle.jsx";
import { Button } from "../Button.jsx";

export const Navbar = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);

    const sidebar = {
        open: (height = 1000) => ({
            clipPath: `circle(${height * 2 + 200}px at calc(100% - 35px) 40px)`,
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2,
            },
        }),
        closed: {
            clipPath: "circle(25px at calc(100% - 35px) 40px)",
            transition: {
                delay: 0.1,
                type: "spring",
                stiffness: 400,
                damping: 40,
            },
        },
    };

    const variants = {
        open: {
            transition: { staggerChildren: 0.07, delayChildren: 0.2 },
        },
        closed: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
        },
    };

    return (
        <header className="flex justify-between items-center bg-light px-4 lg:px-8 py-2 border-b-1 border-b-electric-violet-200 w-full h-20 font-display">
            <Logo
                primary="electric-violet-800"
                secondary="fill-electric-violet-950"
                isOpen={isOpen}
                toggle={() => toggleOpen()}
            />

            {/* MENU PANTALLAS GRANDES */}
            <nav className="hidden lg:block">
                <ul className="flex items-center gap-4 font-display text-electric-violet-800 text-lg">
                    {menuList.map((item) => (
                        <li
                            key={item.name}
                            className="hover:text-electric-violet-950 transition-colors duration-200"
                        >
                            <Link to={item.url}>{item.text}</Link>
                        </li>
                    ))}
                    {/* PENDIENTE AJUSTAR CON DIFERENCIAS LOGIN */}
                    <li>
                        <Link to="/registro">
                            <Button colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light">
                                Regístrate
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="login">
                            <Button colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light">
                                Inicia sesion
                            </Button>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* MENU HAMBURGER PANTALLAS PEQUEÑAS */}
            <motion.nav
                initial={false}
                animate={isOpen ? "open" : "closed"}
                className="lg:hidden"
            >
                <motion.section
                    className={`z-30 top-0 right-0 w-full h-svh bg-electric-violet-800 ${
                        isOpen ? "fixed" : "absolute"
                    }`}
                    variants={sidebar}
                />
                <motion.ul
                    variants={variants}
                    className={`z-30 fixed top-0 right-0 w-full h-screen pt-24 pr-6 flex flex-col items-end gap-4 text-electric-violet-50 text-3xl ${
                        isOpen ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                >
                    {menuList.map((item) => (
                        <MenuItem
                            key={item.name}
                            toggle={() => toggleOpen()}
                            path={item.url}
                            text={item.text}
                        />
                    ))}
                    {/* PENDIENTE BOTONES */}
                </motion.ul>
                <MenuToggle toggle={() => toggleOpen()} />
            </motion.nav>
        </header>
    );
};
