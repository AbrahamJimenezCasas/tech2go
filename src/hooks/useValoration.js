import { useState, useEffect } from "react";
import { getValorationService } from "../services/fetchApi.js";

export const useValoration = (id) => {
    const [valoration, setValoration] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchValoration = async () => {
            try {
                setLoading(true);
                const data = await getValorationService(id);
                setValoration(data);
            } catch (error) {
                setError(error.message || "Error al obtener la valoración");
            } finally {
                setLoading(false);
            }
        };

        fetchValoration();
    }, [id]);

    return { valoration, loading, error };
};
