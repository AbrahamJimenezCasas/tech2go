const apiPath = import.meta.env.VITE_BACKEND_HOST;

/* USUARIOS */

export const registerUserService = async (value) => {
    const response = await fetch(`${apiPath}/usuarios/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
    });

    const { message } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return message;
};
