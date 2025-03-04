import { Loader } from "../components/Loader.jsx";
import { RequestList } from "../components/products/RequestList.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useUser } from "../hooks/useUser.js";
import { useRequestsByUser } from "../hooks/useRequestsByUser.js";

export const BuyRequestsUserPage = () => {
    const { token } = useAuth();
    const { user } = useUser(null, token);

    const { requests, loading } = useRequestsByUser(token);

    return (
        <section className="bg-light p-6 lg:px-32 2xl:px-40 lg:py-8 w-full">
            <h2 className="font-display text-electric-violet-800 text-4xl">
                Solicitudes de compra
            </h2>
            <p className="mt-4 font-body text-electric-violet-950">
                ¡Hola {user?.username}! Aquí puedes ver y aceptar/rechazar las
                solicitudes de compra de tus artículos en venta.
            </p>
            {loading ? (
                <Loader />
            ) : requests.length ? (
                <RequestList solicitudes={requests} />
            ) : (
                <p className="p-6 w-full text-electric-violet-950 text-center">
                    No hay solicitudes pendientes en tus artículos
                </p>
            )}
        </section>
    );
};
