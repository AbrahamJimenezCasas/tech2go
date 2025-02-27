import { Icon } from "../Icon.jsx";

export const UserCard = ({ usuario }) => {
    const staticPath = import.meta.env.VITE_BACKEND_STATIC;

    return (
        <li>
            <article>
                <h3>{usuario.username}</h3>
                {usuario.avatar ? (
                    <img
                        src={`${staticPath}/${usuario.id}/${usuario.avatar}`}
                        alt={usuario.username}
                    />
                ) : (
                    <Icon name="account_circle" />
                )}
            </article>
        </li>
    );
};
