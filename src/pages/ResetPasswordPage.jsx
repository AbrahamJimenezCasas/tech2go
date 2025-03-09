import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../hooks/useUser.js";
import { Input } from "../components/forms/Input.jsx";

export const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const recoveryPass = searchParams.get("recoveryPass");
    const { resetPassword } = useUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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
            [name]: value,
        }));
    };

    // Envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.newPassword || !formData.confirmPassword) {
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
            await resetPassword(recoveryPass, formData.newPassword);
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

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                    Nueva contraseña:
                </label>
                <Input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    handleChange={handleChange}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                    Confirmar contraseña:
                </label>
                <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    handleChange={handleChange}
                    required
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
