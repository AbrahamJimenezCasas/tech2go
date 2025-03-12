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
            className="group relative hover:text-electric-violet-800 transition-colors duration-200 cursor-pointer"
            onClick={toggle}
        >
            {children}
        </li>
    );
};

export const ProfileMenu = ({ colors, toggleOpen, pendingRequests }) => {
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
                {pendingRequests > 0 && (
                    <div className="-top-1 -right-2 absolute flex justify-center items-center bg-electric-violet-300 p-2 border-2 border-electric-violet-800 rounded-full w-6 h-6 font-body text-electric-violet-800 text-sm transition-colors duration-200 cursor-pointer">
                        {pendingRequests}
                    </div>
                )}
            </IconButton>

            <AnimatePresence initial={false}>
                {isVisible ? (
                    <motion.nav
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="top-12 right-0 z-10 absolute bg-electric-violet-300 shadow-2xl shadow-dark/10 rounded-2xl w-30"
                    >
                        <ul className="px-4 py-2 text-electric-violet-950 text-right">
                            <ProfileMenuItem toggle={toggleVisible}>
                                <Link to="/usuario">Perfil</Link>
                            </ProfileMenuItem>
                            <ProfileMenuItem toggle={toggleVisible}>
                                <Link to="/usuario/editar">Editar</Link>
                            </ProfileMenuItem>
                            <ProfileMenuItem toggle={toggleVisible}>
                                {pendingRequests > 0 && (
                                    <div className="group-hover:text-electric-violet-800 top-1/2 -left-3 absolute flex justify-center items-center p-2 border-2 border-electric-violet-950 group-hover:border-electric-violet-800 rounded-full w-6 h-6 font-body text-electric-violet-950 text-sm transition-colors -translate-y-1/2 duration-200 cursor-pointer">
                                        {pendingRequests}
                                    </div>
                                )}
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
