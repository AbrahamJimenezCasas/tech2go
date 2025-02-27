import { RequestCard } from "./RequestCard.jsx";

export const RequestList = ({ solicitudes }) => {
    return (
        <ul className="grid grid-cols-1 auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4 lg:mt-10">
            {solicitudes.map((solicitud) => (
                <RequestCard
                    key={solicitud.solicitudId}
                    solicitud={solicitud}
                />
            ))}
        </ul>
    );
};
