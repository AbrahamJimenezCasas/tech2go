import { Card } from "../Card.jsx";

import { formatDate } from "../../utils/dayJs.js";
import { Link } from "react-router-dom";

export const ProductCard = ({ index, product }) => {
    const staticPath = import.meta.env.VITE_BACKEND_STATIC;
    const fecha = formatDate(product.fechaCreacion);
    const fotos = product.fotos;
    const foto = fotos ? fotos[0] : null;

    return (
        <Link to={`/articulos/${product.id}`}>
            <Card index={index}>
                <div className="flex items-center gap-4 h-full">
                    {foto ? (
                        <img
                            className="rounded-2xl h-11/12 aspect-square"
                            src={`${staticPath}/articulos/${product.vendedorId}/${product.id}/${foto.foto}`}
                        />
                    ) : (
                        <img
                            className="rounded-2xl h-11/12 aspect-square"
                            src="/imgs/no-img-available.png"
                        />
                    )}
                    <div className="font-body">
                        <h3 className="font-bold text-electric-violet-950">
                            {product.nombre}
                        </h3>
                        <p>{fecha}</p>
                    </div>
                </div>
            </Card>
        </Link>
    );
};
