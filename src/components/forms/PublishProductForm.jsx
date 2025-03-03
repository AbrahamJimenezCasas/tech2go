
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth.js";
import { newProductService } from "../../services/fetchApi.js";
import { Form } from "./Form.jsx";
import { Input } from "./Input.jsx";
import { Button } from "../Button.jsx";
import { ImageInput } from "./ImageInput.jsx";

export const PublishProductForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [previews, setPreviews] = useState({});

    const { token } = useAuth();
    const navigate = useNavigate();

    const img1 = watch("img1");
    const img2 = watch("img2");
    const img3 = watch("img3");

    const handleImageClick = (e) => {
        setValue(e.target.name, undefined);
        setPreviews((prev) => ({
            ...prev,
            [e.target.name]: null,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue(e.target.name, file);
            setPreviews((prev) => ({
                ...prev,
                [e.target.name]: URL.createObjectURL(file),
            }));
        }
    };

    const submit = async (data) => {
        try {
            setIsLoading(true);

            const imagesData = {};
            if (data.images && data.images.length > 0) {
                data.images.forEach((file, index) => {
                    imagesData[`img${index + 1}`] = file;
                });
            }
            delete data.images;

            const payload = { ...data, ...imagesData };
            console.log(payload);

            const message = await newProductService(payload, token);

            const params = new URLSearchParams({
                type: "success",
                message,
            });

            navigate(`/articulos?${params.toString()}`);
            toast.info("Artículo publicado con éxito.");
        } catch (error) {
            toast.error(error.message || "Error al publicar el artículo");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form handleSubmit={handleSubmit(submit)}>
            <Input
                label="Nombre"
                name="nombre"
                type="text"
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

            <fieldset className="w-full">
                <legend className="ml-2 font-bold text-electric-violet-950">
                    Fotos del producto
                </legend>
                <div className="flex gap-4 p-2 border-2 border-electric-violet-200 rounded-3xl w-full">
                    <ImageInput
                        label="Image 1"
                        name="img1"
                        errors={errors}
                        handleClick={handleImageClick}
                        handleChange={handleImageChange}
                        preview={img1 ? [previews.img1] : null}
                    />
                    <ImageInput
                        label="Image 2"
                        name="img2"
                        errors={errors}
                        handleChange={handleImageChange}
                        preview={img2 ? [previews.img2] : null}
                    />
                    <ImageInput
                        label="Image 3"
                        name="img3"
                        errors={errors}
                        handleChange={handleImageChange}
                        preview={img3 ? [previews.img3] : null}
                    />
                </div>
            </fieldset>
            <Button
                colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light w-fit mt-8"
                type="submit"
                isLoading={isLoading}
            >
                Publicar
            </Button>
        </Form>
    );
};
