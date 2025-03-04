export const RateProductCard = ({ product }) => {
    const staticPath = import.meta.env.VITE_BACKEND_STATIC;
    const pic = product.fotos[0];

    return (
        <div className="w-1/3 flex flex-col items-center bg-light shadow-dark/10 shadow-lg p-4 rounded-2xl">
            <img
                src={
                    pic
                        ? `${staticPath}/articulos/${product.vendedorId}/${product.id}/${pic.foto}`
                        : "/imgs/no-img-available.png"
                }
                className="rounded-2xl w-full object-cover shadow-lg"
                alt={`Imagen de ${product.nombre}`}
            />
            <p className="mt-4 mb-2 w-full font-body font-bold text-electric-violet-950 text-center leading-none">
                {product.nombre}
            </p>
            <p className="w-full font-body font-light text-electric-violet-950 text-center leading-none">
                {product.precio} €
            </p>
        </div>
    );
};
