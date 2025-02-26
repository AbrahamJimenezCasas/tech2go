const apiPath = import.meta.env.VITE_BACKEND_HOST;

/* USUARIOS */
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
