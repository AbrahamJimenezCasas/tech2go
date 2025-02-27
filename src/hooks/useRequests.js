import { useEffect, useState } from "react";
import { getAllRequestsService } from "../services/fetchApi.js";

export const useRequests = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                const data = await getAllRequestsService();
                setSolicitudes(data);
            } catch (error) {
                setError(error.message || "Errror al obtener las solicitudes");
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    return { solicitudes, loading, error };
};
