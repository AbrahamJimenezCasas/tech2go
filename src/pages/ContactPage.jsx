import {
    faEnvelope,
    faLocationDot,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

export const ContactPage = () => {
    let latitud = 61.553768613034514;
    let longitud = -123.40046059539131;

    function actualizarMapa(latitud, longitud) {
        const iframe = document.getElementById("maps");
        if (iframe) {
            const url = `https://maps.google.com/maps?q=${latitud},${longitud}&z=15&output=embed`;

            iframe.src = url;
        }
    }

    useEffect(() => {
        actualizarMapa(latitud, longitud);
    }, []);

    return (
        <section className="flex flex-col">
            <article className="relative flex justify-center items-center bg-[url('/imgs/gamer.png')] sm:bg-[url('/imgs/gamer.png')] md:bg-[url('/imgs/gamer.png')] lg:bg-[url('/imgs/gamer.png')] bg-cover bg-no-repeat bg-center w-full h-90">
                <h2 className="mb-15 pb-2 font-display font-bold text-light text-7xl">
                    Contáctanos
                </h2>
            </article>
            <article className="flex flex-col lg:flex-row justify-center items-center gap-20 p-20">
                <div className="flex flex-col gap-3 lg:self-start">
                    <p>
                        <FontAwesomeIcon
                            icon={faPhone}
                            style={{ color: "#bb00ff" }}
                        />
                        <span className="font-bold"> Teléfono:</span> +34
                        912345678
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span className="font-bold"> Correo:</span>{" "}
                        tech2go@gmail.com
                    </p>
                    <p>
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            style={{ color: "#ff0000" }}
                        />
                        <span className="font-bold"> Localización:</span> Silent
                        Hill
                    </p>
                </div>
                <iframe
                    id="maps"
                    allowFullScreen=""
                    className="rounded-3xl w-120 h-86 "
                    loading="lazy"
                ></iframe>
                <div>
                    <img
                        src="../../public/imgs/resethill-3347744937.jpeg"
                        alt="Silent Hill"
                        className="rounded-3xl w-120 h-86 object-cover"
                    />
                </div>
            </article>
        </section>
    );
};
