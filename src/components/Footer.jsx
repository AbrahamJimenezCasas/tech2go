import { Link } from "react-router-dom";
import { Logo } from "./Logo.jsx";
import menuList from "../mocks/menu.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faTiktok,
    faXTwitter,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
    return (
        <footer className="flex md:flex-row flex-col justify-between items-start bg-electric-violet-800 px-4 lg:px-12 py-4 lg:w-full lg:min-h-20 font-display">
            <Logo
                primary="electric-violet-200"
                secondary="fill-electric-violet-400"
            />
            <div className="flex gap-2 my-4">
                <a
                    href="https://youtube.com/@axelphoenixx?si=mB9EULaUxr0CjIDf"
                    target="_blank"
                >
                    <FontAwesomeIcon
                        icon={faYoutube}
                        className="text-electric-violet-50 hover:text-electric-violet-300 text-4xl lg:text-6xl transition-colors duration-200 cursor-pointer"
                    />
                </a>
                <a
                    href="https://www.instagram.com/arrogantemadrid/?hl=es"
                    target="_blank"
                >
                    <FontAwesomeIcon
                        icon={faInstagram}
                        className="text-electric-violet-50 hover:text-electric-violet-300 text-4xl lg:text-6xl transition-colors duration-200 cursor-pointer"
                    />
                </a>
                <a href="https://x.com/Zacatrus" target="_blank">
                    <FontAwesomeIcon
                        icon={faXTwitter}
                        className="text-electric-violet-50 hover:text-electric-violet-300 text-4xl lg:text-6xl transition-colors duration-200 cursor-pointer"
                    />
                </a>
                <a
                    href="https://www.tiktok.com/@yerbamatelab?is_from_webapp=1&sender_device=pc"
                    target="_blank"
                >
                    <FontAwesomeIcon
                        icon={faTiktok}
                        className="text-electric-violet-50 hover:text-electric-violet-300 text-4xl lg:text-6xl transition-colors duration-200 cursor-pointer"
                    />
                </a>
            </div>
            <nav className="flex md:flex-row flex-col gap-1 md:gap-16 md:mr-10 font-body text-electric-violet-200 text-sm">
                <ul className="flex md:flex-col flex-wrap gap-2 md:gap-0">
                    <li className="text-light">Categorías</li>
                    {menuList.map((item) => (
                        <li
                            key={item.name}
                            className="hover:text-electric-violet-400 transition-colors duration-200"
                        >
                            <Link to={item.url}>{item.text}</Link>
                        </li>
                    ))}
                </ul>
                <ul className="flex md:flex-col flex-wrap gap-2 md:gap-0">
                    <li className="text-light">TECH2GO</li>
                    <li className="hover:text-electric-violet-400 transition-colors duration-200">
                        <Link to="/sobre-nosotros">Quienes somos</Link>
                    </li>
                    <li className="hover:text-electric-violet-400 transition-colors duration-200">
                        <Link to="/politica-privacidad">
                            Política de privacidad
                        </Link>
                    </li>
                    <li className="hover:text-electric-violet-400 transition-colors duration-200">
                        <Link to="/contacto">Contáctanos</Link>
                    </li>
                    <li className="hover:text-electric-violet-400 transition-colors duration-200">
                        <Link to="/ayuda">Centro de ayuda</Link>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};
