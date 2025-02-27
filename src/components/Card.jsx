export const Card = ({ children }) => {
    return (
        <li className="flex items-center gap-4 shadow-2xl shadow-dark/20 px-4 py-2 rounded-3xl w-96 h-16 list-none">
            {children}
        </li>
    );
};
