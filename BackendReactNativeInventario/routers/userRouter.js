const express =require("express");
const { gestionarUsuarios } = require("../modules/user/userController");

const router = express.Router();

// Ruta para obtener categorías desde SQL Server
router.post("/gestionarUsuarios", gestionarUsuarios);

module.exports = router;