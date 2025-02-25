import { Link } from "react-router-dom";
import { Button } from "../components/Button.jsx";
import { CategoryCover } from "../components/products/CategoryCover.jsx";
import { CategorySection } from "../components/products/CategorySection.jsx";

export const HomePage = () => {
    return (
        <>
            <section className="flex md:flex-row flex-col md:justify-between items-center gap-12 md:gap-0 bg-electric-violet-800 p-6 lg:px-32 2xl:px-40 lg:py-8 w-full h-[30rem] overflow-x-hidden">
                <div className="flex flex-col gap-6 lg:gap-8 w-full md:w-96">
                    <h2 className="w-96 font-display font-bold text-light text-5xl">
                        Tecnología lista para irse contigo
                    </h2>
                    <div className="flex gap-2 lg:gap-3">
                        <Link to="/articulos">
                            <Button colors="bg-light hover:bg-electric-violet-50 text-electric-violet-800">
                                Explorar productos
                            </Button>
                        </Link>
                        <Link to="/vender-articulo">
                            <Button colors="bg-light hover:bg-electric-violet-50 text-electric-violet-800">
                                Vender
                            </Button>
                        </Link>
                        {/* PENDIENTE COMPLETAR VISIBLE WHEN LOGIN */}
                    </div>
                </div>
                <section className="flex justify-center w-full md:w-1/2 lg:w-auto select-none">
                    <CategoryCover
                        img="bg-[url(/telefono.jpg)]"
                        category="Teléfonos"
                        path="/telefonos"
                    />
                    <CategoryCover
                        img="bg-[url(/ordenador.png)]"
                        margin="-ml-12"
                        category="Ordenadores"
                        path="/ordenadores"
                    />
                    <CategoryCover
                        img="bg-[url(/telefono.png)]"
                        margin="-ml-12"
                        category="Consolas"
                        path="/consolas"
                    />
                    <CategoryCover
                        img="bg-[url(/ordenador.png)]"
                        margin="-ml-12"
                        category="Videojuegos"
                        path="/videojuegos"
                    />
                </section>
            </section>
            <CategorySection category="Teléfonos" path="/telefonos" />
            <CategorySection category="Ordenadores" path="/ordenadores" />
            <CategorySection category="Consolas" path="/consolas" />
            <CategorySection category="Videojuegos" path="/videojuegos" />
        </>
    );
};
