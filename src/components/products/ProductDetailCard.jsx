import { Link } from "react-router-dom";

export const ProductDetailCard = ({ id, name, price, pic }) => {
    const staticPath = import.meta.env.VITE_BACKEND_STATIC;
    console.log(id);
    return (
        <Link
            to={`/articulos/${id}`}
            className="group flex flex-col items-center bg-light hover:bg-electric-violet-50 shadow-dark/10 shadow-lg p-4 rounded-2xl h-full transition-colors duration-200"
        >
            <img
                src={
                    pic
                        ? `${staticPath}/articulos/${pic}`
                        : "/imgs/no-img-available.png"
                }
                className="rounded-2xl w-full h-3/4 object-cover transition-transform group-hover:-translate-y-1 duration-200"
            />
            <p className="group-hover:text-electric-violet-800 mt-4 w-full font-body font-bold text-electric-violet-950 text-right leading-none transition-colors duration-200">
                {name}
            </p>
            <p className="w-full font-body font-light text-electric-violet-950 text-right leading-none">
                {price}
            </p>
        </Link>
    );
};
