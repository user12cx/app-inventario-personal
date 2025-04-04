const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { body, validationResult } = require("express-validator");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true
}));

// Importar rutas
const categoriaRouter = require("./routers/categoriaRouter");
const cuentaRouter = require("./routers/cuentaRouter");
const objetivoRouter = require("./routers/objetivoRouter");
const login = require("./routers/loginRouter");
const register = require("./routers/loginRouter");
const getTopGastos = require("./routers/transaccionesRouter");
const getTransaccionesPaginadas = require("./routers/transaccionesRouter");
const gestionarCategorias = require("./routers/categoriaRouter");



app.use("/api/categorias", categoriaRouter);
app.use("/api/gestionarCategorias", gestionarCategorias);

app.use("/api/cuentas", cuentaRouter);

app.use("/api/objetivos", objetivoRouter);

app.use("/api/login", login);
app.use("/api/register", register);

app.use ("/api/getTopGastos", getTopGastos)
app.use ("/api/getTransaccionesPaginadas", getTransaccionesPaginadas)




// Configuración del puerto
const PUERTO = process.env.PORT ;
app.listen(PUERTO, () => {
  console.log(`Servidor en ejecución en el puerto: ${PUERTO}`);
});
