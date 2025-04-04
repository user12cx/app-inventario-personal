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

module.exports = { getObjetivos };
