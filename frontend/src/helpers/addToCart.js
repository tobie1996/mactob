import SummaryApi from "../common";
import { toast } from 'react-toastify';

const addToCart = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("Connectez-vous svp!");
        console.error("Token absent. Veuillez vous connecter.");
        return null;
    }

    const requestOptions = {
        method: SummaryApi.addToCartProduct.method,
        credentials: 'include',
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId: id })
    };

    try {
        const response = await fetch(SummaryApi.addToCartProduct.url, requestOptions);
        const responseData = await response.json();

        if (responseData.success) {
            // Affiche le message de succès et attend la fin du toast
            toast.success(responseData.message, {
                onClose: () => {
                    // Action à effectuer après le toast de succès
                    console.log("Produit ajouté au panier avec succès");
                }
            });
        } else {
            toast.error(responseData.message);
        }

        return responseData;
    } catch (error) {
        console.error("Erreur lors de l'ajout au panier :", error);
        return null;
    }
};

export default addToCart;
