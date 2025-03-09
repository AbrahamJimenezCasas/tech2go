export const ContactPage = () => {
    let latitud = 61.553768613034514;
    let longitud = -123.40046059539131;
    function actualizarMapa(latitud, longitud) {
        const iframe = document.getElementById("maps");
        const url = `https://maps.google.com/maps?q=${latitud},${longitud}&z=15&output=embed`;

        iframe.src = url;
    }
    actualizarMapa(latitud, longitud);
    return (
        <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
            <article className="relative flex justify-center items-center bg-[url('/imgs/smwalle.jpg')] sm:bg-[url('/imgs/Videojuegos-tipos-gamers-riesgos-juego-saludable.png')] md:bg-[url('/imgs/Videojuegos-tipos-gamers-riesgos-juego-saludable.png')] lg:bg-[url('/imgs/Videojuegos-tipos-gamers-riesgos-juego-saludable.png')] bg-cover bg-no-repeat bg-center w-full h-svh">
                <h2 className="mb- pb-2 font-display font-bold text-light text-8xl">
                    Contáctanos
                </h2>
            </article>
            <article className="flex flex-col items-center gap-28 bg-electric-violet-200 p-12">
                <div className="flex flex-col">
                    <h3 className="font-display font-bold text-electric-violet-600 text-4xl">
                        Localizacion:
                    </h3>
                    <p className="text-2xl">Silent Hill</p>
                    <img
                        className="rounded-4xl"
                        src="../../public/imgs/resethill-3347744937.jpeg"
                        alt="Silent Hill"
                    />
                    <h3>Telefono:</h3>
                    <p></p>
                    <h3>Correo:</h3>
                    <p></p>
                </div>
                <iframe
                    id="maps"
                    allowFullScreen=""
                    className="rounded-3xl w-96 h-96"
                    loading="lazy"
                ></iframe>
            </article>
        </section>
    );
};
