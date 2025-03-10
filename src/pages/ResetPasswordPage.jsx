import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
        <main className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-4 text-electric-violet-700 text-center">
                Restablecer Contraseña
            </h1>

            {message && (
                <p
                    className={`text-${messageType === "success" ? "green" : "red"}-600 text-center font-semibold`}
                >
                    {message}
                </p>
            )}

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">
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
                <label className="block text-gray-700 font-medium">
                    Código de recuperación:
                </label>
                <input
                    type="text"
                    name="recoveryCode"
                    value={formData.recoveryCode}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border-2 border-electric-violet-200 focus:border-electric-violet-800 rounded-3xl focus:outline-none focus:ring-0 w-full transition-colors duration-200 tracking-widest"
                />
            </div>

            <div className="mb-4 relative">
                <label className="block text-gray-700 font-medium">
                    Nueva contraseña:
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border-2 border-electric-violet-200 focus:border-electric-violet-800 rounded-3xl focus:outline-none focus:ring-0 w-full transition-colors duration-200 pr-12"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                    >
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                        />
                    </button>
                </div>
            </div>

            <div className="mb-4 relative">
                <label className="block text-gray-700 font-medium">
                    Confirmar contraseña:
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="px-4 py-2 border-2 border-electric-violet-200 focus:border-electric-violet-800 rounded-3xl focus:outline-none focus:ring-0 w-full transition-colors duration-200 pr-12"
                    />
                    <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                    >
                        <FontAwesomeIcon
                            icon={showConfirmPassword ? faEyeSlash : faEye}
                        />
                    </button>
                </div>
            </div>
            <button
                onClick={handleSubmit}
                className="w-full bg-electric-violet-600 text-white py-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:bg-electric-violet-700 hover:scale-105 active:scale-95 shadow-md"
            >
                Confirmar
            </button>
        </main>
    );
};
