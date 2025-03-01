import { Card } from "../Card.jsx";
import { formatDate } from "../../utils/dayJs.js";
import { Star } from "../Star.jsx";

export const SaleCard = ({ index, sale }) => {
    const staticPath = import.meta.env.VITE_BACKEND_STATIC;
    const fecha = formatDate(sale.fecha);
    const foto = sale.fotos[0];

    return (
        <Card index={index}>
            <div className="flex items-center gap-4 h-full">
                {foto ? (
                    <img
                        className="rounded-2xl h-11/12"
                        src={`${staticPath}/articulos/${sale.vendedorId}/${sale.articuloId}/${foto.foto}`}
                    />
                ) : (
                    <img
                        className="rounded-2xl h-11/12"
                        src="/imgs/no-img-available.png"
                    />
                )}

                <div className="font-body">
                    <h3 className="font-bold text-electric-violet-950">
                        {sale.nombre}
                    </h3>
                    <p>{fecha}</p>
                </div>
            </div>
            <section className="flex gap-1">
                {sale.valoracion &&
                    [...Array(sale.valoracion)].map((e, i) => (
                        <Star
                            key={i}
                            classes="w-6 stroke-electric-violet-800 fill-electric-violet-800"
                        />
                    ))}
                {sale.valoracion &&
                    [...Array(5 - sale.valoracion)].map((e, i) => (
                        <Star
                            key={i}
                            classes="w-6 stroke-electric-violet-800"
                        />
                    ))}
            </section>
        </Card>
    );
};
