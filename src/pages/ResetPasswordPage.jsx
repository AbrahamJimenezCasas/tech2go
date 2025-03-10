import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../hooks/useUser.js";

export const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const recoveryPass = searchParams.get("recoveryPass");
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

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value ?? "",
        }));
    };

    // Envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificación de que todos los campos estén completos
        if (
            !formData.email ||
            !formData.newPassword ||
            !formData.confirmPassword
        ) {
            setMessage("Por favor, completa todos los campos.");
            setMessageType("error");
            return;
        }

        // Verificación de que las contraseñas coincidan
        if (formData.newPassword !== formData.confirmPassword) {
            setMessage("Las contraseñas no coinciden.");
            setMessageType("error");
            return;
        }

        try {
            await resetPassword(
                formData.email,
                recoveryPass,
                formData.newPassword
            );

            setMessage("Contraseña cambiada con éxito. Redirigiendo...");
            setMessageType("success");

            setTimeout(() => navigate("/users/login"), 2000);
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

            {/* Campo para el email */}
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
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                    Nueva contraseña:
                </label>
                <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border-2 border-electric-violet-200 focus:border-electric-violet-800 rounded-3xl focus:outline-none focus:ring-0 w-full transition-colors duration-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                    Confirmar contraseña:
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border-2 border-electric-violet-200 focus:border-electric-violet-800 rounded-3xl focus:outline-none focus:ring-0 w-full transition-colors duration-200"
                />
            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-electric-violet-600 text-white py-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:bg-electric-violet-700 hover:scale-105 active:scale-95 shadow-md"
            >
                Cambiar Contraseña
            </button>
        </main>
    );
};
