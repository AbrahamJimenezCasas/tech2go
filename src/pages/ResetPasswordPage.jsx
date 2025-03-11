import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../components/Button.jsx";

export const ResetPasswordPage = () => {
    const { resetPassword } = useUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        recoveryCode: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value ?? "",
        }));
    };

    // Alternar visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    // Envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.email ||
            !formData.newPassword ||
            !formData.confirmPassword
        ) {
            setMessage("Por favor, completa todos los campos.");
            setMessageType("error");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage("Las contraseñas no coinciden.");
            setMessageType("error");
            return;
        }

        try {
            await resetPassword(
                formData.email,
                formData.recoveryCode,
                formData.newPassword
            );
            setMessage("Contraseña cambiada con éxito. Redirigiendo...");
            setMessageType("success");

            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setMessage(error.message || "Error al cambiar la contraseña.");
            setMessageType("error");
        }
    };

    return (
        <main className="bg-white shadow-md mx-auto mt-8 p-6 rounded-lg max-w-2xl">
            <h1 className="mb-4 font-bold text-electric-violet-700 text-3xl text-center">
                Restablecer Contraseña
            </h1>

            {message && (
                <p
                    className={`text-center font-semibold ${
                        messageType === "success"
                            ? "text-green-600"
                            : "text-red-600"
                    }`}
                >
                    {message}
                </p>
            )}

            <div className="mb-4">
                <label className="block font-medium text-gray-700">
                    Correo electrónico:
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border-2 border-electric-violet-200 focus:border-electric-violet-800 rounded-3xl focus:outline-none focus:ring-0 w-full transition-colors duration-200"
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium text-gray-700">
                    Código de recuperación:
                </label>
                <input
                    type="text"
                    name="recoveryCode"
                    value={formData.recoveryCode}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border-2 border-electric-violet-200 focus:border-electric-violet-800 rounded-3xl focus:outline-none focus:ring-0 w-full tracking-widest transition-colors duration-200"
                />
            </div>

            <div className="relative mb-4">
                <label className="block font-medium text-gray-700">
                    Nueva contraseña:
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 pr-12 border-2 border-electric-violet-200 focus:border-electric-violet-800 rounded-3xl focus:outline-none focus:ring-0 w-full transition-colors duration-200"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="right-4 absolute inset-y-0 flex items-center text-gray-500"
                    >
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="top-1/2 right-4 absolute text-electric-violet-300 hover:text-electric-violet-500 text-xl transition-colors -translate-y-1/2 duration-200 cursor-pointer"
                        />
                    </button>
                </div>
            </div>

            <div className="relative mb-4">
                <label className="block font-medium text-gray-700">
                    Confirmar contraseña:
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 pr-12 border-2 border-electric-violet-200 focus:border-electric-violet-800 rounded-3xl focus:outline-none focus:ring-0 w-full transition-colors duration-200"
                    />
                    <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="right-4 absolute inset-y-0 flex items-center text-gray-500"
                    >
                        <FontAwesomeIcon
                            icon={showConfirmPassword ? faEyeSlash : faEye}
                            className="top-1/2 right-4 absolute text-electric-violet-300 hover:text-electric-violet-500 text-xl transition-colors -translate-y-1/2 duration-200 cursor-pointer"
                        />
                    </button>
                </div>
            </div>

            <Button
                colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light w-fit mx-auto block"
                type="submit"
                toggle={handleSubmit}
            >
                Confirmar
            </Button>
        </main>
    );
};
