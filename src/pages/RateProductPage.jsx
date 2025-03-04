import { useParams } from "react-router-dom";
import { RatingForm } from "../components/forms/RatingForm.jsx";
import { useProduct } from "../hooks/useProduct.js";
import { useValoration } from "../hooks/useValoration.js";
import { RateProductCard } from "../components/products/RateProductCard.jsx";
import { Star } from "../components/Star.jsx";

export const RateProductPage = () => {
    const { id } = useParams(); // Obtener el ID del producto desde la URL
    const { product, loading: loadingProduct } = useProduct(id);
    const { valoration, loading: loadingValoration } = useValoration(id);

    console.log(valoration);

    /* mensaje de cargando página con animación */
    if (loadingProduct || loadingValoration) {
        return (
            <section className="flex flex-col justify-center items-center h-screen">
                <p className="font-bold text-electric-violet-800 text-xl">
                    Cargando...
                </p>
                <div className="mt-4 border-electric-violet-800 border-t-4 border-solid rounded-full w-12 h-12 animate-spin"></div>
            </section>
        );
    }

    return (
        <section className="flex flex-col justify-center items-center p-10 rounded-xl min-h-[80vh]">
            <h1 className="mb-8 font-bold text-electric-violet-800 text-3xl md:text-4xl lg:text-4xl text-center">
                {valoration
                    ? "Reseña del producto"
                    : "¡Cuéntanos tu experiencia!"}
            </h1>

            <div className="flex flex-col md:flex-row items-center gap-9 bg-white shadow-lg mx-auto p-10 rounded-xl w-[90%] max-w-5xl">
                {product && <RateProductCard product={product} />}

                <div className="w-2/3">
                    {valoration ? (
                        <div className=" p-4 rounded-lg">
                            <div className="flex items-center gap-2">
                                <p className="text-xl font-semibold text-electric-violet-900">
                                    Valoración:
                                </p>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <Star
                                            key={value}
                                            classes={`w-8 h-8 transition-colors duration-200 ${
                                                valoration?.valoracion >= value
                                                    ? "fill-electric-violet-500"
                                                    : "fill-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700 mt-4">
                                Comentario: {valoration?.comentario}
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
