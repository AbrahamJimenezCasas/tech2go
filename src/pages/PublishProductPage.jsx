import { PublishProductForm } from "../components/forms/PublishProductForm.jsx";
import { useRedirect } from "../hooks/useRedirect.js";

export const PublishProductPage = () => {
    useRedirect("/vender-articulo");
    return (
        <section className="flex flex-col items-center p-6 lg:px-32 2xl:px-40 lg:py-8 min-h-[calc(100svh-5rem)]">
            <h2 className="font-display text-electric-violet-800 text-4xl">
                Vende tu artículo
            </h2>
            <PublishProductForm />
        </section>
    );
};
