const { sql, poolPromise } = require("../../config/conexion");

const getCuenta = async (req, res) => {
    try {
        const usuario_id = req.query.usuario_id || req.body.usuario_id; // Acepta query y body

        // Validar que usuario_id sea un número válido
        if (!usuario_id || isNaN(Number(usuario_id))) {
            return res.status(400).json({ success: false, error: "El usuario_id es requerido y debe ser un número válido" });
        }

        const pool = await poolPromise; // Obtiene la conexión
        const result = await pool.request()
            .input("usuario_id", sql.Int, parseInt(usuario_id, 10)) // Pasa el usuario_id como parámetro
            .execute("getCuentas"); // Ejecuta el procedimiento almacenado

        // Verifica si hay datos en el recordset
        if (result.recordset.length > 0) {
            return res.status(200).json({ success: true, result: result.recordset });
        } else {
            return res.status(404).json({ success: false, message: "No se encontraron cuentas para este usuario." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { getCuenta };
