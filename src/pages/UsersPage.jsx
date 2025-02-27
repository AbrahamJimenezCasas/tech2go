import { UsersList } from "../components/users/UsersList.jsx";
import users from "../mocks/users.json";

export const UsersPage = () => {
    return (
        <section>
            <h2>Usuarios</h2>
            <UsersList list={users} />
        </section>
    );
};
