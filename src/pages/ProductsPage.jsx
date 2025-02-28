import { useSearchParams } from "react-router-dom";
import { ProductDetailCard } from "../components/products/ProductDetailCard.jsx";
import { useCategories } from "../hooks/useCategories.js";
import { useProducts } from "../hooks/useProducts.js";

export const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const { products } = useProducts(`?${searchParams}`);
    const { categories } = useCategories();

    return (
        <>
            <section className="bg-electric-violet-800 w-full h-12"></section>
            <main className="lg:flex items-start">
                <aside className="hidden lg:flex flex-col p-10 border-r-1 border-r-electric-violet-200 w-1/4 h-auto font-body text-dark">
                    <section>
                        <p className="font-bold">Categoría</p>
                        <ul>
                            {categories.map((category, index) => (
                                <li className="capitalize" key={index}>
                                    {category.categoria}
                                </li>
                            ))}
                        </ul>
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
