import { Link } from "react-router-dom";

export const ProductCard = () => {
    return (
        <Link>
            <article className="flex flex-col items-center bg-light shadow-dark/10 shadow-lg p-2 rounded-2xl h-56 sm:h-72 md:h-56 lg:h-72 xl:h-80">
                <img
                    src="/telefono.jpg"
                    className="rounded-2xl w-full h-40 sm:h-54 md:h-40 lg:h-54 xl:h-64 object-cover"
                />
                <p className="mt-2 w-full font-body font-bold text-electric-violet-950 text-right leading-none">
                    Nombre producto
                </p>
                <p className="w-full font-body font-light text-electric-violet-950 text-right leading-none">
                    100.00€
                </p>
            </article>
        </Link>
    );
};
