const { sql, poolPromise } = require("../../config/conexion");

const getGastosPorMes = async (req, res) => {
    try {
        const usuario_id = req.query.usuario_id || req.body.usuario_id;

        // Validar el usuario_id
        if (!usuario_id || isNaN(Number(usuario_id))) {
            return res.status(400).json({ success: false, error: "usuario_id inválido" });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input("usuario_id", sql.Int, parseInt(usuario_id, 10))
            .execute("getGastosPorMes");

        return res.status(200).json({ success: true, result: result.recordset });
    } catch (error) {
        console.error("Error al obtener gastos por mes:", error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getGastosPorMes
};
