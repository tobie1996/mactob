const updateCategoryPermission = require('../../helpers/permission')
const CategoryModel = require('../../models/CategoryModel')

async function UpdateCategoryControllers(req, res) {
    try {

        if (!updateCategoryPermission(req.userId)) {
            throw new Error("Permission denied")
        }

        const { _id, ...resBody } = req.body

        const updateProduct = await CategoryModel.findByIdAndUpdate(_id, resBody)

        res.json({
            message: "Product update successfully",
            data: updateProduct,
            success: true,
            error: false
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}


module.exports = UpdateCategoryControllers