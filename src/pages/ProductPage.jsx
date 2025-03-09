import { Loader } from "../components/Loader.jsx";
import { ProductDetail } from "../components/products/ProductDetail.jsx";
import { useProduct } from "../hooks/useProduct.js";
import { useParams } from "react-router-dom";

export const ProductPage = () => {
    const { id } = useParams();
    const { product, loading } = useProduct(id);

    return (
        <section className="bg-light lg:px-32 2xl:px-40 lg:py-8 w-full">
            {loading ? <Loader /> : <ProductDetail product={product} />}
        </section>
    );
};
