const addToCartModel = require("../../models/cartProduct")

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body
        const currentUser = req.userId

        const isProductAvailable = await addToCartModel.findOne({ productId })

        console.log("isProductAvailabl   ", isProductAvailable)

        if (isProductAvailable) {
            return res.json({
                message: "Le produit existe déjà",
                success: false,
                error: true
            })
        } else {
            const payload = {
                productId: productId,
                quantity: 1,
                userId: currentUser,
            }

            const newAddToCart = new addToCartModel(payload)
            const saveProduct = await newAddToCart.save()
            return res.json({
                data: saveProduct,
                message: "Ajouté",
                success: true,
                error: false
            })

        }



    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}


module.exports = addToCartController