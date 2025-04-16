const express = require("express");
const { getTopGastos, getTransaccionesPaginadas, addTransaccion } = require("../modules/transacciones/transaccionesController");

const router = express.Router();

// Ruta para obtener categorías desde SQL Server
router.get("/getTopGastos", getTopGastos);
router.get("/getTransaccionesPaginadas", getTransaccionesPaginadas);
router.post('/addTransaccion', addTransaccion);

module.exports = router;
