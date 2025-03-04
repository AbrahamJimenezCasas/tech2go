import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useProducts } from "../hooks/useProducts.js";
import { useCategories } from "../hooks/useCategories.js";
import { usePriceRange } from "../hooks/usePrices.js";
import { useLocations } from "../hooks/useLocations.js";
import { ProductDetailCard } from "../components/products/ProductDetailCard.jsx";
import { Button } from "../components/Button.jsx";
import { Filter } from "../components/filters/Filter.jsx";
import { CategoryFilter } from "../components/filters/CategoryFilter.jsx";
import { LocationFilter } from "../components/filters/LocationFilter.jsx";
import { PriceFilter } from "../components/filters/PriceFilter.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

export const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState(`?${searchParams}`);

    const { products } = useProducts(filters);
    const { categories } = useCategories();
    const [categoriesChecked, setCategoriesChecked] = useState([]);
    const { locations } = useLocations();
    const { minPrice, maxPrice } = usePriceRange();
    const [clean, setClean] = useState(false);

    const [categoryFilter, setCategoryFilter] = useState(null);
    const [locationFilter, setLocationFilter] = useState(null);
    const [minPriceFilter, setMinPriceFilter] = useState(null);
    const [maxPriceFilter, setMaxPriceFilter] = useState(null);

    const sorts = [
        { sort: "nombre", nombre: "Nombre" },
        { sort: "precio", nombre: "Precio" },
        { sort: "fechaCreacion", nombre: "Fecha" },
        { sort: "valoracionMediaVendedor", nombre: "Valoración" },
    ];
    const [sortFilter, setSortFilter] = useState(null);
    const [active, setActive] = useState(null);
    const [activeIcon, setActiveIcon] = useState(faArrowUp);

    const categoryRef = useRef();
    const locationRef = useRef();

    const handleCategoryChange = (event) => {
        const filter = `filtros[categoria]=${event.target.value}`;
        setCategoryFilter(filter);

        const array = [
            filter,
            locationFilter,
            minPriceFilter,
            maxPriceFilter,
            sortFilter,
        ];
        setFilters(`?${array.filter((n) => n).join("&")}`);
    };

    const handleMinPriceChange = (event) => {
        const filter = `precio[min]=${event.target.value}`;
        setMinPriceFilter(filter);
        const array = [
            categoryFilter,
            locationFilter,
            filter,
            maxPriceFilter,
            sortFilter,
        ];
        setFilters(`?${array.filter((n) => n).join("&")}`);
    };

    const handleMaxPriceChange = (event) => {
        const filter = `precio[max]=${event.target.value}`;
        setMaxPriceFilter(filter);
        const array = [
            categoryFilter,
            locationFilter,
            minPriceFilter,
            filter,
            sortFilter,
        ];
        setFilters(`?${array.filter((n) => n).join("&")}`);
    };

    const handleLocationChange = (event) => {
        const filter = `filtros[localidad]=${event.target.value}`;
        setLocationFilter(filter);
        const array = [
            filter,
            categoryFilter,
            minPriceFilter,
            maxPriceFilter,
            sortFilter,
        ];
        setFilters(`?${array.filter((n) => n).join("&")}`);
    };

    useEffect(() => {
        setFilters(`?${searchParams}`);
        setCategoryFilter(`${searchParams}`);
        setLocationFilter("");
        setMinPriceFilter("");
        setMaxPriceFilter("");
        setSortFilter("");
        setActive(null);
        setActiveIcon(faArrowUp);
        categoryRef.current.reset();
        locationRef.current.reset();
        const checked = categories.map((category) => {
            const categoria = category.categoria;
            const params = `${searchParams}`;
            const checked = params.includes(category.categoria);
            return { categoria, checked };
        });
        setCategoriesChecked(checked);
    }, [searchParams, categories]);

    const handleCleanFilters = () => {
        setFilters("");
        setCategoryFilter(null);
        setLocationFilter(null);
        setMinPriceFilter(null);
        setMaxPriceFilter(null);
        categoryRef.current.reset();
        locationRef.current.reset();
        setClean((prev) => !prev);

        const checked = categories.map((category) => {
            const categoria = category.categoria;
            return { categoria, checked: false };
        });
        setCategoriesChecked(checked);
    };

    const handleSortChange = (sort) => {
        setActive(sort);

        if (activeIcon === faArrowUp) {
            setActiveIcon(faArrowDown);
        } else {
            setActiveIcon(faArrowUp);
        }

        const direction = activeIcon === faArrowUp ? "ASC" : "DESC";

        const filter = `order[by]=${sort}&order[direction]=${direction}`;
        setSortFilter(filter);

        const array = [
            categoryFilter,
            locationFilter,
            minPriceFilter,
            maxPriceFilter,
            filter,
        ];

        setFilters(`?${array.filter((n) => n).join("&")}`);
    };

    return (
        <>
            <section className="flex justify-end items-center gap-8 bg-electric-violet-800 px-6 lg:px-32 2xl:px-40 py-2 w-full h-16">
                <ul className="flex gap-4 text-electric-violet-300">
                    {sorts.map((sort, i) => (
                        <li
                            key={i}
                            className={`${active === sort.sort && "text-electric-violet-50"} flex items-center gap-1 hover:text-electric-violet-50 capitalize transition-colors duration-200 cursor-pointer`}
                            onClick={() => handleSortChange(sort.sort)}
                        >
                            {sort.nombre}

                            {active === sort.sort ? (
                                <FontAwesomeIcon icon={activeIcon} />
                            ) : (
                                <FontAwesomeIcon icon={faArrowUp} />
                            )}
                        </li>
                    ))}
                </ul>
                <Button
                    toggle={() => setIsOpen((prev) => !prev)}
                    colors="bg-electric-violet-50 hover:bg-electric-violet-900 text-electric-violet-800 hover:text-electric-violet-50 lg:hidden"
                >
                    Filtros
                </Button>
            </section>
            <main className="relative lg:flex items-start px-6 lg:px-32 2xl:px-40 py-2 w-full">
                <aside
                    className={`${isOpen ? "scale-100" : "scale-0"} top-10 right-0 absolute lg:sticky lg:flex flex-col bg-electric-violet-200/20 lg:bg-transparent backdrop-blur-lg p-10 border-r-1 border-r-electric-violet-200 rounded-3xl lg:rounded-none w-72 h-auto font-body lg:scale-100 text-dark origin-top-right -translate-x-8 md:-translate-x-6 transition-all duration-200 z-10`}
                >
                    <Filter section="Categoría">
                        <CategoryFilter
                            ref={categoryRef}
                            filters={categoriesChecked}
                            handleChange={handleCategoryChange}
                        />
                    </Filter>

                    <Filter section="Precio">
                        {minPrice > 0 && (
                            <PriceFilter
                                min={minPrice}
                                max={maxPrice}
                                handleMinChange={handleMinPriceChange}
                                handleMaxChange={handleMaxPriceChange}
                                clean={clean}
                            />
                        )}
                    </Filter>

                    <Filter section="Localidad">
                        <LocationFilter
                            ref={locationRef}
                            filters={locations}
                            handleChange={handleLocationChange}
                        />
                    </Filter>
                    <Button
                        colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light mt-8"
                        toggle={handleCleanFilters}
                    >
                        Limpiar filtros
                    </Button>
                </aside>
                {products.length ? (
                    <section className="gap-5 sm:gap-10 xl:gap-12 2xl:gap-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr p-6 w-full">
                        <AnimatePresence initial={false}>
                            {products.map((product) => {
                                let pic = null;
                                let pic2 = null;
                                if (product.fotos[0]) {
                                    pic = `${product.vendedorId}/${product.id}/${product.fotos[0].foto}`;
                                }
                                if (product.fotos[1]) {
                                    pic2 = `${product.vendedorId}/${product.id}/${product.fotos[1].foto}`;
                                }
                                return (
                                    <motion.article
                                        key={product.id}
                                        layout
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <ProductDetailCard
                                            id={product.id}
                                            name={product.nombre}
                                            price={product.precio}
                                            pic={pic}
                                            pict2={pic2}
                                        />
                                    </motion.article>
                                );
                            })}
                        </AnimatePresence>
                    </section>
                ) : (
                    <p className="p-6 w-full text-electric-violet-950 text-center">
                        No se han encontrado productos con los filtros
                        proporcionados
                    </p>
                )}
            </main>
        </>
    );
};
