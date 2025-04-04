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
        const usuario_id = req.query.usuario_id || req.body.usuario_id; // Aceptar tanto query como body
        const pageNumber = parseInt(req.query.pageNumber, 10) || 1; // Página predeterminada: 1
        const pageSize = parseInt(req.query.pageSize, 10) || 5; // Tamaño predeterminado: 5 registros

        // Validar que usuario_id, pageNumber y pageSize sean números válidos
        if (!usuario_id || isNaN(Number(usuario_id))) {
            return res.status(400).json({ success: false, error: "El usuario_id es requerido y debe ser un número válido" });
        }

        if (isNaN(pageNumber) || pageNumber < 1 || isNaN(pageSize) || pageSize < 1) {
            return res.status(400).json({ success: false, error: "Parámetros de paginación inválidos" });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input("usuario_id", sql.Int, parseInt(usuario_id, 10)) // Convertir a entero
            .input("PageNumber", sql.Int, pageNumber)
            .input("PageSize", sql.Int, pageSize)
            .execute("getTransaccionesPaginadas");

        return res.status(200).json({ success: true, result: result.recordset });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { getTopGastos , getTransaccionesPaginadas };
