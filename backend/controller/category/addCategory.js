const addCategoryPermission = require("../../helpers/permission")
const CategoryModel = require("../../models/CategoryModel")

async function AddCategoryController(req, res) {

    try {
        const sessionUserId = req.userId

        if (!addCategoryPermission(sessionUserId)) {
            throw new Error("vous n'avez pas de permission")
        }

        const addCategory = new CategoryModel({
            ...req.body,
            userId: sessionUserId
        });
        const saveCategory = await addCategory.save()

        res.status(201).json({
            message: "Nouvelle Categorie",
            error: false,
            success: true,
            data: saveCategory
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = AddCategoryController