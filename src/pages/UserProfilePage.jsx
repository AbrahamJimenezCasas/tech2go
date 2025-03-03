import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth.js";
import { useUser } from "../hooks/useUser.js";
import { Star } from "../components/Star.jsx";
import { RequestCard } from "../components/products/RequestCard.jsx";
import { SaleCard } from "../components/products/SaleCard.jsx";
import { useRedirect } from "../hooks/useRedirect.js";
import { Loader } from "../components/Loader.jsx";

export const UserProfilePage = () => {
    const { token, currentUser } = useAuth();
    const { id } = useParams();
    const { user, sales, requests, loading } = useUser(id, token);
    const staticPath = import.meta.env.VITE_BACKEND_STATIC;
    const rating = Math.floor(user?.valoracionMediaVendedor);

    useRedirect("/usuario");

    return (
        <main>
            <header className="flex flex-col gap-2 bg-electric-violet-800 p-6 lg:px-32 2xl:px-40 lg:py-8 w-full">
                <div className="flex md:flex-row flex-col md:justify-between gap-4">
                    <section className="flex items-center gap-4">
                        {user?.avatar ? (
                            <img
                                src={`${staticPath}/avatars/${user.id}/${user.avatar}`}
                                alt={user?.username}
                                className="rounded-full w-16 h-16 object-cover"
                            />
                        ) : (
                            <div className="flex justify-center items-center bg-electric-violet-50 rounded-full min-w-16 min-h-16">
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="text-electric-violet-200 text-3xl"
                                />
                            </div>
                        )}
                        <h2 className="flex justify-between md:justify-start items-center md:gap-4 w-full font-display font-bold text-electric-violet-50 text-4xl">
                            {user?.username}

                            {currentUser && currentUser?.id === user?.id && (
                                <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    className="text-electric-violet-200 hover:text-light text-3xl transition-colors duration-200 cursor-pointer"
                                />
                            )}
                        </h2>
                    </section>
                    <section className="flex gap-2">
                        {user?.valoracionMediaVendedor &&
                            [...Array(rating)].map((e, i) => (
                                <Star
                                    key={i}
                                    classes="w-10 stroke-electric-violet-100 fill-electric-violet-100"
                                />
                            ))}
                        {user?.valoracionMediaVendedor &&
                            [...Array(5 - rating)].map((e, i) => (
                                <Star
                                    key={i}
                                    classes="w-10 stroke-electric-violet-100"
                                />
                            ))}
                    </section>
                </div>

                <p className="mt-4 md:-mt-4 md:ml-20 font-body text-electric-violet-50">
                    {user?.biografia}
                </p>
            </header>
            <section className="flex lg:flex-row flex-col lg:justify-between gap-16 p-6 lg:px-32 2xl:px-40 lg:py-8 w-full">
                <section className="w-full lg:w-1/2 font-body">
                    <h3 className="font-bold text-electric-violet-950 text-lg">
                        Ventas
                    </h3>
                    {loading ? (
                        <Loader />
                    ) : sales ? (
                        <ul className="flex flex-col gap-4 mt-4">
                            {sales.map((sale, index) => (
                                <SaleCard
                                    key={index}
                                    sale={sale}
                                    index={index}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-4">
                            {user?.username} todavía no ha vendido ningún
                            artículo
                        </p>
                    )}
                </section>
                <section className="w-full lg:w-1/2 font-body">
                    <h3 className="font-bold text-electric-violet-950 text-lg">
                        Solicitudes de compra
                    </h3>

                    {loading ? (
                        <Loader />
                    ) : requests ? (
                        <ul className="flex flex-col gap-4 mt-4">
                            {requests.map((request, index) => (
                                <RequestCard
                                    key={request.solicitudId}
                                    solicitud={request}
                                    index={index}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-4">
                            {user?.username} no ha realizado ninguna solicitud
                            de compra
                        </p>
                    )}
                </section>
            </section>
        </main>
    );
};
