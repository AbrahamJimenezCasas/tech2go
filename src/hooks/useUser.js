import { useEffect, useState } from "react";
import {
    deleteAvatarService,
    getOwnUserService,
    getUserService,
    getUserRequestsService,
    getUserSalesService,
    updateAvatarService,
    updatePasswordService,
    updateUserService,
} from "../services/fetchApi.js";

export const useUser = (id, token) => {
    const [user, setUser] = useState(null);
    const [sales, setSales] = useState(null);
    const [requests, setRequests] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

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

    const updateUser = async (info) => {
        try {
            setLoading(true);
            const data = await updateUserService(info, token);
            setUser(data);
        } catch (error) {
            setError(error.message || "Error updating user");
        } finally {
            setLoading(false);
        }
    };

    const updatedAvatar = async (info, token) => {
        try {
            setLoading;
            const data = await updateAvatarService(info, token);
            setUser(data);
        } catch (error) {
            setError(error.message || "Error updating avatar");
        } finally {
            setLoading(false);
        }
    };
    const deletedAvatar = async () => {
        try {
            setLoading(true);
            const data = await deleteAvatarService(token);
            setUser(data);
        } catch (error) {
            setError(error.message || "Error deleting avatar");
        } finally {
            setLoading(false);
        }
    };

    const updatedPassword = async (passwordActual, passwordNuevo) => {
        try {
            setLoading(true);
            setError(null);
            setSuccessMessage(null);

            const message = await updatePasswordService(
                { passwordActual, passwordNuevo },
                token
            );
            setSuccessMessage(message);
        } catch (error) {
            setError(error.message || "Error updating password");
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        sales,
        requests,
        loading,
        error,
        successMessage,
        updateUser,
        updatedAvatar,
        deletedAvatar,
        updatedPassword,
    };
};
