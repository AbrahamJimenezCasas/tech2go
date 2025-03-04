import joi from "joi";
import { joiErrorMessages } from "../joiErrorMessages.js";

export const registerUserSchema = joi.object({
    username: joi.string().min(5).required().messages(joiErrorMessages),
    nombre: joi.string().required().messages(joiErrorMessages),
    apellidos: joi.string().required().messages(joiErrorMessages),
    email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required()
        .messages(joiErrorMessages),
    password: joi
        .string()
        .min(8)
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
        )
        .required()
        .messages(joiErrorMessages),
});

// (?=.*[a-z]): Verifica si hay al menos una letra minúscula ([a-z]).
// (?=.*[A-Z]): Verifica si hay al menos una letra mayúscula ([A-Z]).

// (?=.* [@¡!$ %^&* ()_ +| ~=\`{}: ";'<>¿?,.]):Verifica si hay al menos un símbolo especial de entre los permitidos.

// [a - zA - Z0 - 9@¡!$ %^&* ()_ +| ~=\`{}: ";'<>¿?,.]: Define el conjunto permitido de caracteres en la contraseña: Letras minúsculas (a-z), letras mayúsculas (A-Z), números (0-9), y los caracteres especiales.

// { tlds: { allow: false } } permite aceptar cualquier dominio de correo (ej: usuario@intranet.local). Sin esto, joi intentará comprobar si el dominio es real
