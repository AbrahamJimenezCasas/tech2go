import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../hooks/useUser.js";

export const EditUserProfilePage = () => {
    const { token, currentUser } = useAuth();
    const { updateUser, updatedAvatar, deletedAvatar, updatedPassword } =
        useUser(null, token);
    const staticPath = import.meta.env.VITE_BACKEND_STATIC;

    const [avatar, setAvatar] = useState(null);
    const [formData, setFormData] = useState({
        username: currentUser?.username || "",
        email: currentUser?.email || "",
        nombre: currentUser?.nombre || "",
        apellidos: currentUser?.apellidos || "",
        telefono: currentUser?.telefono || "",
        biografia: currentUser?.biografia || "",
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        if (currentUser) {
            setFormData({
                username: currentUser.username || "",
                email: currentUser.email || "",
                nombre: currentUser.nombre || "",
                apellidos: currentUser.apellidos || "",
                telefono: currentUser.telefono || "",
                biografia: currentUser.biografia || "",
            });
        }
    }, [currentUser]);

    // Función para actualizar el avatar
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const updateAvatar = async () => {
        if (!avatar) return;

        await updatedAvatar(avatar, token);
        setMessage("Avatar actualizado correctamente");
        setMessageType("success");
    };

    // Eliminar el avatar
    const deleteAvatar = async () => {
        await deletedAvatar();
        setAvatar(null);
        currentUser.avatar = null;
        setMessage("Avatar eliminado correctamente");
        setMessageType("error");
    };

    //Función para actualizar el perfil
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const updateProfile = async () => {
        await updateUser(formData);
        setMessage("Perfil actualizado correctamente");
        setMessageType("success");
        setMessage("Error al actualizar el perfil");
        setMessageType("error");
    };

    // Función para cambiar la contraseña
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };

    const updatePassword = async () => {
        if (
            !passwordData.oldPassword ||
            !passwordData.newPassword ||
            !passwordData.confirmPassword
        ) {
            setMessage("Por favor, completa todos los campos.");
            setMessageType("error");
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage("Las contraseñas nuevas no coinciden.");
            setMessageType("error");
            return;
        }
        //await updateUser(passwordData);
        await updatedPassword(passwordData);
        setMessage("Contraseña actualizada correctamente");
        setMessageType("success");
    };

    return (
        <main>
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold mb-4 text-electric-violet-700 text-center">
                    Editar Perfil
                </h1>
                {message && (
                    <p
                        className={`text-${messageType === "success" ? "green" : "red"}-600 text-center font-semibold`}
                    >
                        {message}
                    </p>
                )}

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
                    <div className="flex justify-center gap-4 mt-2">
                        <button
                            onClick={updateAvatar}
                            className="bg-electric-violet-600 text-white py-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:bg-electric-violet-700 hover:scale-105 active:scale-95 shadow-md"
                        >
                            Guardar Avatar
                        </button>
                        <button
                            onClick={deleteAvatar}
                            className="bg-electric-violet-600 text-white py-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:bg-electric-violet-700 hover:scale-105 active:scale-95 shadow-md"
                        >
                            Eliminar Avatar
                        </button>
                    </div>
                </div>

                {/* Editar Información Personal */}
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-center mb-2">
                        Información Personal
                    </h2>
                    {Object.entries(formData).map(([key, value]) => (
                        <div key={key} className="mb-2">
                            <label className="block text-gray-700 font-medium">
                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </label>
                            <input
                                type="text"
                                name={key}
                                value={value}
                                onChange={handleInputChange}
                                className="border p-2 rounded-full w-full"
                            />
                        </div>
                    ))}
                    <div className="flex justify-center gap-4 mt-2">
                        <button
                            onClick={updateProfile}
                            className="mt-2 bg-electric-violet-600 text-white py-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:bg-electric-violet-700 hover:scale-105 active:scale-95 shadow-md"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </div>

                {/* Editar Contraseña */}
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-center mb-2">
                        Cambiar Contraseña
                    </h2>
                    {Object.entries(passwordData).map(([key, value]) => (
                        <div key={key} className="mb-2 relative">
                            <label className="block text-gray-700 font-medium">
                                {key === "oldPassword"
                                    ? "Contraseña actual"
                                    : key === "newPassword"
                                      ? "Nueva contraseña"
                                      : "Confirmar nueva contraseña"}
                                :
                            </label>
                            <div className="relative">
                                <input
                                    type={
                                        showPassword[key] ? "text" : "password"
                                    }
                                    name={key}
                                    value={value}
                                    onChange={handlePasswordChange}
                                    className="border p-2 rounded-full w-full pr-10"
                                />
                                <FontAwesomeIcon
                                    icon={
                                        showPassword[key] ? faEyeSlash : faEye
                                    }
                                    className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                                    onClick={() =>
                                        setShowPassword((prev) => ({
                                            ...prev,
                                            [key]: !prev[key],
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-center gap-4 mt-2">
                        <button
                            onClick={updatePassword}
                            className="mt-2 bg-electric-violet-600 text-white py-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:bg-electric-violet-700 hover:scale-105 active:scale-95 shadow-md"
                        >
                            Guardar Contraseña
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};
