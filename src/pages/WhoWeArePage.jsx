const TeamMember = ({ member }) => {
    return (
        <article className="group flex flex-col items-center hover:bg-electric-violet-50 shadow-2xl shadow-electric-violet-950/20 p-4 border-2 border-electric-violet-200 rounded-2xl transition-all duration-200">
            <section className="flex items-center gap-4">
                <img
                    className="border-2 border-electric-violet-800 rounded-3xl group-hover:rounded-full w-24 h-24 object-cover"
                    src={member.img}
                    alt={member.nombre}
                ></img>

                <h3 className="font-display text-electric-violet-600 text-4xl">
                    {member.nombre}
                </h3>
            </section>

            <p className="mt-2 font-body text-dark">{member.descripcion}</p>
        </article>
    );
};
export const WhoWeArePage = () => {
    const team = [
        {
            nombre: "Nuestra Bri",
            descripcion:
                "Bri se sacrifico por nosotros en el desembarco de normandia, saco al equipo adelante y nos salvo, haciendo posible que hicieramos esta aplicacion tan perfecta. Bri es nuestra familia y siempre lo sera, desde el equipo pokemon hasta el equipo tech2go siempre tendra un lugar en nuetros corazones. Hablo por todo el equipo diciendo que Bri siempre nos animo y que siempre la recordaremos y la querremos.",
            img: "/imgs/bri.png",
        },
        {
            nombre: "Sara",
            descripcion:
                "Sara es la jefa del equipo y el pilar cuando uno se frustra, sin duda ella tiene siempre claro que hacer en cada momento y es una de las mejores lideres que hemos conocido",
            img: "/imgs/sara.jpg",
        },
        {
            nombre: "Natalia",
            descripcion:
                "Natalia la madre del grupo, se comenta que en realidad el codigo lo hizo su hijo, aun no nacio pero sabemos que lo hizo el, NO TENGO PRUEBAS PERO TAMPOCO DUDAS.",
            img: "/imgs/natalia.png",
        },
        {
            nombre: "Ana",
            descripcion:
                "Ana es la responsable de la explotacion de las alpacas, tenemos a mas de 200 alpacas trabajando para nosotros y ella les dio un futuro mejor y ahora trabajan en el soporte de la empresa y tambien hicieron varias partes del codigo.",
            img: "/imgs/ana.png",
        },
        {
            nombre: "Ester",
            descripcion:
                "Ester dio la idea de este proyecto y centrarse en parte en el mundo gaming, ya que cito textualmente ella dijo: estic fins als collons, que xa non se venden xogos físicos, que carallo é isto, e por riba tamén conseguiremos móbiles e ordenadores para vender con calidade. Asique en parte Ester tuvo esta maravillosa idea llamada tech2go.",
            img: "/imgs/ester.jpg",
        },
        {
            nombre: "Abraham",
            descripcion:
                "Abraham tambien conocido como el crativo en ocasiones, fue el encagardo de que el gobierno de españa nos librara de pagar todos los impuestos y el iva. Si quereis una clase o un curso de como libraros de los impuestos os lo dejo a precio de bootcamp",
            img: "/imgs/abraham.jpg",
        },
        {
            nombre: "Elmo",
            descripcion:
                "Elmo el todo poderoso que gobierna como siempre y tiene al mundo avanzando",
            img: "/imgs/elmo.jpg",
        },
    ];
    return (
        <section className="flex flex-col items-center bg-gradient-to-br from-electric-violet-50 to-electric-violet-200 p-6 lg:px-32 2xl:px-40 lg:py-8 text-center">
            <h2 className="px-4 py-2 rounded-3xl font-display font-bold text-electric-violet-700 text-5xl text-center">
                El equipo Tech2Go
            </h2>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr mt-5">
                {team.map((member, index) => (
                    <TeamMember key={index} member={member} />
                ))}
            </div>
        </section>
    );
};
