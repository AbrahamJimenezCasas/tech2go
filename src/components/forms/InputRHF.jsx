import { useState } from "react";
import { Button } from "../Button.jsx";
import { Icon } from "../Icon.jsx";

export const InputRHF = (props) => {
    const { label, type, name, errors, register } = props;

    // newType almacena el tipo actual del input (puede cambiar entre password y text. Por defecto los campos de contraseña type="password" ocultan los caracteres con ******)
    const [newType, setNewType] = useState(type);

    // indica si la contraseña es visible o no
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        // alterna entre mostrar y ocultar la contraseña
        // si showPassword estaba true, entonces setShowPassword será false y viceversa
        setShowPassword(!showPassword);
        // cuando showPassword cambie a true, pon text, cuando cambie a false, pon contraseña.
        setNewType(!showPassword ? "text" : "password");
    };

    return (
        // aquí agregaremos CSS si existe un error en el campo del formulario, si no hay error no se agrega ninguna clase
        <label className={errors[name] ? "label-error" : ""}>
            <span className="label-content">{label}</span>
            <div>
                {type === "textarea" ? (
                    <textarea
                        name={name}
                        placeholder={label}
                        autoComplete={`new-${name}`}
                        {...register(`${name}`)}
                    ></textarea>
                ) : (
                    <input
                        type={newType}
                        name={name}
                        placeholder={label}
                        autoComplete={`new-${name}`}
                        {...register(`${name}`)}
                    />
                )}
                {type === "password" && (
                    <Button
                        id="viewPassword"
                        className="visibility"
                        handleClick={handleClick}
                    >
                        <Icon
                            name={
                                showPassword ? "visibility_off" : "visibility"
                            }
                        />
                    </Button>
                )}
            </div>
            <span className="inputError" id={`error-${name}`}>
                {errors[name] && errors[name].message}
            </span>
        </label>
    );
};

// Estructura del campo de entrada (<textarea> o <input>) decide si usa un textarea o un input

// Botón para mostrar/ocultar contraseña

// Luego se muestra un mensaje de error si el campo tiene un error de validación.
