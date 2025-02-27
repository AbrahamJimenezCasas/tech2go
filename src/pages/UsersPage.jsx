import { UsersList } from "../components/users/UsersList.jsx";

export const UsersPage = () => {
    return (
        <section>
            <h2>Usuarios</h2>
            <UsersList list={users} />
        </section>
    );
};
