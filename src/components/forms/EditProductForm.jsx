import { Modal } from "../Modal.jsx";
import { useForm } from "react-hook-form";
import { Form } from "./Form.jsx";
import { Input } from "./Input.jsx";
import { Button } from "../Button.jsx";
import { useState } from "react";
import { updateProductService } from "../../services/fetchApi.js";
import { toast } from "react-toastify";

export const EditProductForm = ({
    isVisible,
    product,
    toggle,
    token,
    update,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nombre: product.nombre,
            categoria: product.categoria,
            localidad: product.localidad,
            precio: product.precio,
            descripcion: product.descripcion,
        },
    });
    const [isLoading, setIsLoading] = useState(false);

    const submit = async (data) => {
        try {
            setIsLoading(true);

            await updateProductService(product.id, token, data);
            update();

            toast.success("Artículo actualizado con éxito");
        } catch (error) {
            toast.error(error.message || "Error al actualizar el artículo");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Modal isVisible={isVisible}>
            <div className="flex flex-col justify-center items-center gap-2 bg-electric-violet-50 shadow-dark/10 shadow-lg p-4 rounded-3xl w-3/4">
                <Form handleSubmit={handleSubmit(submit)}>
                    <Input
                        label="Producto"
                        type="text"
                        name="nombre"
                        errors={errors}
                        register={register}
                    />
                    <label className="w-full font-body">
                        <span className="ml-2 font-bold text-electric-violet-950">
                            Categoria
                        </span>
                        <div className="mt-2">
                            <select
                                {...register("categoria")}
                                className="p-2 border-2 border-electric-violet-200 focus:border-electric-violet-800 rounded-3xl focus:outline-none focus:ring-0 w-full transition-colors duration-200"
                            >
                                <option value="telefono">Teléfonos</option>
                                <option value="ordenador">Ordenador</option>
                                <option value="consola">Consola</option>
                                <option value="videojuego">Videojuego</option>
                                <option value="accesorios">Accesorios</option>
                            </select>
                        </div>
                        <span className="mt-1 font-light text-red-600">
                            {errors[name] && errors[name].message}
                        </span>
                    </label>
                    <Input
                        label="Localidad"
                        name="localidad"
                        type="text"
                        errors={errors}
                        register={register}
                    />
                    <Input
                        label="Precio"
                        name="precio"
                        type="number"
                        step="any"
                        errors={errors}
                        register={register}
                    />
                    <Input
                        label="Descripción"
                        name="descripcion"
                        type="text"
                        errors={errors}
                        register={register}
                    />

                    <Button
                        colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light w-fit"
                        type="submit"
                        toggle={() => toggle()}
                        disabled={isLoading}
                    >
                        Actualizar información
                    </Button>
                </Form>
                <Button
                    colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light w-fit"
                    type="button"
                    toggle={() => toggle()}
                    disabled={isLoading}
                >
                    Cancelar
                </Button>
            </div>
        </Modal>
    );
};
