const { sql, poolPromise } = require("../../config/conexion");

const getTopGastos = async (req, res) => {
    try {
        const usuario_id = req.query.usuario_id || req.body.usuario_id; // Aceptar tanto query como body

        // Validar que usuario_id sea un número válido
        if (!usuario_id || isNaN(Number(usuario_id))) {
            return res.status(400).json({ success: false, error: "El usuario_id es requerido y debe ser un número válido" });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input("usuario_id", sql.Int, parseInt(usuario_id, 10)) // Convertir a entero
            .execute("getTransacciones");

        return res.status(200).json({ success: true, result: result.recordset });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const getTransaccionesPaginadas = async (req, res) => {
    try {
        const usuario_id = req.query.usuario_id || req.body.usuario_id;

        // Validar que usuario_id sea un número válido
        if (!usuario_id || isNaN(Number(usuario_id))) {
            return res.status(400).json({ success: false, error: "El usuario_id es requerido y debe ser un número válido" });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input("usuario_id", sql.Int, parseInt(usuario_id, 10))
            .execute("getTransaccionesPaginadas"); // Sin parámetros de paginación

        return res.status(200).json({ success: true, result: result.recordset });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { getTopGastos , getTransaccionesPaginadas };
