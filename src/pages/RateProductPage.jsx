import { useNavigate, useParams } from "react-router-dom";
import { RatingForm } from "../components/forms/RatingForm.jsx";
import { useProduct } from "../hooks/useProduct.js";
import { useValoration } from "../hooks/useValoration.js";
import { RateProductCard } from "../components/products/RateProductCard.jsx";
import { Star } from "../components/Star.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useRequest } from "../hooks/useRequest.js";
import { Button } from "../components/Button.jsx";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser.js";

export const RateProductPage = () => {
    const { id, id_sol } = useParams(); // Obtener el ID del producto desde la URL
    const { product, loading: loadingProduct } = useProduct(id);
    const { valoration, loading: loadingValoration } = useValoration(id);

    // Para que la valoracion solo la pueda poner si es el usuario
    const { token } = useAuth();
    const { user } = useUser(null, token);
    const { request } = useRequest(id, id_sol, token);
    const [showForm, setShowForm] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (request?.compradorId === user?.id) {
            setShowForm(true);
        } else {
            setShowForm(false);
        }
    }, [request]);

    // Para que la valoracion solo la pueda poner si es el usuario

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
        <section className="flex flex-col justify-center items-center p-10">
            <h2 className="mb-8 font-bold text-electric-violet-800 text-3xl md:text-4xl lg:text-4xl text-center">
                {valoration
                    ? "Reseña del producto"
                    : request
                      ? "¡Cuéntanos tu experiencia!"
                      : null}
            </h2>

            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center gap-9 bg-light shadow-lg mx-auto p-10 rounded-xl w-[90%] max-w-5xl">
                {product && <RateProductCard product={product} />}

                <div className="w-2/3">
                    {valoration ? (
                        <div className="p-4 rounded-lg">
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-electric-violet-900 text-xl">
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
                            <p className="mt-4 text-gray-700">
                                Comentario: {valoration?.comentario}
                            </p>
                        </div>
                    ) : showForm ? (
                        <RatingForm productId={id} />
                    ) : (
                        <section className="flex flex-col items-center gap-4">
                            <p className="font-bold text-electric-violet-950 text-2xl text-center">
                                Este producto aún no ha sido valorado
                            </p>
                            <Button
                                colors="bg-electric-violet-900 text-light"
                                toggle={() => navigate(-1)}
                            >
                                Volver atrás
                            </Button>
                        </section>
                    )}
                </div>
            </div>
        </section>
    );
};
