import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader.jsx";
import { RequestList } from "../components/products/RequestList.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useRedirect } from "../hooks/useRedirect.js";
import { useRequests } from "../hooks/useRequests.js";
import { useUser } from "../hooks/useUser.js";

export const BuyRequestsPage = () => {
    const { token } = useAuth();
    const { user } = useUser(null, token);
    const { solicitudes, loading } = useRequests();

    useRedirect("/solicitudes-compra");

    const navigate = useNavigate();
    if (user?.rol == "user") {
        const route = `/`;
        navigate(route);
    }

    return (
        <section className="bg-light p-6 lg:px-32 2xl:px-40 lg:py-8 w-full">
            <h2 className="font-display text-electric-violet-800 text-4xl">
                Solicitudes de compra
            </h2>
            {loading ? <Loader /> : <RequestList solicitudes={solicitudes} />}
        </section>
    );
};
