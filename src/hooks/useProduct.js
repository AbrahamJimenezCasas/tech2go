import { useState, useEffect } from "react";
import { getProductService } from "../services/fetchApi.js";

export const useProduct = (id) => {
    const [product, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductService(id);
                setProducto(data);
            } catch (error) {
                setError(error.message || "Error al obtener el producto");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return { product, loading, error };
};
