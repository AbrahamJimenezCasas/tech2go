import { Loader } from "../components/Loader.jsx";
import { RequestList } from "../components/products/RequestList.jsx";
import { useRequests } from "../hooks/useRequests.js";

export const BuyRequestsPage = () => {
    const { solicitudes, loading } = useRequests();

    return (
        <section className="bg-light p-6 lg:px-32 2xl:px-40 lg:py-8 w-full">
            <h2 className="font-display text-electric-violet-800 text-4xl">
                Solicitudes de Compra
            </h2>
            {loading ? <Loader /> : <RequestList solicitudes={solicitudes} />}
        </section>
    );
};
