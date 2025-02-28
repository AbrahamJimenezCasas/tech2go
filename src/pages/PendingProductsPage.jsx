import { useAuth } from "../hooks/useAuth.js";
import { useEffect, useState } from "react";
import { getPendingProductsService } from "../services/fetchApi.js";
import { ProductCard } from "../components/products/ProductCard.jsx";
import { useRedirect } from "../hooks/useRedirect.js";
import { useUser } from "../hooks/useUser.js";
import { useNavigate } from "react-router-dom";

export const PendingProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { token } = useAuth();
    useRedirect("/articulos-pendientes");

    const { user } = useUser(null, token);
    const navigate = useNavigate();
    if (user?.rol !== "admin") {
        const route = `/articulos`;
        navigate(route);
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getPendingProductsService(token);
                setProducts(data);
            } catch (error) {
                setError(error.message || "Errror al obtener los articulos");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <section className="flex flex-col items-center p-6 lg:px-32 2xl:px-40 lg:py-8 min-h-[calc(100svh-5rem)]">
                <h2 className="font-display text-electric-violet-800 text-4xl">
                    Articulos pendientes de publicar
                </h2>
                {products.length ? (
                    <ul className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr mt-4 lg:mt-10 w-full">
                        {products.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                index={index}
                                product={product}
                            />
                        ))}
                    </ul>
                ) : (
                    <p className="mt-4 font-body text-center">
                        Todos los articulos han sido publicados
                    </p>
                )}
            </section>
        </div>
    );
};
