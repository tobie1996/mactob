const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Veuillez fournir un e-mail");
        }
        if (!password) {
            throw new Error("Veuillez fournir un mot de passe");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        console.log("checkPassoword", checkPassword);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            };

            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
            res.status(200).json({
                message: "Connexion réussie ",
                data: token,
                success: true,
                error: false,
                userId: user._id
            });

        } else {
            throw new Error("Veuillez vérifier le mot de passe");
        }

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
