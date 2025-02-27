import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import "dayjs/locale/es";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale("es", {
    relativeTime: {
        future: "en %s",
        past: "hace %s",
        s: "unos segundos",
        m: "1 minuto",
        mm: "%d minutos",
        h: "1 hora",
        hh: "%d horas",
        d: "1 día",
        dd: "%d días",
        M: "1 mes",
        MM: "%d meses",
        y: "1 año",
        yy: "%d años",
    },
});

export const formatDate = (date) => {
    if (!date) return "Fecha inválida";
    const localDate = dayjs.utc(date).tz(dayjs.tz.guess()).subtract(1, "hour");

    return localDate.fromNow();
};
