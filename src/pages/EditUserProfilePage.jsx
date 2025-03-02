import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { /* faPenToSquare, */ faUser } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../hooks/useUser.js";

export const EditUserProfilePage = () => {
    const { token, currentUser } = useAuth();

    const { updateUser, updatedAvatar, deletedAvatar } = useUser(null, token);
    const staticPath = import.meta.env.VITE_BACKEND_STATIC;

    // Estados individuales para cada campo
    const [avatar, setAvatar] = useState(null);
    const [username, setUsername] = useState(currentUser?.username || "");
    const [biografia, setBiografia] = useState(currentUser?.biografia || "");
    const [newpassword, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const [message, setMessage] = useState("");

    // Función para actualizar los datos del perfil
    const updateProfile = async () => {
        await updateUser();
    };

    // Función para actualizar el avatar
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const updateAvatar = async () => {
        if (!avatar) return;

        await updatedAvatar(avatar, token);
        // setMessage("Avatar actualizado correctamente");
    };

    // Eliminar el avatar
    const deleteAvatar = async () => {
        await deletedAvatar();
        setAvatar(null);
        setMessage("Avatar eliminado correctamente");
    };

    // Función para actualizar la contraseña
    const updatePassword = async () => {
        if (!oldPassword || !newpassword || !confirmPassword) {
            setMessage("Por favor, completa todos los campos.");
            return;
        }

        if (newpassword !== confirmPassword) {
            setMessage("Las contraseñas nuevas no coinciden.");
            return;
        }

        await updateProfile({ oldPassword, newpassword });
    };

    return (
        <main>
            {/* Formulario de Edición */}
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold mb-4 text-electric-violet-700 text-center">
                    Editar Perfil
                </h1>

                {message && <p className="text-red-600">{message}</p>}

                {/* Editar Avatar */}
                <div className="flex flex-col items-center mb-4">
                    {avatar ? (
                        <img
                            src={URL.createObjectURL(avatar)}
                            alt="Avatar Preview"
                            className="w-20 h-20 rounded-full"
                        />
                    ) : currentUser?.avatar ? (
                        <img
                            src={`${staticPath}/avatars/${currentUser.id}/${currentUser.avatar}`}
                            alt="Avatar"
                            className="w-20 h-20 rounded-full"
                        />
                    ) : (
                        <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="text-gray-500 text-3xl"
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        onChange={handleAvatarChange}
                        className="mt-2 text-sm"
                    />
                    <button
                        onClick={updateAvatar}
                        className="mt-2 bg-electric-violet-600 text-white py-1 px-3 rounded-full"
                    >
                        Guardar Avatar
                    </button>
                    <button
                        onClick={deleteAvatar}
                        className="mt-2 bg-electric-violet-600 text-white py-1 px-3 rounded-full"
                    >
                        Eliminar Avatar
                    </button>
                </div>

                {/* Editar Nombre de Usuario */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium text-center">
                        Nombre de usuario:
                    </label>
                    <div className="flex flex-col items-center">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border p-2 rounded-full w-full"
                        />
                        <button
                            onClick={() => updateProfile("username", username)}
                            className="mt-2 bg-electric-violet-600 text-white py-1 px-3 rounded-full"
                        >
                            Guardar
                        </button>
                    </div>
                </div>

                {/* Editar Biografía */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium text-center">
                        Biografía:
                    </label>
                    <div className="flex flex-col items-center">
                        <textarea
                            value={biografia}
                            onChange={(e) => setBiografia(e.target.value)}
                            className="border p-2 rounded-full w-full"
                        />
                        <button
                            onClick={() =>
                                updateProfile("biografia", biografia)
                            }
                            className="mt-2 bg-electric-violet-600 text-white py-1 px-3 rounded-full"
                        >
                            Guardar
                        </button>
                    </div>
                </div>

                {/* Editar Contraseña */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mt-2 text-center">
                        Contraseña actual:
                    </label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="border p-2 rounded-full w-full"
                    />
                    <label className="block text-gray-700 font-medium text-center">
                        Nueva contraseña:
                    </label>
                    <input
                        type="password"
                        value={newpassword}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded-full w-full"
                    />
                    <label className="block text-gray-700 font-medium mt-2 text-center">
                        Confirmar nueva contraseña:
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border p-2 rounded-full w-full"
                    />
                    <div className="flex justify-center">
                        <button
                            onClick={updatePassword}
                            className="mt-2 bg-electric-violet-600 text-white py-1 px-3 rounded-full"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};
