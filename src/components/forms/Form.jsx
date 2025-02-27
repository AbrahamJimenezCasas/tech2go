// este código crea una "plantilla" de formulario para que puedas reutilizarlo en varias partes de tu app.
// Ejemplo:
// Form es como la hoja en blanco, la estructura del formulario
// Children son los espacios para escribir tu nombre, email, etc. Los inputs del formulario
// onSubmit={handleSubmit} es el botón de 'Enviar'

export const Form = ({ handleSubmit, children }) => {
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 mt-8 w-full md:w-8/12 xl:w-1/2"
        >
            {children}
        </form>
    );
};
