import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBuyRequestsByUserService } from "../services/fetchApi.js";

export const useRequestsByUser = (token) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                const data = await getBuyRequestsByUserService(token);
                setRequests(data);
            } catch (error) {
                setError(error.message || "Errror al obtener las solicitudes");

                // Sin toast pq ya aparece el mensaje en la pagina si no hay
                // toast.error("No hay solicitudes de compra para tus articulos");
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    return { requests, loading, error };
};
