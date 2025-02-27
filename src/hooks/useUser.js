import { useEffect, useState } from "react";
import { getOwnUserService, getUserService } from "../services/fetchApi.js";

export const useUser = (id, token) => {
    const [user, setUser] = useState(null);
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

        fetchUser();
    }, [id, token]);
    return { user, loading, error };
};
