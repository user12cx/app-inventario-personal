const { sql, poolPromise } = require("../../config/conexion");

const getObjetivos = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("EXEC getObjetivosFuturos");

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

    if (!tipo || !["agregar", "editar", "eliminar", "listar"].includes(tipo)) {
      return res.status(400).json({ success: false, message: "Tipo de operación no válido" });
    }

    const request = pool.request()
      .input("tipo", sql.VarChar, tipo)
      .input("idObjetivo", sql.Int, idObjetivo || null)
      .input("nombre", sql.VarChar, nombre || null)
      .input("fecha_limite", sql.Date, fecha_limite ? fecha_limite.split("T")[0] : null)
      .input("monto_objetivo", sql.Decimal(10, 2), monto_objetivo != null ? monto_objetivo : null)
      .input("monto_actual", sql.Decimal(10, 2), monto_actual != null ? monto_actual : null)
      .input("usuario_id", sql.Int, usuario_id || null)
      .input("cuenta_id", sql.Int, cuenta_id || null);

    if (tipo === "agregar" || tipo === "editar") {
      if (!cuenta_id) {
        return res.status(400).json({ success: false, message: "El cuenta_id es requerido para agregar o editar una meta" });
      }

      if (tipo === "agregar") {
        console.log("🟢 Agregando objetivo con:", {
          tipo,
          idObjetivo,
          nombre,
          fecha_limite,
          monto_objetivo,
          monto_actual,
          usuario_id,
          cuenta_id,
        });

        const saldoRequest = pool.request().input("cuenta_id", sql.Int, cuenta_id);
        const saldoResult = await saldoRequest.query("SELECT saldo FROM Cuentas WHERE idCuenta = @cuenta_id");
        const saldoDisponible = saldoResult.recordset[0]?.saldo || 0;

        if (saldoDisponible < monto_actual) {
          return res.status(400).json({
            success: false,
            message: "Saldo insuficiente en la cuenta para agregar la meta."
          });
        }

        await pool.request()
          .input("monto", sql.Decimal(10, 2), monto_actual)
          .input("cuenta_id", sql.Int, cuenta_id)
          .query("UPDATE Cuentas SET saldo = saldo - @monto WHERE idCuenta = @cuenta_id");
      }

      if (tipo === "editar") {
        const metaRequest = pool.request().input("idObjetivo", sql.Int, idObjetivo);
        const metaResult = await metaRequest.query("SELECT monto_actual FROM ObjetivosAhorro WHERE idObjetivo = @idObjetivo");
        const montoAnterior = metaResult.recordset[0]?.monto_actual || 0;
        const diferencia = monto_actual - montoAnterior;

        await pool.request()
          .input("monto", sql.Decimal(10, 2), diferencia)
          .input("cuenta_id", sql.Int, cuenta_id)
          .query("UPDATE Cuentas SET saldo = saldo - @monto WHERE idCuenta = @cuenta_id");
      }
    }

    console.log("⚙️ Ejecutando SP con:", {
      tipo,
      idObjetivo,
      nombre,
      fecha_limite,
      monto_objetivo,
      monto_actual,
      usuario_id,
      cuenta_id,
    });

    const result = await request.execute("sp_objetivos_tipo");

    return res.status(200).json({
      success: true,
      message: "Operación realizada correctamente",
      result: result.recordset,
    });
  } catch (error) {
    console.error("❌ Error en metas futuro:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getObjetivos, gestionarMetasFuturo };
