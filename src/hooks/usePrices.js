import { useEffect, useState } from "react";
import { getPriceRangeService } from "../services/fetchApi.js";

export const usePriceRange = () => {
    const [maxPrice, setMaxPrice] = useState("");
    const [minPrice, setMinPrice] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setLoading(true);
                const data = await getPriceRangeService();
                setMaxPrice(data.max);
                setMinPrice(data.min);
            } catch (error) {
                setError(error.message || "Errror al obtener las localidades");
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    return { maxPrice, minPrice, loading, error };
};
