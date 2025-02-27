import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth.js";
import { useUser } from "../hooks/useUser.js";
import { Star } from "../components/Star.jsx";

export const UserProfilePage = () => {
    const { token, currentUser } = useAuth();
    const { id } = useParams();
    const { user } = useUser(id, token);
    const staticPath = import.meta.env.VITE_BACKEND_STATIC;
    const rating = Math.floor(user?.valoracionMediaVendedor);

    const navigate = useNavigate();

    useEffect(() => {
        if (!token && !id) {
            navigate("/login/?redirect=usuario");
        }
    }, [token]);

    return (
        <main>
            <header className="flex flex-col gap-2 bg-electric-violet-800 p-6 lg:px-32 2xl:px-40 lg:py-8 w-full">
                <div className="flex md:flex-row flex-col md:justify-between gap-4">
                    <section className="flex items-center gap-4">
                        {user?.avatar ? (
                            <img
                                src={`${staticPath}/avatars/${user.id}/${user.avatar}`}
                                alt={user?.username}
                                className="rounded-full w-16 h-16"
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
        </main>
    );
};
