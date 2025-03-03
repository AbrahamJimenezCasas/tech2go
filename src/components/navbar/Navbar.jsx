import { Link } from "react-router-dom";
import { motion, useCycle } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth.js";
import menuList from "../../mocks/menu.json";
import { Logo } from "../Logo.jsx";
import { MenuItem } from "./MenuItem.jsx";
import { MenuToggle } from "./MenuToggle.jsx";
import { Button } from "../Button.jsx";
import { ProfileMenu } from "./ProfileMenu.jsx";
import { Search } from "./Search.jsx";

export const Navbar = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const { token } = useAuth();

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
        <>
            <header className="flex justify-between items-center bg-light px-4 lg:px-12 py-2 border-b-1 border-b-electric-violet-200 w-full h-20 font-display">
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
                        {token ? (
                            <>
                                <li>
                                    <Button
                                        colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light flex gap-2 items-center"
                                        path="/vender-articulo"
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                        Vender
                                    </Button>
                                </li>
                                <li className="relative">
                                    <ProfileMenu colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light" />
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Button
                                        colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light"
                                        path="/registro"
                                    >
                                        Regístrate
                                    </Button>
                                </li>
                                <li>
                                    <Button
                                        colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light"
                                        path="/login"
                                    >
                                        Inicia sesion
                                    </Button>
                                </li>
                            </>
                        )}
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
                            isOpen
                                ? "pointer-events-auto"
                                : "pointer-events-none"
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
                        {token ? (
                            <>
                                <motion.li variants={items}>
                                    <Button
                                        colors="bg-electric-violet-50 hover:bg-electric-violet-900 
                                    text-electric-violet-800 hover:text-electric-violet-50 flex gap-2 items-center"
                                        path="/usuarios"
                                        toggle={() => toggleOpen()}
                                    >
                                        Explorar usuarios
                                    </Button>
                                </motion.li>
                                <motion.li variants={items}>
                                    <Button
                                        colors="bg-electric-violet-50 hover:bg-electric-violet-900 
                                    text-electric-violet-800 hover:text-electric-violet-50 flex gap-2 items-center"
                                        path="/vender-articulo"
                                        toggle={() => toggleOpen()}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                        Vender
                                    </Button>
                                </motion.li>
                                <motion.li
                                    variants={items}
                                    className="relative text-lg"
                                >
                                    <ProfileMenu
                                        colors="bg-electric-violet-50 hover:bg-electric-violet-900 
                                    text-electric-violet-800 hover:text-electric-violet-50 text-lg"
                                        toggleOpen={toggleOpen}
                                    />
                                </motion.li>
                            </>
                        ) : (
                            <>
                                <motion.li variants={items}>
                                    <Button
                                        colors="bg-electric-violet-50 hover:bg-electric-violet-900 
                                    text-electric-violet-800 hover:text-electric-violet-50"
                                        path="/registro"
                                        toggle={() => toggleOpen()}
                                    >
                                        Regístrate
                                    </Button>
                                </motion.li>

                                <motion.li variants={items}>
                                    <Button
                                        colors="bg-electric-violet-50 hover:bg-electric-violet-900 
                                    text-electric-violet-800 hover:text-electric-violet-50"
                                        path="/login"
                                        toggle={() => toggleOpen()}
                                    >
                                        Inicia sesion
                                    </Button>
                                </motion.li>
                            </>
                        )}
                    </motion.ul>

                    <MenuToggle toggle={() => toggleOpen()} />
                </motion.nav>
            </header>
            <section className="flex justify-between items-center bg-light px-4 lg:px-12 py-2 w-full h-16">
                <Search />
                {token && (
                    <Button
                        colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light hidden lg:block"
                        path="/usuarios"
                    >
                        Explorar usuarios
                    </Button>
                )}
            </section>
        </>
    );
};
