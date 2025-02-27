export const Card = ({ children }) => {
    return (
        <li className="flex items-center gap-4 justify-between shadow-2xl shadow-dark/20 px-4 py-2 rounded-3xl w-full h-16 list-none hover:bg-electric-violet-200 transition-colors duration-200">
            {children}
        </li>
    );
};
