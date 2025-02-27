import { UserCard } from "./UserCard.jsx";

export const UsersList = ({ users }) => {
    return (
        <ul className="grid grid-cols-1 auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4 lg:mt-10">
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </ul>
    );
};
