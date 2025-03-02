import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ProductDetailCard } from "../components/products/ProductDetailCard.jsx";
import { useCategories } from "../hooks/useCategories.js";
import { useProducts } from "../hooks/useProducts.js";
import { Button } from "../components/Button.jsx";
import { Filters } from "../components/products/Filters.jsx";
import { useLocations } from "../hooks/useLocations.js";

export const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState(`?${searchParams}`);

    const { products } = useProducts(filters);
    const { categories } = useCategories();
    const { locations } = useLocations();

    const [categoryFilter, setCategoryFilter] = useState(null);
    const [locationFilter, setLocationFilter] = useState(null);
    const [minPriceFilter, setMinPriceFilter] = useState(null);
    const [maxPriceFilter, setMaxPriceFilter] = useState(null);

    const categoryRef = useRef();
    const locationRef = useRef();

    const handleCategoryChange = (event) => {
        const filter =
            event.target.value !== ""
                ? `filtros[categoria]=${event.target.value}`
                : "";
        setCategoryFilter(filter);
        const array = [filter, locationFilter, minPriceFilter, maxPriceFilter];
        setFilters(`?${array.filter((n) => n).join("&")}`);
    };

    const handleLocationChange = (event) => {
        const filter =
            event.target.value !== ""
                ? `filtros[localidad]=${event.target.value}`
                : "";
        setLocationFilter(filter);
        const array = [filter, categoryFilter, minPriceFilter, maxPriceFilter];
        setFilters(`?${array.filter((n) => n).join("&")}`);
    };

    useEffect(() => {
        setFilters(`?${searchParams}`);
        categoryRef.current.reset();
        locationRef.current.reset();
    }, [searchParams]);

    return (
        <>
            <section className="flex justify-end bg-electric-violet-800 px-6 lg:px-32 2xl:px-40 py-2 w-full h-16">
                <Button
                    toggle={() => setIsOpen((prev) => !prev)}
                    colors="bg-electric-violet-50 hover:bg-electric-violet-900 
                                                    text-electric-violet-800 hover:text-electric-violet-50 lg:hidden"
                >
                    Filtros
                </Button>
            </section>
            <main className="relative lg:flex items-start px-6 lg:px-32 2xl:px-40 py-2 w-full">
                <Filters
                    isOpen={isOpen}
                    categories={categories}
                    handleCategoryChange={handleCategoryChange}
                    categoryRef={categoryRef}
                    locations={locations}
                    handleLocationChange={handleLocationChange}
                    locationRef={locationRef}
                />

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
            </main>
        </>
    );
};
