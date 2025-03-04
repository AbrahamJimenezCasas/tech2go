import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../IconButton.jsx";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth.js";

const ProfileMenuItem = ({ toggle, children }) => {
    return (
        <li
            className="hover:text-electric-violet-800 cursor-pointer 00 trasition-colors"
            onClick={toggle}
        >
            {children}
        </li>
    );
};

export const ProfileMenu = ({ colors, toggleOpen }) => {
    const { onLogout } = useAuth();
    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();

    const toggleVisible = () => {
        setIsVisible((prev) => !prev);
        toggleOpen && toggleOpen();
    };

    const logout = async () => {
        toggleVisible();
        toggleOpen && toggleOpen();
        await onLogout();
        navigate("/login");
    };

    return (
        <>
            <IconButton
                colors={colors}
                toggle={() => setIsVisible((prev) => !prev)}
            >
                <FontAwesomeIcon icon={faUser} />
            </IconButton>

            <AnimatePresence initial={false}>
                {isVisible ? (
                    <motion.nav
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="top-12 z-10 right-0 absolute bg-electric-violet-300/90 shadow-2xl shadow-dark/10 rounded-2xl w-30"
                    >
                        <ul className="px-4 py-2 text-electric-violet-950 text-right">
                            <ProfileMenuItem toggle={toggleVisible}>
                                <Link to="/usuario">Perfil</Link>
                            </ProfileMenuItem>
                            <ProfileMenuItem toggle={toggleVisible}>
                                <Link to="/usuario/editar">Editar</Link>
                            </ProfileMenuItem>
                            <ProfileMenuItem toggle={toggleVisible}>
                                <Link to="/usuario/solicitudes">
                                    Solicitudes
                                </Link>
                            </ProfileMenuItem>
                            <ProfileMenuItem toggle={logout}>
                                Cerrar sesión
                            </ProfileMenuItem>
                        </ul>
                    </motion.nav>
                ) : null}
            </AnimatePresence>
        </>
    );
};
