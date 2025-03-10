import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth.js";
import {
    sendPurchaseRequestService,
    updateProductVisibilityService,
} from "../../services/fetchApi.js";
import { Button } from "../Button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt,
    faLocationDot,
    faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/dayJs.js";
import { useUser } from "../../hooks/useUser.js";
import { UserCard } from "../users/UserCard.jsx";
import { useNavigate } from "react-router-dom";
import { EditProductForm } from "../forms/EditProductForm.jsx";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

export const ProductDetail = ({ product, update }) => {
    const { token } = useAuth();

    const staticPath = import.meta.env.VITE_BACKEND_STATIC;
    const fotos = product.fotos;
    const foto = fotos ? fotos[0] : null;
    const fecha = formatDate(product.fechaCreacion);
    const { user: userSeller } = useUser(product?.vendedorId);

    const { user: userActive } = useUser(null, token);

    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();

    const purchase = async () => {
        try {
            await sendPurchaseRequestService(product?.id, token);
            toast.success("Solicitud de compra enviada con éxito");
        } catch (error) {
            toast.error("Error al enviar la solicitud de compra");
        }
    };

    const publish = async () => {
        try {
            await updateProductVisibilityService(product?.id, token);
            navigate("/articulos-pendientes");
            toast.success("Artículo publicado con éxito");
        } catch (error) {
            toast.error("No se ha podido publicar el artículo");
        }
    };

    const toggleVisible = () => {
        setIsEditing((prev) => !prev);
    };

    return (
        <>
            <article className="flex sm:flex-row flex-col items-center gap-4 w-full sm:h-auto min-h-[calc(100svh-9rem)] sm:min-h-[calc(100svh-17rem)]">
                <header className="flex flex-col justify-center items-center p-6 w-full sm:w-1/2 h-6/12 sm:h-full">
                    {userActive?.rol === "admin" &&
                        product?.visibilidad === 0 && (
                            <Button
                                colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light w-fit -mb-5 z-10"
                                toggle={() => publish()}
                            >
                                Publicar artículo
                            </Button>
                        )}
                    <img
                        src={
                            foto
                                ? `${staticPath}/articulos/${product.vendedorId}/${product.id}/${foto.foto}`
                                : "/imgs/no-img-available.png"
                        }
                        className="shadow-lg rounded-2xl w-full sm:w-8/12 h-full sm:h-auto object-cover"
                        alt={`Imagen de ${product.nombre}`}
                    />
                </header>

                <main className="flex lg:flex-row flex-col sm:justify-center items-center lg:items-start gap-8 bg-electric-violet-50 sm:bg-light p-6 rounded-t-4xl w-full sm:w-1/2 lg:w-3/4 h-6/12 sm:h-full">
                    <section className="w-full lg:w-1/2">
                        <h2 className="flex gap-4 font-display font-bold text-electric-violet-800 text-3xl">
                            {product.nombre}
                            {userSeller &&
                                userActive &&
                                userSeller.id == userActive.id && (
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        className="text-electric-violet-500 hover:text-electric-violet-800 text-3xl transition-colors duration-200 cursor-pointer"
                                        onClick={() => toggleVisible()}
                                    />
                                )}
                        </h2>
                        <p className="font-display font-bold text-electric-violet-800 text-3xl">
                            {product.precio}€
                        </p>
                        <p className="flex gap-4 font-body text-electric-violet-950">
                            <span className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faLocationDot} />
                                {product.localidad}
                            </span>
                            <span className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                {fecha}
                            </span>
                        </p>
                        <p className="sm:mt-4 font-body text-electric-violet-950">
                            {product.descripcion}
                        </p>
                    </section>
                    <section className="flex flex-col items-center sm:items-end gap-2 sm:gap-4 w-full lg:w-1/2">
                        {token &&
                            userSeller &&
                            userActive &&
                            userSeller.id !== userActive.id && (
                                <div className="flex flex-col items-center sm:items-end gap-1">
                                    <Button
                                        colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light w-fit"
                                        disabled={
                                            product.vendido === 1 ? true : false
                                        }
                                        toggle={() => purchase()}
                                    >
                                        Solicitar compra
                                    </Button>
                                    {product.vendido === 1 && (
                                        <p className="font-body text-electric-violet-950">
                                            Este producto ya se ha vendido
                                        </p>
                                    )}
                                </div>
                            )}

                        {userSeller && (
                            <section className="mt-10 sm:mt-6 font-display font-bold text-electric-violet-950 font-italic">
                                <p className="sm:text-left text-center uppercase">
                                    Vendido por:
                                </p>
                                <UserCard user={userSeller} />
                            </section>
                        )}
                    </section>
                </main>
            </article>

            <AnimatePresence initial={false}>
                {isEditing && (
                    <EditProductForm
                        isVisible={isEditing}
                        product={product}
                        toggle={toggleVisible}
                        token={token}
                        update={update}
                    />
                )}
            </AnimatePresence>
        </>
    );
};
