const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const authToken = require('./middleware/authToken');

const app = express();
const PORT = process.env.PORT || 4000; // Assurez-vous que PORT est défini correctement

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

// Utilisez authToken pour protéger les routes nécessitant une authentification
app.get('/', authToken, (req, res) => {
    res.json({ message: "Accès autorisé", userId: req.userId });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connexion à la base de données réussie");
        console.log("Serveur en cours d'exécution sur le port " + PORT);
    });
});