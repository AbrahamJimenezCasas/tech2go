import { PriceSlider } from "./PriceSlider.jsx";

export const Filters = ({
    isOpen,
    categories,
    handleCategoryChange,
    categoryRef,
    locations,
    handleLocationChange,
    locationRef,
}) => {
    return (
        <aside
            className={`${isOpen ? "scale-100" : "scale-0"} top-10 right-0 absolute lg:relative lg:flex flex-col bg-electric-violet-200/20 lg:bg-transparent backdrop-blur-lg p-10 border-r-1 border-r-electric-violet-200 rounded-3xl lg:rounded-none w-72 h-auto font-body lg:scale-100 text-dark origin-top-right -translate-x-8 md:-translate-x-6 transition-all duration-200 z-20`}
        >
            <section>
                <p className="font-bold">Categoría</p>
                <form ref={categoryRef}>
                    <label className="group flex items-center gap-2 mt-2 w-fit text-electric-violet-950 capitalize cursor-pointer">
                        <input
                            type="radio"
                            name="category"
                            value=""
                            onChange={handleCategoryChange}
                            className="bg-light border-1 border-electric-violet-200 checked:border-4 checked:border-electric-violet-800 group-hover:border-electric-violet-800 rounded-full w-4 h-4 transition-colors duration-200 appearance-none"
                        />
                        Todas
                    </label>
                    {categories.map((category, index) => (
                        <label
                            className="group flex items-center gap-2 mt-2 w-fit text-electric-violet-950 capitalize cursor-pointer"
                            key={index}
                        >
                            <input
                                type="radio"
                                name="category"
                                value={category.categoria}
                                onChange={handleCategoryChange}
                                className="bg-light border-1 border-electric-violet-200 checked:border-4 checked:border-electric-violet-800 group-hover:border-electric-violet-800 rounded-full w-4 h-4 transition-colors duration-200 appearance-none"
                            />
                            {category.categoria}
                        </label>
                    ))}
                </form>
            </section>
            <section className="mt-6">
                <p className="font-bold">Precio</p>
                <PriceSlider min={0} max={1000} />
            </section>
            <section className="mt-6">
                <p className="font-bold">Localidad</p>
                <form ref={locationRef}>
                    <label className="group flex items-center gap-2 mt-2 w-fit text-electric-violet-950 capitalize cursor-pointer">
                        <input
                            type="radio"
                            name="location"
                            value=""
                            onChange={handleLocationChange}
                            className="bg-light border-1 border-electric-violet-200 checked:border-4 checked:border-electric-violet-800 group-hover:border-electric-violet-800 rounded-full w-4 h-4 transition-colors duration-200 appearance-none"
                        />
                        Todas
                    </label>
                    {locations.map((location, index) => (
                        <label
                            className="group flex items-center gap-2 mt-2 w-fit text-electric-violet-950 capitalize cursor-pointer"
                            key={index}
                        >
                            <input
                                type="radio"
                                name="location"
                                value={location.localidad}
                                onChange={handleLocationChange}
                                className="bg-light border-1 border-electric-violet-200 checked:border-4 checked:border-electric-violet-800 group-hover:border-electric-violet-800 rounded-full w-4 h-4 transition-colors duration-200 appearance-none"
                            />
                            {location.localidad}
                        </label>
                    ))}
                </form>
            </section>
        </aside>
    );
};
