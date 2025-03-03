import { useAllUsers } from "../hooks/useAllUsers.js";
import { Loader } from "../components/Loader.jsx";
import { UsersList } from "../components/users/UsersList.jsx";
import { useRedirect } from "../hooks/useRedirect.js";

export const UsersPage = () => {
    const { users, loading } = useAllUsers();
    useRedirect("/usuarios");

    return (
        <section className="bg-light p-6 lg:px-32 2xl:px-40 lg:py-8 w-full">
            <h2 className="font-display text-electric-violet-800 text-4xl">
                Usuarios
            </h2>
            {loading ? <Loader /> : <UsersList users={users} />}
        </section>
    );
};
