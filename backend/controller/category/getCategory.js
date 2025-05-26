const CategoryModel = require("../../models/CategoryModel")

const getCategoryController = async (req, res) => {
    try {
        const allCategory = await CategoryModel.find()

        res.json({
            message: "All allCategory",
            success: true,
            error: false,
            data: allCategory
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }

}

module.exports = getCategoryController