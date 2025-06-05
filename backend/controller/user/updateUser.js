const userModel = require("../../models/userModel")

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId
        const { userId, email, name, role } = req.body

        // Vérifier si l'utilisateur actuel est ADMIN ou SUPERADMIN
        const currentUser = await userModel.findById(sessionUser)
        if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.role !== 'SUPERADMIN')) {
            throw new Error("Non autorisé à effectuer cette action")
        }

        // Seul un SUPERADMIN peut modifier les rôles
        if (role && currentUser.role !== 'SUPERADMIN') {
            throw new Error("Seul un SUPERADMIN peut modifier les rôles")
        }

        const payload = {
            ...(email && { email: email }),
            ...(name && { name: name }),
            ...(role && currentUser.role === 'SUPERADMIN' && { role: role }),
        }

        const updateUser = await userModel.findByIdAndUpdate(userId, payload)

        res.json({
            data: updateUser,
            message: "Utilisateur mis à jour avec succès",
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

module.exports = updateUser