const productModel = require("../../models/productModel");

const deleteProductController = async (req, res) => {
    try {
        const ProductId = req.body._id;

        if (!ProductId) {
            return res.status(400).json({
                message: "ID de produit manquant",
                error: true,
                success: false
            });
        }

        const deleteProduct = await productModel.deleteOne({ _id: ProductId });

        if (deleteProduct.deletedCount === 0) {
            return res.status(404).json({
                message: "Produit non trouvé",
                error: true,
                success: false
            });
        }

        res.json({
            message: "Produit supprimé",
            error: false,
            success: true,
            data: deleteProduct
        });

    } catch (err) {
        res.status(500).json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = deleteProductController;
