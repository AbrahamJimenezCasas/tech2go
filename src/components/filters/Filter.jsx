export const Filter = ({ section, children }) => {
    return (
        <section className="mt-4">
            <p className="font-bold">{section}</p>
            {children}
        </section>
    );
};
