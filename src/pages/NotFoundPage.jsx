import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <section className="w-full h-screen flex items-center justify-center bg-cover bg-center relative bg-[url('/smwalle.jpg')] sm:bg-[url('/smwalle.jpg')] md:bg-[url('/mdwalle.jpg')] lg:bg-[url('/mdwalle.jpg')]">
            <div className="absolute top-10 left-10 sm:top-10 sm:left-10 md:top-16 md:left-16 max-w-lg text-left p-10">
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-10 lg:whitespace-nowrap">
                    ¡Oops! Página no encontrada
                </h1>
                <div className="max-w-xs sm:max-w-sm">
                    <p className="text-lg md:text-xl lg:text-xl text-white font-sans mb-3 lg:whitespace-nowrap">
                        Wall-E ha explorado esta página... pero no ha encontrado
                        vida.
                    </p>
                    <p className="text-lg md:text-xl lg:text-xl text-white font-sans mb-3 lg:whitespace-nowrap">
                        Por favor, inténtelo de nuevo.
                    </p>
                </div>

                <div className="mt-10 flex gap-4">
                    <Button
                        colors="bg-electric-violet-900 text-white lg:py-2"
                        toggle={() => navigate(-1)}
                    >
                        Volver atrás
                    </Button>
                    <Button
                        colors="bg-electric-violet-900 text-white lg:py-3"
                        path="/"
                    >
                        Inicio
                    </Button>
                </div>
            </div>
        </section>
    );
};
