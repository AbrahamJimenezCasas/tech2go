import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form } from './Form.jsx';
import { Input } from './Input.jsx';
import { Button } from '../Button.jsx';
import { newProductService } from '../../services/fetchApi.js';
import { useAuth } from '../../hooks/useAuth.js';




export const PublishProductForm = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const {token} = useAuth()
    const navigate = useNavigate();

    const submit = async (data) => {
        try {
            setIsLoading(true);

            const message = await newProductService(data, token);

            const params = new URLSearchParams({
                type: "success",
                message,
            });

            setTimeout(() => {
                navigate(`/articulos`);
                toast.info("Artículo publicado con éxito.");
            }, 5000);
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
                errors={errors}
                register={register}
            />
            <Input
                label="Categoría"
                name="categoria"
                as="select"
                options={[
                    { value: "", label: "Selecciona una categoría" },
                    { value: "telefono", label: "Teléfono" },
                    { value: "ordenador", label: "Ordenador" },
                    { value: "consola", label: "Consola" },
                    { value: "videojuego", label: "Videojuego" },
                    { value: "accesorios", label: "Accesorios" },
                ]}
                errors={errors}
                register={register}
            />
            <Input
                label="Localidad"
                name="localidad"
                errors={errors}
                register={register}
            />
            <Input
                label="Precio"
                name="precio"
                type="number"
                errors={errors}
                register={register}
            />
            <Input
                label="Descripción"
                name="descripcion"
                as="textarea"
                errors={errors}
                register={register}
            />
            <Input
                label="Imagen"
                name="imagen"
                type="file"
                errors={errors}
                register={register}
            />
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
