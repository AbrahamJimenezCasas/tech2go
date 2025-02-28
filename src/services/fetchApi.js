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

export const loginUserService = async (value) => {
    const response = await fetch(`${apiPath}/usuarios/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
    });

    const { message, data } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return { message, token: data.token };
};

export const getOwnUserService = async (token) => {
    const response = await fetch(`${apiPath}/usuarios/own`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data.usuario;
};

export const getAllUsersService = async () => {
    const response = await fetch(`${apiPath}/usuarios`);

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data.users;
};

export const getUserService = async (id) => {
    const response = await fetch(`${apiPath}/usuarios/${id}`);

    const { message, data } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return data.usuario;
};

export const updateAvatarService = async (info, token) => {
    const formData = new FormData();
    formData.append("avatar", info);

    const response = await fetch(`${apiPath}/usuarios/avatar`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data.user;
};

export const deleteAvatarService = async (token) => {
    const response = await fetch(`${apiPath}/usuarios/avatar`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data.user;
};

export const updateUserService = async (info, token) => {
    const response = await fetch(`${apiPath}/usuarios/own`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(info),
    });

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data.user;
};

export const updatePasswordService = async (passwords, token) => {
    const response = await fetch(`${apiPath}/usuarios/password`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwords),
    });

    const { message } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return message;
};

/* ARTICULOS */
export const getProductsService = async (filters) => {
    const response = await fetch(`${apiPath}/articulos${filters}`);

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data.articulos;
};

export const getCategoriesService = async () => {
    const response = await fetch(`${apiPath}/articulos/categorias`);

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data.categorias;
};

export const getAllRequestsService = async () => {
    const response = await fetch(`${apiPath}/solicitudes`);

    const { message, data } = await response.json();

    if (!response.ok) throw new Error(message);

    return data.solicitudes;
};
