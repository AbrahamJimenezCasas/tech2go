import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const Input = ({ label, type, step, name, errors, register }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);
    const [visibilityIcon, setVisibilityIcon] = useState(faEye);

    const handleClick = () => {
        setShowPassword(!showPassword);
        setInputType(showPassword ? "password" : "text");
        setVisibilityIcon(showPassword ? faEye : faEyeSlash);
    };

    return (
        <label className="w-full font-body">
            <span className="ml-2 font-bold text-electric-violet-950">
                {type === "number" ? `${label} €` : label}
            </span>
            <div className="relative mt-2">
                {type === "number" ? (
                    <input
                        type={inputType}
                        name={name}
                        step={step}
                        placeholder={label}
                        autoComplete={`new-${name}`}
                        {...register(`${name}`)}
                        className="px-4 py-2 border-2 border-electric-violet-200 focus:border-electric-violet-800 rounded-3xl focus:outline-none focus:ring-0 w-full transition-colors duration-200"
                    />
                ) : (
                    <input
                        type={inputType}
                        name={name}
                        placeholder={label}
                        autoComplete={`new-${name}`}
                        {...register(`${name}`)}
                        className="px-4 py-2 border-2 border-electric-violet-200 focus:border-electric-violet-800 rounded-3xl focus:outline-none focus:ring-0 w-full transition-colors duration-200"
                    />
                )}
                {type === "password" && (
                    <FontAwesomeIcon
                        icon={visibilityIcon}
                        onClick={handleClick}
                        className="top-1/2 right-4 absolute text-electric-violet-300 hover:text-electric-violet-500 text-xl transition-colors -translate-y-1/2 duration-200 cursor-pointer"
                    />
                )}
            </div>
            <span className="mt-1 font-light text-red-600">
                {errors[name] && errors[name].message}
            </span>
        </label>
    );
};
