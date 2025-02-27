import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "../components/Loading.jsx";

export const ValidatePage = () => {
    const { registerCode } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const apiPath = import.meta.env.VITE_API_PATH;

    useEffect(() => {
        toast.info("Validando tu cuenta...");
        const activeUser = async () => {
            try {
                const response = await fetch(
                    `${apiPath}/users/validate/${registerCode}`,
                    { method: "PUT" }
                );
                if (response.ok) {
                    const result = await response.json();
                    const params = new URLSearchParams({
                        type: "success",
                        message: result.message,
                    });
                    navigate(`/login?${params.toString()}`);
                    return;
                } else {
                    const result = await response.json();
                    const params = new URLSearchParams({
                        type: "error",
                        message: result.message,
                    });
                    navigate(`/login?${params.toString()}`);
                    return;
                }
            } catch (error) {
                toast;
            }
        };
        const timer = setTimeout(() => {
            activeUser();
            setLoading(false);
        }, 6000);

        return () => clearTimeout(timer);
    }, [registerCode]);
    return (
        <section>
            <h2>ValidatePage</h2>
            {loading && <p>Validando tu cuenta...</p>}
            {!loading && <Loading />}
        </section>
    );
};
