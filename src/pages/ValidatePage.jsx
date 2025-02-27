import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "../components/Loading.jsx";

export const ValidatePage = () => {
    const { registrationCode } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const apiPath = import.meta.env.VITE_BACKEND_HOST;

    useEffect(() => {
        toast.info("Validando tu cuenta...");
        const activeUser = async () => {
            try {
                const response = await fetch(
                    `${apiPath}/usuarios/active/${registrationCode}`,
                    { method: "PUT" }
                );

                console.log(`${apiPath}/usuarios/active/${registrationCode}`);
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
        activeUser();
        setLoading(false);
    }, [registrationCode]);
    return (
        <section>
            {loading && <p>Validando tu cuenta...</p>}
            {!loading && <Loading />}
        </section>
    );
};
