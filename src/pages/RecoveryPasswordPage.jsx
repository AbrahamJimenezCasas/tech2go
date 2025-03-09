import { useState } from "react";
import { useUser } from "../hooks/useUser.js";
import { Input } from "../components/forms/Input.jsx";

export const RecoveryPasswordPage = () => {
    const [email, setEmail] = useState("");
    const { sendRecoveryEmail } = useUser();
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setMessage("Por favor, ingresa tu correo electrónico.");
            setMessageType("error");
            return;
        }

        try {
            await sendRecoveryEmail(email);
            setMessage("Código enviado, revisa tu email.");
            setMessageType("success");

            // Limpiar el campo de email después del envío
            setEmail("");
        } catch (error) {
            setMessage(
                error.message || "Error al enviar código de recuperación."
            );
            setMessageType("error");
        }
    };

    return (
        <main className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-4 text-electric-violet-700 text-center">
                Recuperar Contraseña
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
                    Correo Electrónico:
                </label>
                <Input
                    type="email"
                    name="email"
                    value={email}
                    handleChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-electric-violet-600 text-white py-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:bg-electric-violet-700 hover:scale-105 active:scale-95 shadow-md"
            >
                Enviar Código
            </button>
        </main>
    );
};
