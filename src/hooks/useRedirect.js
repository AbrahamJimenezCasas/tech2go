import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth.js";

export const useRedirect = ({ redirect }) => {
    const { token } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            const route = `/login${redirect ? `?redirect=${redirect}` : ""}`;
            navigate(route);
        }
    }, [token, redirect]);
};
