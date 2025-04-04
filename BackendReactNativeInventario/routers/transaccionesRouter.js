const express = require("express");
const { getTopGastos, getTransaccionesPaginadas } = require("../modules/transacciones/transaccionesController");

const router = express.Router();

// Ruta para obtener categorías desde SQL Server
router.get("/getTopGastos", getTopGastos);
router.get("/getTransaccionesPaginadas", getTransaccionesPaginadas);

module.exports = router;
