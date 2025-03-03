
export const PurchaseRequestButton = async () => {
      if (!token) {
        toast.error("Debes iniciar sesión para solicitar compra.");
        return;
      }
      try {
        // Llama al servicio para enviar la solicitud de compra, pasando el id del producto y el token
        const message = await sendPurchaseRequestService(product.id, token);
        toast.success(message);
      } catch (error) {
        toast.error(error.message || "Error al enviar la solicitud de compra.");
      }
    };
