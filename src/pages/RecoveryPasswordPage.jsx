import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔹 Importamos useNavigate
import { useUser } from "../hooks/useUser.js";
import { Button } from "../components/Button.jsx";

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
        <main className="bg-white shadow-md mx-auto mt-8 p-6 rounded-lg max-w-2xl">
            <h1 className="mb-4 font-bold text-electric-violet-700 text-3xl text-center">
                Recuperar Contraseña
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

            <Button
                colors="bg-electric-violet-800 hover:bg-electric-violet-900 text-light w-fit mx-auto block"
                type="submit"
                toggle={handleSubmit}
            >
                Enviar código
            </Button>
        </main>
    );
};
