import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ProductDetailCard } from "../components/products/ProductDetailCard.jsx";
import { useCategories } from "../hooks/useCategories.js";
import { useProducts } from "../hooks/useProducts.js";
import { Button } from "../components/Button.jsx";

export const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState(`?${searchParams}`);

    const [categoryFilter, setCategoryFilter] = useState(null);
    const [placeFilter, setPlaceFilter] = useState(null);
    const [precioMinFilter, setPrecioMinFilter] = useState(null);
    const [precioMaxFilter, setPrecioMaxFilter] = useState(null);

    const categoryRef = useRef();

    const { products } = useProducts(filters);
    const { categories } = useCategories();
    console.log(filters);

    const handleCategoryChange = (event) => {
        setCategoryFilter(`filtros[categoria]=${event.target.value}`);
        const array = [
            `filtros[categoria]=${event.target.value}`,
            placeFilter,
            precioMinFilter,
            precioMaxFilter,
        ];
        setFilters(`?${array.filter((n) => n).join("&")}`);
    };

    useEffect(() => {
        setFilters(`?${searchParams}`);
        categoryRef.current.reset();
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
                <aside
                    className={`${isOpen ? "scale-100" : "scale-0"} top-10 right-0 absolute lg:relative lg:flex flex-col bg-electric-violet-200/20 lg:bg-transparent backdrop-blur-lg p-10 border-r-1 border-r-electric-violet-200 rounded-3xl lg:rounded-none lg:w-1/4 h-auto font-body lg:scale-100 text-dark origin-top-right -translate-x-8 md:-translate-x-6 transition-all duration-200 z-20`}
                >
                    <section>
                        <p className="font-bold">Categoría</p>
                        <form ref={categoryRef}>
                            {categories.map((category, index) => (
                                <label
                                    className="group flex items-center gap-2 mt-2 w-fit text-electric-violet-950 capitalize cursor-pointer"
                                    key={index}
                                >
                                    <input
                                        type="radio"
                                        name="categoria"
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
                    </section>
                    <section className="mt-6">
                        <p className="font-bold">Localidad</p>
                    </section>
                </aside>

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
