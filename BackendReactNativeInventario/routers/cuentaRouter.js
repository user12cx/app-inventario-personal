const express = require("express");
const { getCuenta } = require("../modules/cuenta/cuentaController");


const router = express.Router();

// Ruta para obtener categorías desde SQL Server
router.get("/getCuenta", getCuenta);

module.exports = router;
