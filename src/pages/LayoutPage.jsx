import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";

const LayoutPage = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
};
export default LayoutPage;
