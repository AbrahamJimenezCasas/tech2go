export const CategoryFilter = ({ ref, filters, handleChange }) => {
    return (
        <form ref={ref}>
            <label className="group flex items-center gap-2 mt-2 w-fit text-electric-violet-950 capitalize cursor-pointer">
                <input
                    type="radio"
                    name="category"
                    value=""
                    onChange={handleChange}
                    defaultChecked={true}
                    className="bg-light border-1 border-electric-violet-200 checked:border-4 checked:border-electric-violet-800 group-hover:border-electric-violet-800 rounded-full w-4 h-4 transition-colors duration-200 appearance-none"
                />
                Todas
            </label>
            {filters.map((category, index) => (
                <label
                    className="group flex items-center gap-2 mt-2 w-fit text-electric-violet-950 capitalize cursor-pointer"
                    key={index}
                >
                    <input
                        type="radio"
                        name="category"
                        value={category.categoria}
                        onChange={handleChange}
                        defaultChecked={category.checked}
                        className="bg-light border-1 border-electric-violet-200 checked:border-4 checked:border-electric-violet-800 group-hover:border-electric-violet-800 rounded-full w-4 h-4 transition-colors duration-200 appearance-none"
                    />
                    {category.categoria}
                </label>
            ))}
        </form>
    );
};
