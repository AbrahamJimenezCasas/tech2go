import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { registerUserService } from "../../services/fetchApi.js";
import { Form } from "./Form.jsx";
import { Button } from "../Button.jsx";
import { Input } from "./Input.jsx";
import { registerUserSchema } from "../../schemas/users/registerUserSchema.js";

/* Aquí se maneja el formulario de registro de usuarios. Su trabajo es:

1. Mostrar los campos donde escribe el usuario (nombre, email, contraseña... 
2. Validar que la información esté bien antes de enviarla
3. Enviar los datos al backend para registrar al usuario
4. MOstrar mensajes de éxito y error */

export const RegisterForm = () => {
    const {
        register, // conecta los inputs con el formulario y guarda sus valores en el formulario
        handleSubmit, // función que maneja el envío del formulario
        formState: { errors }, // guarda los errores y permite mostrarlos
    } = useForm({ resolver: joiResolver(registerUserSchema) }); // usa joi para validar los datos
    const [isLoading, setIsLoading] = useState(false); // para indicar si el formulario está cargando
    const navigate = useNavigate(); // permite redirigir al usuario a otra página después del registro

    // manejo del envío del formulario
    // se ejecuta cuando el usuario envía el formulario
    // data es un objeto con los valores que el usuario escribe en los campos de formulario
    const submit = async (data) => {
        try {
            setIsLoading(true); // activa el estado de carga del formulario "cargando..."

            // enviar datos al servidor
            const message = await registerUserService(data);

            // Crea parámetros de URL para pasarlos cuando redirigimos al usuario.
            // Cuando navegamos a una página, podemos pasar información en la URL.
            // Ej: /login?type=success&message=Registro+exitoso
            const params = new URLSearchParams({
                type: "success",
                message,
            });

            // si el registro es exitoso, muestra un mensaje y redirige al usuario a /login
            // toast es una librería que muestra mensajes emergentes en pantalla
            setTimeout(() => {
                navigate(`/login?${params.toString()}`);
                toast.info("Comprueba tu correo para activar tu cuenta");
            }, 1000);
        } catch (error) {
            toast.error(error.message || "Error al registrar el usuario");
        } finally {
            setIsLoading(false); // desactiva el estado de carga
        }
    };

    // renderizar el formulario
    // <Form>: envuelve el formulario
    // <InputRHF>: Representa cada campo del formulario
    // <Button>: Botón para enviar el formulario
    return (
        <Form className="register-form" handleSubmit={handleSubmit(submit)}>
            <Input
                label="Username"
                name="username"
                errors={errors}
                register={register}
            />
            <div className="flex gap-4 w-full">
                <Input
                    label="Nombre"
                    name="nombre"
                    errors={errors}
                    register={register}
                />
                <Input
                    label="Apellidos"
                    name="apellidos"
                    errors={errors}
                    register={register}
                />
            </div>
            <Input
                label="Email"
                type="email"
                name="email"
                errors={errors}
                register={register}
            />
            <Input
                label="Contraseña"
                type="password"
                name="password"
                errors={errors}
                register={register}
            />
            <Button
                colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light w-fit mt-8"
                type="submit"
                disabled={isLoading}
            >
                Regístrate
            </Button>
        </Form>
    );
};

// label: el texto que aparecerá arriba del input
// type: el tipo de campo
// name: el identidicador del campo (username, email...)
// errores: lista de errores del formulario
// register: función para registrar el campo
