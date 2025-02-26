import { useEffect, useState } from "react";
import { getProductsService } from "../services/fetchApi.js";

export const useProducts = (filters) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProductsService(filters);
                setProducts(data);
            } catch (error) {
                setError(error.message || "Errror al obtener los articulos");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};
