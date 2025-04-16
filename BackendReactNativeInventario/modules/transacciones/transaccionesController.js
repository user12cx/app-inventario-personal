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

const addTransaccion = async (req, res) => {
    try {
        const {
            descripcion,
            categoria_id,
            monto,
            tipo_id,
            cuenta_id,
            fecha,
            usuario_id
        } = req.body;

        // Validación básica
        if (!descripcion || !categoria_id || !monto || !tipo_id || !cuenta_id || !fecha || !usuario_id) {
            return res.status(400).json({ success: false, error: "Todos los campos son requeridos" });
        }

        const pool = await poolPromise;
        await pool.request()
            .input('descripcion', sql.VarChar(255), descripcion)
            .input('categoria_id', sql.Int, parseInt(categoria_id))
            .input('monto', sql.Decimal(10, 2), parseFloat(monto))
            .input('tipo_id', sql.Int, parseInt(tipo_id))
            .input('cuenta_id', sql.Int, parseInt(cuenta_id))
            .input('fecha', sql.DateTime, new Date(fecha))
            .input('usuario_id', sql.Int, parseInt(usuario_id))
            .execute('addTransaccion');

        return res.status(200).json({ success: true, message: "Transacción registrada correctamente" });

    } catch (error) {
        console.error("Error en addTransaccion:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
module.exports = { getTopGastos , getTransaccionesPaginadas, addTransaccion };
