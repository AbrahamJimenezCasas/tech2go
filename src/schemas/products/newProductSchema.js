import joi from "joi";
import { joiErrorMessages } from "../joiErrorMessages.js";

export const newProductSchema = joi
    .object({
        nombre: joi
            .string()
            .min(3)
            .max(50)
            .required()
            .messages(joiErrorMessages),
        categoria: joi
            .string()
            .valid(
                "telefono",
                "ordenador",
                "consola",
                "videojuego",
                "accesorios"
            )
            .required()
            .messages(joiErrorMessages),
        localidad: joi
            .string()
            .min(3)
            .max(50)
            .required()
            .messages(joiErrorMessages),
        precio: joi.number().required().messages(joiErrorMessages),
        descripcion: joi
            .string()
            .min(5)
            .max(500)
            .required()
            .messages(joiErrorMessages),
        img1: joi.object().messages(joiErrorMessages),
        img2: joi.object().messages(joiErrorMessages),
        img3: joi.object().messages(joiErrorMessages),
    })
    .unknown(true);
