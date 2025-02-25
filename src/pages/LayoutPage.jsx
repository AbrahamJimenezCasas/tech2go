import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar.jsx";

export const LayoutPage = () => {
    return (
        <>
            <Navbar />
            <main className="bg-light">
                <Outlet />
            </main>
        </>
    );
};
