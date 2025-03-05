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
        await updatedPassword(
            passwordData.oldPassword,
            passwordData.newPassword
        );
        setMessage("Contraseña actualizada correctamente");
        setMessageType("success");
    };

    return (
        <main className="p-6 lg:px-32 2xl:px-40 lg:py-8 w-full">
            <div className="bg-white shadow-dark/10 shadow-md mx-auto p-6 rounded-lg max-w-2xl font-body">
                <h1 className="mb-4 font-display font-bold text-electric-violet-700 text-3xl text-center">
                    Editar perfil
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
                            className="rounded-full w-20 h-20"
                        />
                    ) : currentUser?.avatar ? (
                        <img
                            src={`${staticPath}/avatars/${currentUser.id}/${currentUser.avatar}`}
                            alt="Avatar"
                            className="rounded-full w-20 h-20"
                        />
                    ) : (
                        <div className="flex justify-center items-center bg-gray-200 rounded-full w-20 h-20">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="text-electric-violet-950 text-3xl"
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        onChange={handleAvatarChange}
                        className="px-4 py-2 border-2 border-electric-violet-200 focus:border-electric-violet-800 rounded-3xl focus:outline-none focus:ring-0 w-full transition-colors duration-200"
                    />
                    <div className="flex justify-center gap-4 mt-2">
                        <button
                            onClick={updateAvatar}
                            className="bg-electric-violet-600 hover:bg-electric-violet-700 shadow-md px-4 py-2 rounded-full text-white hover:scale-105 active:scale-95 transition duration-200 ease-in-out transform"
                        >
                            Guardar Avatar
                        </button>
                        <button
                            onClick={deleteAvatar}
                            className="bg-electric-violet-600 hover:bg-electric-violet-700 shadow-md px-4 py-2 rounded-full text-white hover:scale-105 active:scale-95 transition duration-200 ease-in-out transform"
                        >
                            Eliminar Avatar
                        </button>
                    </div>
                </div>

                {/* Editar Información Personal */}
                <div className="mb-4">
                    <h2 className="mb-2 font-semibold text-xl text-center">
                        Información Personal
                    </h2>
                    {Object.entries(formData).map(([key, value]) => (
                        <div key={key} className="mb-2">
                            <label className="block font-medium text-gray-700">
                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </label>
                            <input
                                type="text"
                                name={key}
                                value={value}
                                onChange={handleInputChange}
                                className="px-4 py-2 border-2 border-electric-violet-200 focus:border-electric-violet-800 rounded-3xl focus:outline-none focus:ring-0 w-full transition-colors duration-200"
                            />
                        </div>
                    ))}
                    <div className="flex justify-center gap-4 mt-2">
                        <button
                            onClick={updateProfile}
                            className="bg-electric-violet-600 hover:bg-electric-violet-700 shadow-md mt-2 px-4 py-2 rounded-full text-white hover:scale-105 active:scale-95 transition duration-200 ease-in-out transform"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </div>

                {/* Editar Contraseña */}
                <div className="mb-4">
                    <h2 className="mb-2 font-semibold text-xl text-center">
                        Cambiar Contraseña
                    </h2>
                    {Object.entries(passwordData).map(([key, value]) => (
                        <div key={key} className="relative mb-2">
                            <label className="block font-medium text-gray-700">
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
                                    className="px-4 py-2 border-2 border-electric-violet-200 focus:border-electric-violet-800 rounded-3xl focus:outline-none focus:ring-0 w-full transition-colors duration-200"
                                />
                                <FontAwesomeIcon
                                    icon={
                                        showPassword[key] ? faEyeSlash : faEye
                                    }
                                    className="top-1/2 right-4 absolute text-electric-violet-300 hover:text-electric-violet-500 text-xl transition-colors -translate-y-1/2 duration-200 cursor-pointer"
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
                            className="bg-electric-violet-600 hover:bg-electric-violet-700 shadow-md mt-2 px-4 py-2 rounded-full text-white hover:scale-105 active:scale-95 transition duration-200 ease-in-out transform"
                        >
                            Guardar Contraseña
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};
