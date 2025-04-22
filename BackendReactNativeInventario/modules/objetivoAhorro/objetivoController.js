const { sql, poolPromise } = require("../../config/conexion");

const getObjetivos = async (req, res) => {
    try {
        const pool = await poolPromise; // 🔍 Obtén la conexión de poolPromise
        const result = await pool.request().query("EXEC getObjetivosFuturos"); // Ejecuta el procedimiento almacenado

        return res.status(200).send({ success: true, result: result.recordset });
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
};
const gestionarMetasFuturo = async (req, res) => {
    try {
        const pool = await poolPromise;
        const {
            tipo,
            idMeta,
            descripcion,
            fecha_objetivo,
            monto_estimado,
            monto_actual,
            usuario_id,
            cuenta_id  // Agregamos cuenta_id
        } = req.body;

        if (!tipo || !["agregar", "editar", "eliminar", "listar"].includes(tipo)) {
            return res.status(400).send("Tipo de operación no válido");
        }

        // Crear la solicitud SQL
        const request = pool.request()
            .input("tipo", sql.VarChar, tipo)
            .input("idMeta", sql.Int, idMeta || null)
            .input("descripcion", sql.VarChar, descripcion || null)
            .input("fecha_objetivo", sql.Date, fecha_objetivo || null)
            .input("monto_estimado", sql.Decimal(10, 2), monto_estimado != null ? monto_estimado : null)
            .input("monto_actual", sql.Decimal(10, 2), monto_actual != null ? monto_actual : null)
            .input("usuario_id", sql.Int, usuario_id || null)
            .input("cuenta_id", sql.Int, cuenta_id || null);

        // Si el tipo es "agregar" o "editar", realizamos la lógica para restar/sumar de la cuenta
        if (tipo === "agregar" || tipo === "editar") {
            if (!cuenta_id) {
                return res.status(400).send("El cuenta_id es requerido para agregar o editar una meta");
            }

            // Si es agregar, restamos del saldo de la cuenta
            if (tipo === "agregar") {
                const saldoRequest = pool.request().input("cuenta_id", sql.Int, cuenta_id);
                const saldoResult = await saldoRequest.query("SELECT saldo FROM Cuentas WHERE idCuenta = @cuenta_id");

                const saldoDisponible = saldoResult.recordset[0]?.saldo || 0;
                if (saldoDisponible < monto_actual) {
                    return res.status(400).send("Saldo insuficiente en la cuenta para agregar la meta.");
                }

                // Restamos del saldo de la cuenta
                await pool.request()
                    .input("monto", sql.Decimal(10, 2), monto_actual)
                    .input("cuenta_id", sql.Int, cuenta_id)
                    .query("UPDATE Cuentas SET saldo = saldo - @monto WHERE idCuenta = @cuenta_id");
            }

            // Si es editar, calculamos la diferencia de monto y actualizamos
            if (tipo === "editar") {
                const metaRequest = pool.request().input("idMeta", sql.Int, idMeta);
                const metaResult = await metaRequest.query("SELECT monto_actual FROM ObjetivosAhorro WHERE idObjetivo = @idMeta");

                const montoAnterior = metaResult.recordset[0]?.monto_actual || 0;
                const diferencia = monto_actual - montoAnterior;

                // Ajustamos el saldo de la cuenta según la diferencia
                await pool.request()
                    .input("monto", sql.Decimal(10, 2), diferencia)
                    .input("cuenta_id", sql.Int, cuenta_id)
                    .query("UPDATE Cuentas SET saldo = saldo - @monto WHERE idCuenta = @cuenta_id");
            }
        }

        // Ejecutar el procedimiento almacenado
        const result = await request.execute("sp_metasfuturo_tipo");

    } catch (error) {
        console.error("Error en metas futuro:", error);
        return res.status(500).send({ success: false, error: error.message });
    }
};


module.exports = { getObjetivos, gestionarMetasFuturo };
