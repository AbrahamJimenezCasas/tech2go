import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.js";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/helpers.js";
import { getOwnUserService } from "../../services/fetchApi.js";

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(
        getFromLocalStorage("tech2goToken") || null
    );
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const user = await getOwnUserService(token);

                    setCurrentUser(user);
                } catch (error) {
                    localStorage.removeItem("tech2goToken");
                    setToken(null);
                    setCurrentUser(null);
                }
            }
        };

        loadUser();
    }, [token]);

    const onLogin = async (token) => {
        try {
            setToken(token);
            setToLocalStorage("tech2goToken", token);

            const user = await getOwnUserService(token);

            setCurrentUser(user);
        } catch (error) {
            localStorage.removeItem("tech2goToken");
            setToken(null);
            setCurrentUser(null);

            throw error;
        }
    };

    const onLogout = () => {
        localStorage.removeItem("tech2goToken");
        setToken(null);
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, currentUser, onLogin, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
