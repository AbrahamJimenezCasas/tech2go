import { useSearchParams } from "react-router-dom";
import { ProductDetailCard } from "../components/products/ProductDetailCard.jsx";
import { useCategories } from "../hooks/useCategories.js";
import { useProducts } from "../hooks/useProducts.js";
import { useEffect, useState } from "react";

export const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const [filters, setFilters] = useState(`?${searchParams}`);

    const [categoryFilter, setCategoryFilter] = useState(null);
    const [placeFilter, setPlaceFilter] = useState(null);
    const [precioMinFilter, setPrecioMinFilter] = useState(null);
    const [precioMaxFilter, setPrecioMaxFilter] = useState(null);

    const { products } = useProducts(filters);
    const { categories } = useCategories();

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

    return (
        <>
            <section className="bg-electric-violet-800 w-full h-12"></section>
            <main className="lg:flex items-start">
                <aside className="hidden lg:flex flex-col p-10 border-r-1 border-r-electric-violet-200 w-1/4 h-auto font-body text-dark">
                    <section>
                        <p className="font-bold">Categoría</p>
                        <form>
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
                                        className="bg-light border-1 border-electric-violet-200 group-hover:border-electric-violet-800 focus:border-4 focus:border-electric-violet-800 rounded-full w-4 h-4 transition-colors duration-200 appearance-none"
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
                <section className="gap-5 sm:gap-10 xl:gap-12 2xl:gap-16 grid grid-cols-2 md:grid-cols-4 auto-rows-fr p-6 w-full lg:w-3/4">
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
                            <ProductDetailCard
                                key={product.id}
                                id={product.id}
                                name={product.nombre}
                                price={product.precio}
                                pic={pic}
                                pict2={pic2}
                            />
                        );
                    })}
                </section>
            </main>
        </>
    );
};
