import { Link } from "react-router-dom";

export const RateProductCard = ({ product }) => {
    const staticPath = import.meta.env.VITE_BACKEND_STATIC;
    const fotos = product.fotos;
    const foto = fotos ? fotos[0] : null;

    return (
        <Link
            to={`/articulos/${product.id}`}
            className="group flex flex-col items-center bg-light shadow-dark/10 shadow-lg hover:shadow-electric-violet-800/10 p-4 rounded-2xl w-full sm:w-1/3"
        >
            <img
                src={
                    foto
                        ? `${staticPath}/articulos/${product.vendedorId}/${product.id}/${foto.foto}`
                        : "/imgs/no-img-available.png"
                }
                className="shadow-lg group-hover:shadow-electric-violet-800/10 rounded-2xl w-full object-cover transition-all group-hover:-translate-y-1 duration-200"
                alt={`Imagen de ${product.nombre}`}
            />
            <p className="group-hover:text-electric-violet-800 mt-4 mb-2 w-full font-body font-bold text-electric-violet-950 text-center leading-none transition-colors duration-200">
                {product.nombre}
            </p>
            <p className="w-full font-body font-light text-electric-violet-950 text-center leading-none">
                {product.precio} €
            </p>
        </Link>
    );
};
