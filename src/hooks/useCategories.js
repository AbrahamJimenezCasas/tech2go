import { useEffect, useState } from "react";
import { getCategoriesService } from "../services/fetchApi.js";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await getCategoriesService();
                setCategories(data);
            } catch (error) {
                setError(error.message || "Errror al obtener las categorias");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};
