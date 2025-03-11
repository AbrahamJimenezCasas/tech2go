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
        const url = `https://maps.google.com/maps?q=${latitud},${longitud}&z=15&output=embed`;
        if (iframe) {
            iframe.src = url;
        }
    }

    useEffect(() => {
        actualizarMapa(latitud, longitud);
    }, [latitud, longitud]);

    return (
        <section className="flex flex-col">
            <article className="relative flex justify-center items-center bg-[url('/imgs/gamer.png')] sm:bg-[url('/imgs/gamer.png')] md:bg-[url('/imgs/gamer.png')] lg:bg-[url('/imgs/gamer.png')] bg-cover bg-no-repeat bg-center w-full h-90">
                <h2 className="mb-15 pb-2 font-display font-bold text-light text-5xl md:text-7xl lg:text-7xl">
                    Contáctanos
                </h2>
            </article>
            <article className="flex lg:flex-row flex-col justify-center items-center gap-20 p-20">
                <div className="flex flex-col lg:self-start gap-3">
                    <div className="text-lg">
                        <FontAwesomeIcon
                            icon={faPhone}
                            style={{ color: "#bb00ff" }}
                        />
                        <span className="font-bold text-electric-violet-700">
                            Teléfono:
                        </span>
                        <p>+34 912345678</p>
                    </div>
                    <div className="text-lg">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span className="font-bold text-electric-violet-700">
                            {" "}
                            Correo:
                        </span>{" "}
                        <p>tech2go@gmail.com</p>
                    </div>
                    <div className="text-lg">
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            style={{ color: "#ff0000" }}
                        />{" "}
                        <span className="font-bold text-electric-violet-700">
                            Localización:
                        </span>{" "}
                        <p>Silent Hill</p>
                    </div>
                </div>
                <iframe
                    id="maps"
                    allowFullScreen=""
                    className="rounded-3xl w-64 md:w-120 lg:w-120 h-64 md:h-86 lg:h-86"
                    loading="lazy"
                ></iframe>
                <div>
                    <img
                        src="/imgs/silenthill.jpg"
                        alt="Silent Hill"
                        className="rounded-3xl object-cover"
                    />
                </div>
            </article>
        </section>
    );
};
