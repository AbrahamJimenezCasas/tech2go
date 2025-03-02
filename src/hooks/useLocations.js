import { useEffect, useState } from "react";
import { getLocationsService } from "../services/fetchApi.js";

export const useLocations = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setLoading(true);
                const data = await getLocationsService();
                setLocations(data);
            } catch (error) {
                setError(error.message || "Errror al obtener las categorias");
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    return { locations, loading, error };
};
