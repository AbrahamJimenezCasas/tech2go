import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth.js"; // obtener token usuario
import { Form } from "./Form.jsx";
import { Star } from "../Star.jsx";
import { Button } from "../Button.jsx";
import { Input } from "./Input.jsx";
import { newValorationService } from "../../services/fetchApi.js";

export const RatingForm = ({ productId }) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: { valoracion: 0 },
    });
    // setValue es una función que nos da useForm() para cambiar el valor de un campo sin que el usuario lo escriba.

    // Cuando el usuario presiona "Enviar", ponemos isLoading = true para deshabilitar el botón.
    const [isLoading, setIsLoading] = useState(false);
    const [ratingError, setRatingError] = useState(false);
    const { token } = useAuth();

    // Observar el valor de la calificación seleccionada
    const valoracion = watch("valoracion", 0);

    // función que se ejecuta cuando el usuario envía la valoración
    const submit = async (data) => {
        if (data.valoracion === 0) {
            setRatingError(true);
            return;
        }

        setRatingError(false);

        try {
            setIsLoading(true); // desactivamos el botón mientras se envía

            await newValorationService(productId, data, token); // enviamos los datos a la API

            toast.success(
                "¡Gracias por tu valoración! Su opinión es importante para nosotros."
            );
        } catch (error) {
            console.log(error);
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
                className="flex flex-col items-center bg-light shadow-md mt-6 p-6 rounded-xl w-80"
            >
                <h2 className="mb-4 font-bold text-electric-violet-800 text-lg">
                    Evalúa tu compra
                </h2>

                {/* Selección de estrellas */}
                <div className="flex gap-2 mb-4">
                    {/* con map, creamos un botón por cada número */}
                    {[1, 2, 3, 4, 5].map((value) => (
                        <button
                            type="button"
                            key={value}
                            onClick={() => {
                                setValue("valoracion", value, {
                                    shouldValidate: true,
                                });
                                setRatingError(false);
                            }}
                            className="focus:outline-none"
                        >
                            <Star
                                classes={`w-8 h-8 transition-colors duration-200 cursor-pointer ${valoracion >= value ? "fill-electric-violet-500" : "fill-gray-300"}`}
                            />
                        </button>
                    ))}
                </div>
                {ratingError && (
                    <p className="text-red-500 text-sm text-center whitespace-nowrap">
                        Por favor, selecciona una calificación.
                    </p>
                )}

                <Input
                    label="Comentario"
                    name="comentario"
                    as="textarea"
                    register={register}
                    errors={errors}
                    className="p-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-violet-500 w-full h-24 resize-none"
                />

                <Button
                    colors="bg-electric-violet-500 text-light mt-4"
                    type="submit"
                    disabled={isLoading}
                >
                    Enviar
                </Button>
            </Form>
        </div>
    );
};
