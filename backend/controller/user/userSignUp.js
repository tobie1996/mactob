const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');


async function userSignUpController(req, res) {
    try {
        const { email, password, name, role } = req.body

        const user = await userModel.findOne({ email })

        console.log("user", user)

        if (user) {
            throw new Error("Cet utilisateur existe déjà.")
        }

        if (!email) {
            throw new Error("Veuillez fournir un email")
        }
        if (!password) {
            throw new Error("Veuillez fournir un mot de passe")
        }
        if (!name) {
            throw new Error("Veuillez fournir un nom")
        }

        // Vérifier si le rôle est valide
        const validRoles = ['GENERAL', 'ADMIN', 'SUPERADMIN']
        if (role && !validRoles.includes(role)) {
            throw new Error("Rôle invalide")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Une erreur est survenue")
        }

        const payload = {
            ...req.body,
            role: role || "GENERAL",
            password: hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "Utilisateur créé avec succès !"
        })


    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userSignUpController