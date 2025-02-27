import { useEffect, useState } from "react";
import { getAllUsersService } from "../services/fetchApi.js";

export const useAllUsers = () => {
    const [users, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await getAllUsersService();
                setUsuarios(data);
            } catch (error) {
                setError(error.message || "Errror al obtener los usuarios");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading, error };
};
