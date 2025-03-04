import { ProductDetail } from "../components/products/ProductDetail.jsx";
import { useProduct } from "../hooks/useProduct.js";
import { useParams } from "react-router-dom";


export const ProductPage = () => {
    const {id} = useParams();
    const {product} = useProduct (id);
    
    return (
        <section>
    <ProductDetail product={product }/>
    </section> )
}
