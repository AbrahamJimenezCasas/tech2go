import { Link } from "react-router-dom";

export const ProductCard = ({ name, price, pic }) => {
    return (
        <Link>
            <article className="group flex flex-col items-center bg-light hover:bg-electric-violet-50 shadow-dark/10 shadow-lg p-2 rounded-2xl h-56 sm:h-72 md:h-56 lg:h-72 xl:h-80 transition-colors duration-200">
                <img
                    src="/telefono.jpg"
                    className="rounded-2xl w-full h-40 sm:h-54 md:h-40 lg:h-54 xl:h-64 object-cover transition-transform group-hover:-translate-y-1 duration-200"
                />
                <p className="group-hover:text-electric-violet-800 mt-2 w-full font-body font-bold text-electric-violet-950 text-right leading-none transition-colors duration-200">
                    {name}
                </p>
                <p className="w-full font-body font-light text-electric-violet-950 text-right leading-none">
                    {price}
                </p>
            </article>
        </Link>
    );
};
