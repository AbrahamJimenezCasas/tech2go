import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useProducts } from "../../hooks/useProducts.js";
import { Link } from "react-router-dom";

export const Search = () => {
    const [search, setSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const { products } = useProducts(`?search=${search}`);

    const handleChange = (event) => {
        setSearch(event.target.value);
        setIsSearching(true);
        if (event.target.value === "") {
            setIsSearching(false);
        }
    };

    useEffect(() => {
        if (!products.length) {
            setIsSearching(false);
        }
    }, [products]);

    return (
        <section className="relative w-full lg:w-7/12 xl:w-1/2 font-body text-electric-violet-950">
            <div className="relative">
                <input
                    type="text"
                    name="search"
                    value={search}
                    onChange={handleChange}
                    placeholder="Busca un artículo por su nombre"
                    autoComplete="off"
                    className="bg-electric-violet-50 px-6 py-2 border-2 border-electric-violet-50 focus:border-electric-violet-300 rounded-3xl focus:outline-none focus:ring-0 w-full transition-colors duration-200"
                />
                <img
                    className="top-0 right-2 absolute w-16 pointer-events-none"
                    onClick={() => setIsSearching(false)}
                    src="/imgs/spyro.png"
                    alt="Spyro"
                />
            </div>
            <AnimatePresence initial={false}>
                {isSearching && (
                    <motion.ul
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{ duration: 0.2 }}
                        className="top-12 z-20 absolute bg-electric-violet-50 py-5 rounded-3xl w-full origin-top"
                    >
                        {products.map((product) => (
                            <li
                                key={product.id}
                                className="hover:bg-electric-violet-100 px-6 py-2 w-full hover:text-electric-violet-800 transition-colors duration-200 cursor-pointer"
                            >
                                <Link
                                    to={`/articulos/${product.id}`}
                                    onClick={() => {
                                        setIsSearching(false);
                                    }}
                                >
                                    {product.nombre}
                                </Link>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </section>
    );
};
