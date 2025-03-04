export const LocationFilter = ({ ref, filters, handleChange }) => {
    return (
        <form ref={ref}>
            {filters.map((location, index) => (
                <label
                    className="group flex items-center gap-2 mt-2 w-fit text-electric-violet-950 capitalize cursor-pointer"
                    key={index}
                >
                    <input
                        type="radio"
                        name="location"
                        value={location.localidad}
                        onChange={handleChange}
                        className="bg-light border-1 border-electric-violet-200 checked:border-4 checked:border-electric-violet-800 group-hover:border-electric-violet-800 rounded-full w-4 h-4 transition-colors duration-200 appearance-none"
                    />
                    {location.localidad}
                </label>
            ))}
        </form>
    );
};
