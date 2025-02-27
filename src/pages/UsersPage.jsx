import { UsersList } from "../components/users/UsersList.jsx";
import { useAllUsers } from "../hooks/useAllUsers.js";
export const UsersPage = () => {
    const { users, loading, error } = useAllUsers();
    return (
        <section className="bg-light p-6 lg:px-32 2xl:px-40 lg:py-8 w-full ">
            <h2 className="font-display text-electric-violet-800 text-4xl">
                Usuarios
            </h2>
            <UsersList users={users} />
        </section>
    );
};
