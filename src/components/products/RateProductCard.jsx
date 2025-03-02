export const RateProductCard = ({ id, name, price, pic }) => {
    const staticPath = import.meta.env.VITE_BACKEND_STATIC;
    return (
        <div className="w-1/3 flex flex-col items-center bg-light shadow-dark/10 shadow-lg p-4 rounded-2xl">
            <img
                src={
                    pic
                        ? `${staticPath}/articulos/${pic}`
                        : "/imgs/no-img-available.png"
                }
                className="rounded-2xl w-full object-cover shadow-lg"
                alt={`Imagen de ${name}`}
            />
            <p className="mt-4 mb-2 w-full font-body font-bold text-electric-violet-950 text-center leading-none">
                {name}
            </p>
            <p className="w-full font-body font-light text-electric-violet-950 text-center leading-none">
                {price} €
            </p>
        </div>
    );
};
