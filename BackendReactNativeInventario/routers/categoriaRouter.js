const express = require("express");
const { getCategoria, gestionarCategorias } = require("../modules/categoria/categoriaController");

const router = express.Router();

// Ruta para obtener categorías desde SQL Server
router.get("/getCategoria", getCategoria);
router.post("/gestionarCategorias", gestionarCategorias);
module.exports = router;
