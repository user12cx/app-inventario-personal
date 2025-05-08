const { sql, poolPromise } = require("../../config/conexion");

// Función reutilizable para obtener el saldo de una cuenta
const getSaldoCuenta = async (pool, cuenta_id) => {
  const result = await pool.request()
    .input("cuenta_id", sql.Int, cuenta_id)
    .query("SELECT saldo FROM Cuentas WHERE idCuenta = @cuenta_id");
  return result.recordset[0]?.saldo || 0;
};

const getObjetivos = async (req, res) => {
  try {
    const pool = await poolPromise;
    const usuario_id = req.query.usuario_id || req.body.usuario_id;

    if (!usuario_id) {
      return res.status(400).send({ success: false, error: "El usuario_id es requerido" });
    }

    const result = await pool.request()
      .input("usuario_id", sql.Int, usuario_id)
      .execute("getObjetivosFuturos");

    return res.status(200).json({ success: true, result: result.recordset });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const gestionarMetasFuturo = async (req, res) => {
  try {
    const pool = await poolPromise;
    const {
      tipo,
      idObjetivo,
      nombre,
      fecha_limite,
      monto_objetivo,
      monto_actual,
      usuario_id,
      cuenta_id,
    } = req.body;

    if (!tipo || !["agregar", "editar", "eliminar"].includes(tipo)) {
      return res.status(400).json({ success: false, message: "Tipo de operación no válido" });
    }

    // Validar campos comunes
    if (tipo === "agregar" && (!cuenta_id || monto_actual == null)) {
      return res.status(400).json({ success: false, message: "cuenta_id y monto_actual son requeridos para agregar" });
    }

    if (tipo === "editar" && (!idObjetivo || !cuenta_id || monto_actual == null)) {
      return res.status(400).json({ success: false, message: "idObjetivo, cuenta_id y monto_actual son requeridos para editar" });
    }

    if (tipo === "eliminar" && !idObjetivo) {
      return res.status(400).json({ success: false, message: "idObjetivo requerido para eliminar" });
    }

    // Verificar saldo suficiente en agregar/editar
    if (["agregar", "editar"].includes(tipo)) {
      const saldoDisponible = await getSaldoCuenta(pool, cuenta_id);
      if (saldoDisponible < monto_actual) {
        return res.status(400).json({ success: false, message: "Saldo insuficiente en la cuenta." });
      }
    }

    // Ejecutar procedimiento almacenado
    const request = pool.request()
      .input("tipo", sql.VarChar, tipo)
      .input("idObjetivo", sql.Int, idObjetivo || null)
      .input("nombre", sql.VarChar, nombre || null)
      .input("fecha_limite", sql.Date, fecha_limite ? fecha_limite.split("T")[0] : null)
      .input("monto_objetivo", sql.Decimal(10, 2), monto_objetivo ?? null)
      .input("monto_actual", sql.Decimal(10, 2), monto_actual ?? null)
      .input("usuario_id", sql.Int, usuario_id || null)
      .input("cuenta_id", sql.Int, cuenta_id || null);

    const result = await request.execute("sp_objetivos_tipo");

    return res.status(200).json({
      success: true,
      message: `Objetivo ${tipo} exitosamente`,
      result: result.recordset,
    });

  } catch (error) {
    console.error("Error en metas futuro:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getObjetivos, gestionarMetasFuturo };
