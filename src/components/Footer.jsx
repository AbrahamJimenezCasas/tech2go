import { Link } from "react-router-dom";
import { Logo } from "./Logo.jsx";
import menuList from "../mocks/menu.json";

export const Footer = () => {
    return (
        <footer className="flex md:flex-row flex-col justify-between items-start bg-electric-violet-800 px-4 lg:px-12 py-4 w-full min-h-20 font-display">
            <Logo
                primary="electric-violet-200"
                secondary="fill-electric-violet-400"
            />
            <nav className="flex md:flex-row flex-col gap-1 md:gap-16 md:mr-10 font-body text-electric-violet-200 text-sm">
                <ul className="flex md:flex-col gap-2 md:gap-0">
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
                <ul className="flex md:flex-col gap-2 md:gap-0">
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
