import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "../Card.jsx";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/dayJs.js";

export const RequestCard = ({ solicitud }) => {
    const staticPath = import.meta.env.VITE_BACKEND_STATIC;
    const fecha = formatDate(solicitud.fecha);
    return (
        <Card>
            <div className="flex items-center gap-4 h-full">
                <img
                    className="rounded-full h-11/12"
                    src="/imgs/no-img-available.png"
                />
                <div className="font-body">
                    <h3 className="font-bold text-electric-violet-950">
                        {solicitud.articulo}
                    </h3>
                    <p>{fecha}</p>
                </div>
            </div>
            {solicitud.estado === "aceptada" && (
                <FontAwesomeIcon
                    icon={faSquareCheck}
                    className="text-3xl text text-electric-violet-800"
                />
            )}
        </Card>
    );
};
