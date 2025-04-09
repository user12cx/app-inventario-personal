const express = require("express");
const { getGastosPorMes } = require("../modules/grafico/graficoController");


const router = express.Router();

// Ruta para obtener categorías desde SQL Server
router.get("/getGastosPorMes", getGastosPorMes);

module.exports = router;
