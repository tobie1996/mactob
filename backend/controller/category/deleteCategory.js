const CategoryModel = require("../../models/CategoryModel");

const DeleteCategory = async (req, res) => {
    try {
        // Récupérer toutes les catégories distinctes
        const productCategories = await CategoryModel.distinct("category");

        console.log("categories", productCategories);

        // Tableau pour stocker les catégories supprimées
        const deletedCategories = [];

        for (const category of productCategories) {
            // Trouver la catégorie
            const categoryDoc = await CategoryModel.findOne({ category });

            if (categoryDoc) {
                // Supprimer la catégorie trouvée
                await CategoryModel.deleteOne({ category });
                deletedCategories.push(categoryDoc);
            }
        }

        res.json({
            message: "Deleted categories",
            data: deletedCategories,
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = DeleteCategory;
