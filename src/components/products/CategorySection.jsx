import { useProducts } from "../../hooks/useProducts.js";
import { Button } from "../Button.jsx";
import { ProductCard } from "./ProductCard.jsx";

export const CategorySection = ({ category, name }) => {
    const mostValued = useProducts(
        `?filtros[categoria]=${category}&order[by]=valoracionMediaVendedor&order[direction]=DESC&limit=4`
    );
    const mostValuedProducts = mostValued.products;
    const recent = useProducts(
        `?filtros[categoria]=${category}&order[by]=fechaCreacion&order[direction]=DESC&limit=4`
    );
    const recentProducts = recent.products;

    return (
        <section className="flex flex-col gap-2 bg-light p-6 lg:px-32 2xl:px-40 lg:py-8 w-full">
            <h3 className="font-display text-electric-violet-800 text-4xl">
                {name}
            </h3>
            <section>
                <h4 className="font-body font-bold text-electric-violet-950 text-lg">
                    Mejor valorados
                </h4>
                <section className="gap-5 sm:gap-10 xl:gap-20 grid grid-cols-2 md:grid-cols-4 pt-2">
                    {mostValuedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.nombre}
                            price={product.precio}
                            pic={product.fotos[0]}
                        />
                    ))}
                </section>
            </section>
            <section className="pt-4">
                <h4 className="font-body font-bold text-electric-violet-950 text-lg">
                    Novedades
                </h4>
                <section className="gap-5 sm:gap-10 xl:gap-20 grid grid-cols-2 md:grid-cols-4 pt-2">
                    {recentProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.nombre}
                            price={product.precio}
                            pic={product.fotos[0]}
                        />
                    ))}
                </section>
            </section>
            <Button colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light mt-6 w-fit self-center">
                Ver todos
            </Button>
        </section>
    );
};
