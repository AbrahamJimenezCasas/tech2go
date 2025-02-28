import { UserCard } from "./UserCard.jsx";

export const UsersList = ({ users }) => {
    return (
        <ul className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr mt-4 lg:mt-10">
            {users.map((user, index) => (
                <UserCard index={index} key={user.id} user={user} />
            ))}
        </ul>
    );
};
