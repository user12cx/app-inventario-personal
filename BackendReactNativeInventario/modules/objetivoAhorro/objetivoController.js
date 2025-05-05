const { sql, poolPromise } = require("../../config/conexion");

const getObjetivos = async (req, res) => {
  try {
    const pool = await poolPromise;
    const usuario_id = req.query.usuario_id || req.body.usuario_id; // Obtener el usuario desde la petición
    
    if (!usuario_id) {
      return res.status(400).send({ success: false, error: "El usuario_id es requerido" });
  }
  const result = await pool.request()
  .input("usuario_id", sql.Int, usuario_id) // Pasar el usuario como parámetro
  .execute("getObjetivosFuturos"); // Ejecutar el procedimiento almacenado


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

    if (tipo === "agregar") {
      if (!cuenta_id) {
        return res.status(400).json({ success: false, message: "El cuenta_id es requerido para agregar una meta" });
      }

      // Consultar saldo actual
      const saldoRequest = pool.request().input("cuenta_id", sql.Int, cuenta_id);
      const saldoResult = await saldoRequest.query("SELECT saldo FROM Cuentas WHERE idCuenta = @cuenta_id");
      const saldoDisponible = saldoResult.recordset[0]?.saldo || 0;

      if (saldoDisponible < monto_actual) {
        return res.status(400).json({ success: false, message: "Saldo insuficiente en la cuenta para agregar la meta." });
      }

      // Descontar saldo inicial
      await pool.request()
        .input("monto", sql.Decimal(10, 2), monto_actual)
        .input("cuenta_id", sql.Int, cuenta_id)
        .query("UPDATE Cuentas SET saldo = saldo - @monto WHERE idCuenta = @cuenta_id");

      // Insertar objetivo nuevo
      const request = pool.request()
        .input("tipo", sql.VarChar, tipo)
        .input("idObjetivo", sql.Int, null)
        .input("nombre", sql.VarChar, nombre)
        .input("fecha_limite", sql.Date, fecha_limite ? fecha_limite.split("T")[0] : null)
        .input("monto_objetivo", sql.Decimal(10, 2), monto_objetivo)
        .input("monto_actual", sql.Decimal(10, 2), monto_actual)
        .input("usuario_id", sql.Int, usuario_id)
        .input("cuenta_id", sql.Int, cuenta_id);

      const result = await request.execute("sp_objetivos_ahorro_tipo");

      return res.status(200).json({
        success: true,
        message: "Objetivo agregado exitosamente",
        result: result.recordset,
      });
    }

    if (tipo === "editar") {
      if (!idObjetivo || !cuenta_id || !monto_actual) {
        return res.status(400).json({ success: false, message: "idObjetivo, cuenta_id y monto_actual son requeridos para editar" });
      }

      // Obtener información actual del objetivo
      const objetivoRequest = pool.request().input("idObjetivo", sql.Int, idObjetivo);
      const objetivoResult = await objetivoRequest.query("SELECT monto_actual, monto_objetivo FROM ObjetivosAhorro WHERE idObjetivo = @idObjetivo");
      const objetivo = objetivoResult.recordset[0];

      if (!objetivo) {
        return res.status(404).json({ success: false, message: "Objetivo no encontrado." });
      }

      const nuevoMontoActual = objetivo.monto_actual + monto_actual;

      if (nuevoMontoActual > objetivo.monto_objetivo) {
        return res.status(400).json({ success: false, message: "El monto supera el objetivo de ahorro." });
      }

      // Consultar saldo disponible de la cuenta
      const saldoRequest = pool.request().input("cuenta_id", sql.Int, cuenta_id);
      const saldoResult = await saldoRequest.query("SELECT saldo FROM Cuentas WHERE idCuenta = @cuenta_id");
      const saldoDisponible = saldoResult.recordset[0]?.saldo || 0;

      if (saldoDisponible < monto_actual) {
        return res.status(400).json({ success: false, message: "Saldo insuficiente en la cuenta para agregar al objetivo." });
      }

      // Descontar saldo
      await pool.request()
        .input("monto", sql.Decimal(10, 2), monto_actual)
        .input("cuenta_id", sql.Int, cuenta_id)
        .query("UPDATE Cuentas SET saldo = saldo - @monto WHERE idCuenta = @cuenta_id");

      // Actualizar el monto_actual del objetivo
      await pool.request()
        .input("idObjetivo", sql.Int, idObjetivo)
        .input("monto_actual", sql.Decimal(10, 2), nuevoMontoActual)
        .query("UPDATE ObjetivosAhorro SET monto_actual = @monto_actual WHERE idObjetivo = @idObjetivo");

      return res.status(200).json({
        success: true,
        message: "Objetivo actualizado exitosamente",
      });
    }

    if (tipo === "eliminar") {
      if (!idObjetivo) {
        return res.status(400).json({ success: false, message: "idObjetivo requerido para eliminar" });
      }

      // Recuperar monto_actual y cuenta
      const objetivoResult = await pool.request()
        .input("idObjetivo", sql.Int, idObjetivo)
        .query("SELECT monto_actual, cuenta_id FROM ObjetivosAhorro WHERE idObjetivo = @idObjetivo");

      const objetivo = objetivoResult.recordset[0];
      if (!objetivo) {
        return res.status(404).json({ success: false, message: "Objetivo no encontrado." });
      }

      const montoActual = objetivo.monto_actual;
      const cuentaId = objetivo.cuenta_id;

      if (cuentaId) {
        // Devolver saldo
        await pool.request()
          .input("monto", sql.Decimal(10, 2), montoActual)
          .input("cuenta_id", sql.Int, cuentaId)
          .query("UPDATE Cuentas SET saldo = saldo + @monto WHERE idCuenta = @cuenta_id");
      }

      // Eliminar objetivo
      await pool.request()
        .input("idObjetivo", sql.Int, idObjetivo)
        .query("DELETE FROM ObjetivosAhorro WHERE idObjetivo = @idObjetivo");

      return res.status(200).json({
        success: true,
        message: "Objetivo eliminado exitosamente",
      });
    }

  } catch (error) {
    console.error("Error en metas futuro:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getObjetivos, gestionarMetasFuturo };
