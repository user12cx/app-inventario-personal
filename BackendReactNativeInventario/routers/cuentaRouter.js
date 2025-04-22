const express = require("express");
const { getCuenta, gestionarCuentas } = require("../modules/cuenta/cuentaController");


const router = express.Router();

// Ruta para obtener categorías desde SQL Server
router.get("/getCuenta", getCuenta);
router.post("/gestionarCuentas", gestionarCuentas);

module.exports = router;
