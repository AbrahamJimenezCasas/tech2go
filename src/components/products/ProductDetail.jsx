import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth.js";
import { sendPurchaseRequestService } from "../../services/fetchApi.js";
import { Button } from "../Button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/dayJs.js";
import { useUser } from "../../hooks/useUser.js";
import { UserCard } from "../users/UserCard.jsx";

export const ProductDetail = ({ product }) => {
    const { token } = useAuth();

    const staticPath = import.meta.env.VITE_BACKEND_STATIC;
    const fotos = product.fotos;
    const foto = fotos ? fotos[0] : null;
    const fecha = formatDate(product.fechaCreacion);
    const { user } = useUser(product?.vendedorId);
    console.log(user);

    const purchase = async () => {
        try {
            const message = await sendPurchaseRequestService(product.id, token);
            console.log(message);
            toast.success(message);
        } catch (error) {
            console.log(error.message);
            toast.error(
                error.message || "Error al enviar la solicitud de compra."
            );
        }
    };

    return (
        <article className="flex sm:flex-row flex-col items-center gap-4 w-full sm:h-auto min-h-[calc(100svh-9rem)] sm:min-h-[calc(100svh-17rem)]">
            <header className="flex justify-center items-center p-6 w-full sm:w-1/2 h-6/12 sm:h-full">
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
                    <h2 className="font-display font-bold text-electric-violet-800 text-3xl">
                        {product.nombre}
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
                    {token && (
                        <Button
                            colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light w-fit "
                            toggle={() => purchase()}
                        >
                            Solicitar Compra
                        </Button>
                    )}
                    {user && <UserCard user={user} />}
                </section>
            </main>
        </article>
        // <section className="flex justify-center items-center bg-electric-violet-200 shadow-lg mt-10 rounded-lg w-full min-h-screen overflow-hidden">
        //     <article className="flex justify-center items-center bg-electric-violet-200 p-6 w-full md:w-1/3">
        //         <img
        //             className="rounded-lg w-50 md:w-64 h-50 object-cover"
        //             src={product.imageUrl}
        //             alt={product.nombre}
        //         ></img>
        //     </article>
        //     <article className="p-8">
        //         <p className="text-electric-violet-500 text-lg leading-tight">
        //             Nombre:{" "}
        //             <p className="mt-1 text-black text-sm"> {product.nombre}</p>
        //         </p>
        //         <article className="mt-1 text-electric-violet-500 text-lg leading-tight">
        //             Categoria:{" "}
        //             <p className="mt-1 text-black text-sm">
        //                 {" "}
        //                 {product.categoria}
        //             </p>
        //         </article>
        //         <p className="text-electric-violet-500 text-lg leading-tight">
        //             Descripción:{" "}
        //             <p className="mt-1 text-black text-sm">
        //                 {" "}
        //                 {product.descripcion}
        //             </p>
        //         </p>
        //         <p className="text-electric-violet-500 text-lg leading-tight">
        //             Precio:
        //             <p className="mt-1 text-black text-sm">
        //                 {product.precio} €{" "}
        //             </p>
        //         </p>
        //         <p className="text-electric-violet-500 text-lg leading-tight">
        //             Localidad:{" "}
        //             <p className="mt-1 text-black text-sm">
        //                 {product.localidad}
        //             </p>
        //         </p>
        //         {token && (
        //             <Button
        //                 colors="mt-8  bg-light hover:bg-electric-violet-50 text-electric-violet-800 "
        //                 toggle={() => purchase()}
        //             >
        //                 {" "}
        //                 Solicitar Compra
        //             </Button>
        //         )}
        //     </article>
        // </section>
    );
};
