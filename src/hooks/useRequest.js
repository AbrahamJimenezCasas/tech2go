import { useEffect, useState } from "react";
import { getBuyRequestService } from "../services/fetchApi.js";

export const useRequest = (id, id_sol, token) => {
    const [request, setRequest] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                setLoading(true);

                const data = await getBuyRequestService(id, id_sol, token);
                setRequest(data);
            } catch (error) {
                setError(error.message || "Error al obtener la solicitud");
            } finally {
                setLoading(false);
            }
        };

        fetchRequest();
    }, [id]);

    return { request, loading, error };
};
