import {
    faCartShopping,
    faList,
    faMoneyCheckDollar,
    faStar,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const HelpCenterPage = () => {
    // openIndex guarda qué carta está abierta
    // setOpenIndex actualiza openIndex
    // useState(null) porque inicialmente todas están cerradas
    const [openIndex, setOpenIndex] = useState(null);

    // alterna entre abrir y cerrar la carta
    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const helpReq = [
        {
            question: "¿Cómo realizar una compra?",
            answer: "En Tech2Go puedes comprar cualquier producto sin preocuparte por la ubicación del vendedor.\n\nNuestra plataforma te permite acceder a los mejores productos tecnológicos de manera rápida y segura.\n\nSigue estos pasos para completar tu compra:\n\n1.Busca el producto que deseas comprar.\n2.Selecciona el botón “Solicitar compra”.\n3.Espera a que el vendedor confirme tu compra.\n4.Una vez aceptada la compra, recibirás una notificación en tu perfil de usuario.\n5.Se efectuará el cobro de la compra.\n6.¡Ya podrás valorar tu experiencia!",
            icon: (
                <FontAwesomeIcon
                    icon={faCartShopping}
                    style={{ color: "#5903af", fontSize: "2rem" }}
                />
            ),
        },
        {
            question: "¿Cómo valorar un producto o ver valoraciones?",
            answer: "En Tech2Go la opinión de nuestros clientes es fundamental. Las valoraciones ayudan a otros compradores a tomar decisiones informadas y nos permiten mejorar continuamente.\n\nPara valorar un producto:\nRecuerda que solo podrás valorar un producto después de que el vendedor haya aprobado la compra.\n\n1.Visita tu perfil de usuario.\n2.Busca el producto en la lista de solicitudes de compra.\n3.Selecciona el icono del bocadillo.\n4.Elige una calificación de 1 a 5 estrellas, donde 1 es la peor valoración y 5 la mejor.\n5.Escribe un comentario sobre tu experiencia de compra.\n6.Presiona el botón “Enviar”.\n\nPara ver las valoraciones de otros clientes:\n\n1.Busca el producto que te interesa.\n2.Selecciona el icono del bocadillo.\n3.Podrás visualizar las reseñas de otros clientes.",
            icon: (
                <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: "#5903af", fontSize: "2rem" }}
                />
            ),
        },
        {
            question: "¿Cómo vender un producto?",
            answer: "Si deseas vender productos tecnológicos, Tech2Go te permite publicarlos fácilmente para llegar a más compradores.\n\nSigue estos pasos para vender un artículo:\n\n1.Accede a la página de inicio.\n2.Haz clic en el botón “Vender”.\n3.Completa los campos con la información del artículo y sube imágenes para que los clientes lo vean en detalle.\n4.Selecciona “Publicar”.\n5.Tu producto pasará por un proceso de verificación de hasta 48 horas antes de aparecer en tu perfil.\n6.Una vez publicada la venta, recibirás notificaciones cuando haya interesados.\n7.Podrás aceptar o rechazar las solicitudes de compra desde tu perfil.",
            icon: (
                <FontAwesomeIcon
                    icon={faMoneyCheckDollar}
                    style={{ color: "#5903af", fontSize: "2rem" }}
                />
            ),
        },
        {
            question: "¿Cómo actualizar mi perfil?",
            answer: "Mantén tu información actualizada para que otros usuarios puedan confiar en ti y contactarte fácilmente.\n\nPara modificar tu perfil:\n\n1.Accede a tu perfil de usuario.\n2.Haz clic en el icono del lápiz junto a tu nombre de usuario.\n3.Se abrirá la pantalla de edición, donde podrás modificar tus datos personales como tu nombre, apellidos, teléfono o contraseña entre otros.\n4.Una vez realizados los cambios, selecciona “Guardar”.",
            icon: (
                <FontAwesomeIcon
                    icon={faUser}
                    style={{ color: "#5903af", fontSize: "2rem" }}
                />
            ),
        },
        {
            question: "¿Cómo usar filtros de búsqueda?",
            answer: "Si buscas un producto específico, puedes usar los filtros de búsqueda para encontrarlo más rápido.\n\nDespués de realizar una búsqueda, en la parte izquierda de tu pantalla verás los siguientes filtros:\n\n1.Filtrar por: categoría, precio y localidad.\n2.Ordenar productos por: nombre, de más barato a más caro, de más caro a más barato, fecha de publicación y valoración.\n\nEstos filtros te ayudarán a encontrar el producto que necesitas de manera más eficiente.",
            icon: (
                <FontAwesomeIcon
                    icon={faList}
                    style={{ color: "#5903af", fontSize: "2rem" }}
                />
            ),
        },
    ];

    return (
        <section className="p-15">
            <h2 className="text-4xl md:text-5xl lg:text-5xl text-center font-bold text-electric-violet-900 mb-20">
                Centro de Ayuda
            </h2>
            <div className="grid gird-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 justify-center place-items-center">
                {helpReq.map((item, index) => (
                    <article
                        key={index}
                        onClick={() => toggleAnswer(index)}
                        className="w-60 h-60 border-2 border-electric-violet-700 rounded-2xl p-4 cursor-pointer flex flex-col justify-center items-center"
                    >
                        <header className="flex flex-col text-center  gap-7">
                            {item.icon}
                            <h3 className="text-xl text-electric-violet-900 font-bold">
                                {item.question}
                            </h3>
                        </header>
                        {openIndex === index && (
                            <p className="mt-3 text-sm text-gray-800 whitespace-pre-line">
                                {item.answer}
                            </p>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
};
