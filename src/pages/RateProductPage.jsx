import { useParams } from "react-router-dom";
import { RatingForm } from "../components/forms/RatingForm.jsx";
import { useProduct } from "../hooks/useProduct.js";
import { useValoration } from "../hooks/useValoration.js";
import { RateProductCard } from "../components/products/RateProductCard.jsx";

export const RateProductPage = () => {
    const { id } = useParams(); // Obtener el ID del producto desde la URL
    const { product, loading: loadingProduct } = useProduct(id);
    const { valoration, loading: loadingValoration } = useValoration(id);

    /* mensaje de cargando página con animación */
    if (loadingProduct || loadingValoration) {
        return (
            <section className="flex flex-col items-center justify-center h-screen">
                <p className="text-xl font-bold text-electric-violet-800">
                    Cargando...
                </p>
                <div className="mt-4 animate-spin rounded-full h-12 w-12 border-t-4 border-electric-violet-800 border-solid"></div>
            </section>
        );
    }

    return (
        <section className="flex flex-col items-center justify-center min-h-screen p-10 bg-light shadow-lg rounded-xl">
            <h1 className="text-4xl font-bold text-electric-violet-800 mb-8 text-center ">
                ¡Cuéntanos tu experiencia!
            </h1>

            <div className="flex flex-row items-center gap-9 max-w-5xl w-[90%] bg-white p-10 rounded-xl shadow-lg mx-auto">
                <RateProductCard
                    id={product.id}
                    name={product.nombre}
                    price={product.precio}
                    pic={product.foto}
                />

                <div className="w-2/3">
                    {valoration ? (
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <p className="font-semibold">
                                Valoración: {valoration.valoracion} estrellas
                            </p>
                            <p className="text-gray-700">
                                Comentario: {valoration.comentario}
                            </p>
                        </div>
                    ) : (
                        <RatingForm productId={id} />
                    )}
                </div>
            </div>
        </section>
    );
};
