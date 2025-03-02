import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth.js"; // obtener token usuario
import { Form } from "./Form.jsx";
import { Star } from "../Star.jsx";
import { Button } from "../Button.jsx";
import { Input } from "./Input.jsx";
import { newValorationService } from "../../services/fetchApi.js";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser.js";

export const RatingForm = ({ productId }) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();
    // setValue es una función que nos da useForm() para cambiar el valor de un campo sin que el usuario lo escriba.

    // Cuando el usuario presiona "Enviar", ponemos isLoading = true para deshabilitar el botón.
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    const { id } = useParams();
    const { user } = useUser;

    // Observar el valor de la calificación seleccionada
    const valoracion = watch("valoracion", 0);

    // función que se ejecuta cuando el usuario envía la valoración
    const submit = async (data) => {
        try {
            setIsLoading(true); // desactivamos el botón mientras se envía
            const reviewData = {
                comentario: data.comment,
                productId,
                compradorId: user.id,
                valoracion: data.valoracion,
            };

            console.log(data);

            await newValorationService(id, reviewData, token); // enviamos los datos a la API

            toast.success(
                "¡Gracias por tu valoración! Su opinión es importante para nosotros."
            );
        } catch (error) {
            toast.error(
                error.message ||
                    "Error al enviar la valoración. Inténtelo de nuevo."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <Form
                handleSubmit={handleSubmit(submit)}
                className="mt-6 flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-80"
            >
                <h2 className="text-lg font-bold text-electric-violet-800 mb-4">
                    Evalúa tu compra
                </h2>

                {/* Selección de estrellas */}
                <div className="flex gap-2 mb-4">
                    {/* con map, creamos un botón por cada número */}
                    {[1, 2, 3, 4, 5].map((value) => (
                        <button
                            type="button"
                            key={value}
                            onClick={() => setValue("valoracion", value)}
                            className="focus:outline-none"
                        >
                            <Star
                                classes={`w-8 h-8 transition-colors duration-200 cursor-pointer ${valoracion >= value ? "fill-electric-violet-500" : "fill-gray-300"}`}
                            />
                        </button>
                    ))}
                </div>
                {errors.rating && (
                    <p className="text-red-500 text-sm">
                        Por favor selecciona una calificación.
                    </p>
                )}

                <Input
                    label="Comentario"
                    name="comment"
                    as="textarea"
                    register={register}
                    errors={errors}
                    className="w-full h-24 resize-none border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-electric-violet-500"
                />

                <Button
                    colors="bg-electric-violet-500 text-white mt-4"
                    type="submit"
                    isLoading={isLoading}
                >
                    Enviar
                </Button>
            </Form>
        </div>
    );
};
