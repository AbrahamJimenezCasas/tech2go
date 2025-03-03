import { useAuth } from "../hooks/useAuth.js";
import { Button } from "../components/Button.jsx";
import { CategoryCover } from "../components/products/CategoryCover.jsx";
import { CategorySection } from "../components/products/CategorySection.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const HomePage = () => {
    const { token } = useAuth();

    return (
        <>
            <section className="flex md:flex-row flex-col md:justify-between items-center gap-12 md:gap-0 bg-electric-violet-800 p-6 lg:px-32 2xl:px-40 lg:py-8 w-full h-[30rem] overflow-x-hidden">
                <div className="flex flex-col gap-6 lg:gap-8 w-full md:w-96">
                    <h2 className="w-96 font-display font-bold text-light text-5xl">
                        Tecnología lista para irse contigo
                    </h2>
                    <div className="flex gap-2 lg:gap-3">
                        <Button
                            colors="bg-light hover:bg-electric-violet-50 text-electric-violet-800"
                            path="/articulos"
                        >
                            Explorar productos
                        </Button>
                        {token && (
                            <Button
                                colors="bg-light hover:bg-electric-violet-50 text-electric-violet-800 flex gap-1 items-center"
                                path="/vender-articulo"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                Vender
                            </Button>
                        )}
                    </div>
                </div>
                <section className="flex justify-center w-full md:w-1/2 lg:w-auto select-none">
                    <CategoryCover
                        img="bg-[url(/imgs/telefono.jpg)]"
                        category="Teléfonos"
                        path="/articulos/?filtros[categoria]=telefono"
                    />
                    <CategoryCover
                        img="bg-[url(/imgs/ordenador.webp)]"
                        margin="-ml-12"
                        category="Ordenadores"
                        path="/articulos/?filtros[categoria]=ordenador"
                    />
                    <CategoryCover
                        img="bg-[url(/imgs/consola.webp)]"
                        margin="-ml-12"
                        category="Consolas"
                        path="/articulos/?filtros[categoria]=consola"
                    />
                    <CategoryCover
                        img="bg-[url(/imgs/videojuego.webp)]"
                        margin="-ml-12"
                        category="Videojuegos"
                        path="/articulos/?filtros[categoria]=videojuego"
                    />
                </section>
            </section>
            <CategorySection
                category="telefono"
                name="Teléfonos"
                path="/telefonos"
            />
            <CategorySection
                category="ordenador"
                name="Ordenadores"
                path="/ordenadores"
            />
            <CategorySection
                category="consola"
                name="Consolas"
                path="/consolas"
            />
            <CategorySection
                category="videojuego"
                name="Videojuegos"
                path="/videojuegos"
            />
        </>
    );
};
