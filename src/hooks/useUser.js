import { useEffect, useState } from "react";
import {
    getOwnUserService,
    getUserRequestsService,
    getUserSalesService,
    getUserService,
} from "../services/fetchApi.js";

export const useUser = (id, token) => {
    const [user, setUser] = useState(null);
    const [sales, setSales] = useState(null);
    const [requests, setRequests] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const data = id
                    ? await getUserService(id)
                    : await getOwnUserService(token);
                setUser(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchSales = async () => {
            try {
                setLoading(true);
                const data = await getUserSalesService(id);
                setSales(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchRequests = async () => {
            try {
                setLoading(true);
                const data = await getUserRequestsService(id);
                setRequests(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
        fetchSales();
        fetchRequests();
    }, [id, token]);
    return { user, sales, requests, loading, error };
};
