import { Route, Routes } from "react-router-dom";
import { LayoutPage } from "./pages/LayoutPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ProductsPage } from "./pages/ProductsPage.jsx";
import { ProductPage } from "./pages/ProductPage.jsx";
import { PublishProductPage } from "./pages/PublishProductPage.jsx";
import { BuyRequestsPage } from "./pages/BuyRequestsPage.jsx";
import { RateProductPage } from "./pages/RateProductPage.jsx";
import { PendingProductsPage } from "./pages/PendingProductsPage.jsx";
import { UsersPage } from "./pages/UsersPage.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";
import { UserProfilePage } from "./pages/UserProfilePage.jsx";
import { EditUserProfilePage } from "./pages/EditUserProfilePage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { ValidatePage } from "./pages/ValidatePage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { AcceptRejectBuyRequestPage } from "./pages/AcceptRejectBuyRequestPage.jsx";
import { BuyRequestsUserPage } from "./pages/BuyRequestsUserPage.jsx";
import { SoldProductPage } from "./pages/SoldProductPage.jsx";
import { WhoWeArePage } from "./pages/WhoWeArePage.jsx";

const App = () => {
    /* ESTÁN CREADAS LAS RUTAS Y DOCUMENTOS PARA TODAS LAS PÁGINAS QUE TENEMOS EN LAS TAREAS.
    Podemos añadir más paginas en base al wireframe o si vemos alguna necesidad

    Recordatorio borrar comentarios al final
    */
    return (
        <Routes>
            <Route path="/" element={<LayoutPage />}>
                <Route index element={<HomePage />} />
                <Route path="/articulos" element={<ProductsPage />} />
                <Route path="/articulos/:id" element={<ProductPage />} />
                <Route
                    path="/vender-articulo"
                    element={<PublishProductPage />}
                />
                <Route
                    path="/solicitudes-compra"
                    element={<BuyRequestsPage />}
                />
                <Route
                    path="/usuario/solicitudes"
                    element={<BuyRequestsUserPage />}
                />
                <Route
                    path="/articulos/:id/solicitudes/:id_sol"
                    element={<AcceptRejectBuyRequestPage />}
                />
                <Route path="/vendido/:id" element={<SoldProductPage />} />
                <Route
                    path="/articulos/:id/:id_sol/valorar"
                    element={<RateProductPage />}
                />
                <Route
                    path="/articulos-pendientes"
                    element={<PendingProductsPage />}
                />
                <Route path="/usuarios" element={<UsersPage />} />
                <Route path="/usuario" element={<ProfilePage />}>
                    <Route index element={<UserProfilePage />} />
                    <Route path="/usuario/:id" element={<UserProfilePage />} />
                </Route>
                <Route
                    path="/usuario/editar"
                    element={<EditUserProfilePage />}
                />
                <Route path="/registro" element={<RegisterPage />} />
                <Route
                    path="/validar/:registrationCode"
                    element={<ValidatePage />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/sobre-nosotros" element={<WhoWeArePage />} />
            </Route>
        </Routes>
    );
};

export default App;
