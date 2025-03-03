import { RequestCard } from "./RequestCard.jsx";

export const RequestList = ({ solicitudes }) => {
    return (
        <ul className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr mt-4 lg:mt-10">
            {solicitudes.map((solicitud) => (
                <RequestCard
                    key={solicitud.solicitudId}
                    solicitud={solicitud}
                />
            ))}
        </ul>
    );
};
