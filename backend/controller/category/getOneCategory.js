const CategoryModel = require("../../models/CategoryModel")


const getOneCategory = async (req, res) => {
    try {
        const productCategory = await CategoryModel.distinct("category")

        console.log("category", productCategory)

        //array to store one product from each category
        const productByCategory = []

        for (const category of productCategory) {
            const categorys = await CategoryModel.findOne({ category })

            if (categorys) {
                productByCategory.push(categorys)
            }
        }


        res.json({
            message: "category product",
            data: productByCategory,
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

module.exports = getOneCategory