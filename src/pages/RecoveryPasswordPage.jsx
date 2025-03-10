import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔹 Importamos useNavigate
import { useUser } from "../hooks/useUser.js";

export const RecoveryPasswordPage = () => {
    const [email, setEmail] = useState("");
    const { sendRecoveryEmail } = useUser();
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const navigate = useNavigate(); // 🔹 Creamos navigate

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

            setTimeout(() => {
                navigate("/usuarios/password/reset");
            });
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
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-4 py-2 border-2 border-electric-violet-200 focus:border-electric-violet-800 rounded-3xl focus:outline-none focus:ring-0 w-full transition-colors duration-200"
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
