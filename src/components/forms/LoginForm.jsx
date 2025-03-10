import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useAuth } from "../../hooks/useAuth.js";
import { loginUserSchema } from "../../schemas/users/loginUserSchema.js";
import { loginUserService } from "../../services/fetchApi.js";
import { Form } from "./Form.jsx";
import { Button } from "../Button.jsx";
import { Input } from "./Input.jsx";
import { useState } from "react";
import { toast } from "react-toastify";

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: joiResolver(loginUserSchema) });
    const { onLogin } = useAuth();
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    const submit = async (data) => {
        try {
            setIsLoading(true);
            const { message, token } = await loginUserService(data);

            await onLogin(token);

            const params = new URLSearchParams({
                type: "success",
                message,
            });

            const redirect = searchParams.get("redirect");

            navigate(
                redirect
                    ? `${redirect}?${params.toString()}`
                    : `/?${params.toString()}`
            );
            toast.info("¡Bienvenido a Tech2Go!");
        } catch (error) {
            toast.error(error.message || "Error al hacer login");
        } finally {
            setIsLoading(false); // desactiva el estado de carga
        }
    };

    const navigate = useNavigate();
    return (
        <Form handleSubmit={handleSubmit(submit)}>
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
            <Link to="/usuarios/password/recovery">
                <p className="mt-1 p-1 w-full text-electric-violet-950 hover:text-electric-violet-800 text-center transition-colors duration-200">
                    ¿Olvidaste tu contraseña? Pincha aquí.
                </p>
            </Link>
            <Button
                colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light w-fit mt-8"
                type="submit"
                disabled={isLoading}
            >
                Inicia sesión
            </Button>
        </Form>
    );
};
