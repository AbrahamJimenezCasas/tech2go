import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useProduct } from "../hooks/useProduct.js";
import { useUser } from "../hooks/useUser.js";
import { useEffect, useState } from "react";
import { RateProductCard } from "../components/products/RateProductCard.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { updateProductSoldService } from "../services/fetchApi.js";

export const SoldProductPage = () => {
    const { id } = useParams();
    const { token } = useAuth();
    const { product } = useProduct(id);
    const { user } = useUser(null, token);
    const [loading, setIsLoading] = useState(false);
    const [finalIcon, setFinalIcon] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (product && user && product?.vendedorId !== user?.id) {
            const route = `/articulos/${product?.id}`;
            navigate(route);
        }
    }, [product, user]);

    const handleClick = async () => {
        try {
            setIsLoading(true);

            await updateProductSoldService(id, token);

            setFinalIcon(faSquareCheck);

            toast.success(`Producto marcado como vendido`);
        } catch (error) {
            toast.error(
                error.message ||
                    `No se ha podido marcar el artículo como vendido`
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="flex justify-center items-center bg-light p-6 lg:px-32 2xl:px-40 lg:py-8 w-full min-h-[calc(100svh-15rem)]">
            <section className="flex items-center gap-4 bg-electric-violet-50 shadow-lg p-10 rounded-2xl w-10/12">
                {product && <RateProductCard product={product} />}

                <div className="flex flex-col gap-2 w-2/3 font-body text-electric-violet-950 text-center">
                    {finalIcon ? (
                        <>
                            <p>El artículo ya se ha vendido</p>
                            <FontAwesomeIcon
                                icon={faSquareCheck}
                                className="text-electric-violet-800 text-4xl"
                            />
                        </>
                    ) : product?.vendido === 0 ? (
                        <>
                            <p>¿Marcar artículo como vendido?</p>
                            <FontAwesomeIcon
                                icon={faSquareCheck}
                                className="text-electric-violet-500 hover:text-electric-violet-800 text-5xl transition-colors duration-200 cursor-pointer text"
                                onClick={() => handleClick()}
                            />
                        </>
                    ) : (
                        <>
                            <p>El artículo ya se ha vendido</p>
                            <FontAwesomeIcon
                                icon={faSquareCheck}
                                className="text-electric-violet-800 text-4xl"
                            />
                        </>
                    )}
                </div>
            </section>
        </section>
    );
};
