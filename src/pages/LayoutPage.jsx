import { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Navbar } from "../components/navbar/Navbar.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useRequestsByUser } from "../hooks/useRequestsByUser.js";

export const LayoutPage = () => {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");
    const message = searchParams.get("message");

    const { token } = useAuth();
    const { requests } = useRequestsByUser(token);

    useEffect(() => {
        if (requests.length > 0) {
            toast.info(
                `Tienes ${requests.length} solicitudes de compra pendientes`
            );
        }
    }, [requests.length]);

    useEffect(() => {
        if (type && message) {
            if (type === "error") {
                toast.error(message);
            } else if (type === "success") {
                toast.success(message);
            } else if (type === "warning") {
                toast.warning(message);
            } else if (type === "info") {
                toast.info(message);
            } else {
                toast(message);
            }
        }
    }, [type, message]);
    return (
        <>
            <Navbar />
            <main className="bg-light">
                <Outlet />
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={true}
                    closeOnClick={true}
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="colored"
                    toastStyle={{
                        backgroundColor: "rgba(128, 0, 255, 0.9)",
                        color: "#fff",
                        border: "1px solid var(--color-electric-violet-500)",
                        borderRadius: "20px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                        minWidth: "350px",
                        padding: "16px",
                    }}
                />
            </main>
        </>
    );
};
