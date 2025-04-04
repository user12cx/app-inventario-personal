const express = require("express");
const { getObjetivos } = require("../modules/objetivoAhorro/objetivoController");


const router = express.Router();

// Ruta para obtener categorías desde SQL Server
router.get("/getObjetivo", getObjetivos);

module.exports = router;
