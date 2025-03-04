import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useProduct } from "../hooks/useProduct.js";

export const AcceptRejectBuyRequestPage = () => {
    const { id, id_sol } = useParams();
    const { product } = useProduct(id);
    console.log(product);
    const { token } = useAuth();

    console.log(id, id_sol);
    return <div>AcceptRejectBuyRequestPage</div>;
};
