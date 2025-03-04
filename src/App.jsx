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
import { WhoWeAre } from "./pages/WhoWeAre.jsx";
import { AcceptRejectBuyRequestPage } from "./pages/AcceptRejectBuyRequestPage.jsx";
import { BuyRequestsUserPage } from "./pages/BuyRequestsUserPage.jsx";

const App = () => {
    /* ESTÁN CREADAS LAS RUTAS Y DOCUMENTOS PARA TODAS LAS PÁGINAS QUE TENEMOS EN LAS TAREAS.
    Podemos añadir más paginas en base al wireframe o si vemos alguna necesidad

    Recordatorio borrar comentarios al final
    */
    return (
        <Routes>
            <Route path="/" element={<LayoutPage />}>
                <Route index element={<HomePage />} />
                {/* SARA, principal & landing articulos */}
                <Route path="/articulos" element={<ProductsPage />} />
                {/* SARA principal & landing articulos */}
                <Route path="/articulos/:id" element={<ProductPage />} />
                {/* ESTER detalle artículo*/}
                <Route
                    path="/vender-articulo"
                    element={<PublishProductPage />}
                />
                {/* ESTER publicación artículos*/}
                <Route
                    path="/solicitudes-compra"
                    element={<BuyRequestsPage />}
                />
                {/* NATALIA lista solicitudes de compra*/}
                <Route
                    path="/usuario/solicitudes"
                    element={<BuyRequestsUserPage />}
                />
                <Route
                    path="/articulos/:id/solicitudes/:id_sol"
                    element={<AcceptRejectBuyRequestPage />}
                />
                <Route
                    path="/articulos/:id/valorar"
                    element={<RateProductPage />}
                />
                {/* ANA valoracion de una venta*/}
                <Route
                    path="/articulos-pendientes"
                    element={<PendingProductsPage />}
                />{" "}
                {/* NATALIA articulos no publicados*/}
                <Route path="/usuarios" element={<UsersPage />} />
                {/* ABRAHAM lista usuarios*/}
                <Route path="/usuario" element={<ProfilePage />}>
                    <Route index element={<UserProfilePage />} />
                    <Route path="/usuario/:id" element={<UserProfilePage />} />
                </Route>{" "}
                {/* SARA detalle usuario con historico*/}
                <Route
                    path="/usuario/editar"
                    element={<EditUserProfilePage />}
                />
                {/* NATALIA datos usuario con posibilidad de cambio*/}
                <Route path="/registro" element={<RegisterPage />} />
                {/* ANA registro*/}
                <Route
                    path="/validar/:registrationCode"
                    element={<ValidatePage />}
                />
                {/* ABRAHAM validacion usuario*/}
                <Route path="/login" element={<LoginPage />} />{" "}
                {/* SARA login */}
                <Route path="*" element={<NotFoundPage />} />{" "}
                {/* ANA not found*/}
                <Route path="/sobre-nosotros" element={<WhoWeAre />} />
            </Route>
        </Routes>
    );
};

export default App;
