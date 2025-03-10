import { useEffect, useState } from "react";
import { getProductService } from "../services/fetchApi.js";

export const useProduct = (id, updates) => {
    const [product, setProduct] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);

                const data = await getProductService(id);
                setProduct(data);
            } catch (error) {
                setError(error.message || "Error al obtener el artículo");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, updates]);

    return { product, loading, error };
};
