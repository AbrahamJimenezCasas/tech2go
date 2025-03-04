import { Loader } from "../components/Loader.jsx";
import { RequestList } from "../components/products/RequestList.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useRequests } from "../hooks/useRequests.js";
import { useUser } from "../hooks/useUser.js";

export const BuyRequestsPage = () => {
    const { token } = useAuth();
    const { user } = useUser(null, token);
    const { solicitudes, loading } = useRequests();

    return (
        <section className="bg-light p-6 lg:px-32 2xl:px-40 lg:py-8 w-full">
            <h2 className="font-display text-electric-violet-800 text-4xl">
                Solicitudes de compra
            </h2>
            <p className="mt-4 font-body text-electric-violet-950">
                ¡Hola {user?.username}! Aquí puedes ver y aceptar/rechazar las
                solicitudes de compra de tus artículos en venta.
            </p>
            {loading ? <Loader /> : <RequestList solicitudes={solicitudes} />}
        </section>
    );
};
