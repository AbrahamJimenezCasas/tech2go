import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useProduct } from "../hooks/useProduct.js";
import { useUser } from "../hooks/useUser.js";
import { useRequest } from "../hooks/useRequest.js";
import { RateProductCard } from "../components/products/RateProductCard.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareCheck,
    faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { updateBuyRequestStateService } from "../services/fetchApi.js";
import { toast } from "react-toastify";

export const AcceptRejectBuyRequestPage = () => {
    const { id, id_sol } = useParams();
    const { token } = useAuth();
    const { product } = useProduct(id);
    const { user } = useUser(null, token);
    const { request } = useRequest(id, id_sol, token);
    const [loading, setIsLoading] = useState(false);
    const [finalIcon, setFinalIcon] = useState(null);
    // console.log(request);
    // console.log(product?.vendedorId === user?.id);

    const handleClick = async (accion) => {
        try {
            setIsLoading(true);
            const estado = { estado: accion };

            await updateBuyRequestStateService(id, id_sol, token, estado);

            setFinalIcon(accion === "aceptada" ? faSquareCheck : faSquareXmark);

            toast.success(`Solicitud ${accion} con éxito`);
        } catch (error) {
            toast.error(
                error.message ||
                    `No se ha podido marcar la solicitud como ${accion}`
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="flex justify-center bg-light p-6 lg:px-32 2xl:px-40 lg:py-8 w-full">
            <section className="flex items-center gap-4 bg-electric-violet-50 shadow-lg mt-20 p-10 rounded-2xl w-10/12">
                {product && <RateProductCard product={product} />}
                {request && (
                    <div className="flex flex-col gap-2 w-2/3 font-body text-electric-violet-950 text-center">
                        <p>Compra solicitada por {request.username}</p>
                        {request.estado === "aceptada" && (
                            <FontAwesomeIcon
                                icon={faSquareCheck}
                                className="text-electric-violet-800 text-4xl"
                            />
                        )}
                        {request.estado === "rechazada" && (
                            <FontAwesomeIcon
                                icon={faSquareXmark}
                                className="text-electric-violet-800 text-4xl text"
                            />
                        )}
                        {request.estado === "pendiente" &&
                            product?.vendedorId === user?.id && (
                                <div
                                    className={`${finalIcon ? "hidden" : "flex"} justify-center gap-4`}
                                >
                                    <FontAwesomeIcon
                                        icon={faSquareXmark}
                                        className="text-electric-violet-500 hover:text-electric-violet-800 text-5xl transition-colors duration-200 cursor-pointer text"
                                        name="rechazada"
                                        onClick={() => handleClick("rechazada")}
                                    />
                                    <FontAwesomeIcon
                                        icon={faSquareCheck}
                                        className="text-electric-violet-500 hover:text-electric-violet-800 text-5xl transition-colors duration-200 cursor-pointer text"
                                        onClick={() => handleClick("aceptada")}
                                    />
                                </div>
                            )}
                        {finalIcon && (
                            <FontAwesomeIcon
                                icon={finalIcon}
                                className="text-electric-violet-800 text-4xl text"
                            />
                        )}
                    </div>
                )}
            </section>
        </section>
    );
};
