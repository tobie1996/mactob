const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        // Extraction du token de l'en-tête Authorization
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        // Vérification de la présence du token
        if (!token) {
            return res.status(401).json({
                message: "Veuillez vous connecter...",
                error: true,
                success: false
            });
        }

        // Décodage du token
        const decoded = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        console.log("Token décodé :", decoded);

        // Ajout de l'ID de l'utilisateur à la requête
        req.userId = decoded?._id;

        // Appel du middleware suivant
        next();

    } catch (err) {
        console.error("Erreur dans le middleware authToken :", err);

        // Gestion des erreurs de décodage du token
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "connectez-vous svp!",
                error: true,
                success: false
            });
        }

        // Autres erreurs système
        return res.status(500).json({
            message: "Erreur interne du serveur",
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
