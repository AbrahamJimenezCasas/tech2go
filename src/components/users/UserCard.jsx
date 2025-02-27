import { Card } from "../Card.jsx";

export const UserCard = ({ usuario }) => {
    const staticPath = import.meta.env.VITE_BACKEND_STATIC;

    return (
        <Card>
            <img
                className="rounded-full h-11/12"
                src="/imgs/no-img-available.png"
            />
            <h3 className="font-body font-bold text-electric-violet-950">
                {/* {usuario.username} */}
                Usuario
            </h3>
        </Card>
    );
};
