// const { validationResult } = require("express-validator");
// const { conectarDB, sql } = require("../../config/conexion");

// // Middleware para validar campos
// const validacionCampoCategoria = (req, res, next) => {
//   const result = validationResult(req);
//   if (!result.isEmpty()) {
//     return res.status(401).json({ success: false, errors: result.array() });
//   }
//   next();
// };

// // Función para validar duplicados en la base de datos

// const validateCampoDuplicate = async (descripcion) => {
//   try {
//     const pool = await conectarDB();
//     if (!pool) throw new Error("No se pudo conectar a la base de datos");

//     const result = await pool
//       .request()
//       .input("descripcion", sql.VarChar, descripcion) // SQL Server usa parámetros nombrados
//       .query("SELECT * FROM Categorias WHERE descripcion = @descripcion");

//     return result.recordset.length > 0 ? "Esta descripción ya existe" : "";
//   } catch (error) {
//     console.error("❌ Error en la consulta:", error);
//     throw new Error("Error en la consulta a la base de datos");
//   }
// };

// module.exports = {
//   validacionCampoCategoria,
//   validateCampoDuplicate,
// };
