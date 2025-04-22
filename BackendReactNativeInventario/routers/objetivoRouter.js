const express = require("express");
const { getObjetivos, gestionarMetasFuturo } = require("../modules/objetivoAhorro/objetivoController");


const router = express.Router();

// Ruta para obtener categorías desde SQL Server
router.get("/getObjetivo", getObjetivos);

router.post("/gestionarMetasFuturo", gestionarMetasFuturo);

module.exports = router;
