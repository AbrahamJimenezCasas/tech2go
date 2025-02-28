import { Link } from "react-router-dom";
import { Card } from "../Card.jsx";
import { Star } from "../Star.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const UserCard = ({ index, user }) => {
    const staticPath = import.meta.env.VITE_BACKEND_STATIC;
    const rating = Math.floor(user?.valoracionMediaVendedor);
    return (
        <Link to={`/usuario/${user.id}`}>
            <Card index={index}>
                <div className="flex items-center gap-4 h-full">
                    {user?.avatar ? (
                        <img
                            src={`${staticPath}/avatars/${user.id}/${user.avatar}`}
                            alt={user?.username}
                            className="rounded-full w-10 h-10"
                        />
                    ) : (
                        <div className="flex justify-center items-center bg-electric-violet-50 rounded-full min-w-10 min-h-10">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="text-electric-violet-200 text-3xl"
                            />
                        </div>
                    )}
                    <h3 className="font-body font-bold text-electric-violet-950">
                        {user.username}
                    </h3>
                </div>
                <section className="flex gap-1">
                    {user?.valoracionMediaVendedor &&
                        [...Array(rating)].map((e, i) => (
                            <Star
                                key={i}
                                classes="w-6 stroke-electric-violet-800 fill-electric-violet-800"
                            />
                        ))}
                    {user?.valoracionMediaVendedor &&
                        [...Array(5 - rating)].map((e, i) => (
                            <Star
                                key={i}
                                classes="w-6 stroke-electric-violet-800"
                            />
                        ))}
                </section>
            </Card>
        </Link>
    );
};
