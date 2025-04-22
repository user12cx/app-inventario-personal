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

const gestionarCuentas = async (req, res) => {
    try {
        const pool = await poolPromise;
        const { tipo, idCuenta, nombre, saldo, estado, usuario_id } = req.body;

        if (!tipo || !["agregar", "editar", "eliminar"].includes(tipo)) {
            return res.status(400).send("Tipo de operación no válido");
        }

        // Validación básica de usuario
        if ((tipo !== 'listar' || idCuenta) && !usuario_id) {
            return res.status(400).send("El usuario_id es requerido");
        }

        // Crear la solicitud SQL
        const request = pool.request()
            .input("tipo", sql.VarChar, tipo)
            .input("idCuenta", sql.Int, idCuenta || null)
            .input("nombre", sql.VarChar, nombre || null)
            .input("saldo", sql.Money, saldo != null ? saldo : null)
            .input("estado", sql.VarChar, estado || null)
            .input("usuario_id", sql.Int, usuario_id || null);

        // Ejecutar el procedimiento
        const result = await request.execute("sp_cuentas_tipo");

        // Enviar los resultados si es un listado
        if (tipo === "listar") {
            return res.status(200).send({ success: true, data: result.recordset });
        }

        // Para las demás operaciones
        return res.status(200).send({ success: true, message: "Operación realizada con éxito." });

    } catch (error) {
        console.error("Error al ejecutar procedimiento de cuentas: ", error);
        return res.status(500).send({ success: false, error: error.message });
    }
};


module.exports = { getCuenta, gestionarCuentas };
