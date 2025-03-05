import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <section className="relative flex justify-center items-center bg-[url('/imgs/smwalle.jpg')] sm:bg-[url('/imgs/smwalle.jpg')] md:bg-[url('/imgs/mdwalle.jpg')] lg:bg-[url('/imgs/mdwalle.jpg')] bg-cover bg-center w-full h-screen">
            <div className="top-10 sm:top-10 md:top-16 left-10 sm:left-10 md:left-16 absolute p-10 max-w-lg text-left">
                <h1 className="mb-10 font-bold text-white text-4xl md:text-5xl lg:text-5xl lg:whitespace-nowrap">
                    ¡Oops! Página no encontrada
                </h1>
                <div className="max-w-xs sm:max-w-sm">
                    <p className="mb-3 font-sans text-white text-lg md:text-xl lg:text-xl lg:whitespace-nowrap">
                        Wall-E ha explorado esta página... pero no ha encontrado
                        vida.
                    </p>
                    <p className="mb-3 font-sans text-white text-lg md:text-xl lg:text-xl lg:whitespace-nowrap">
                        Por favor, inténtelo de nuevo.
                    </p>
                </div>

                <div className="flex gap-4 mt-10">
                    <Button
                        colors="bg-electric-violet-900 text-light lg:py-2"
                        toggle={() => navigate(-1)}
                    >
                        Volver atrás
                    </Button>
                    <Button
                        colors="bg-electric-violet-900 text-light lg:py-3"
                        path="/"
                    >
                        Inicio
                    </Button>
                </div>
            </div>
        </section>
    );
};
