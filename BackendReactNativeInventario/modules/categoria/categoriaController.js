const { sql, poolPromise } = require("../../config/conexion");

const getCategoria = async (req, res) => {
    try {
        const pool = await poolPromise;
        const usuario_id = req.query.usuario_id || req.body.usuario_id; // Obtener el usuario desde la petición

        if (!usuario_id) {
            return res.status(400).send({ success: false, error: "El usuario_id es requerido" });
        }

        const result = await pool.request()
            .input("usuario_id", sql.Int, usuario_id) // Pasar el usuario como parámetro
            .execute("getCategorias"); // Ejecutar el procedimiento almacenado

        return res.status(200).send({ success: true, result: result.recordset });
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
};

const gestionarCategorias = async (req, res) => {
    try {
        const pool = await poolPromise;
        const { accion, usuario_id, categoria_id, nombre } = req.body;  // Recibimos los datos desde el body

        if (!usuario_id) {
            return res.status(400).send({ success: false, error: "El usuario_id es requerido" });
        }

        // Verificamos si la operación es válida
        if (![1, 2, 3].includes(accion)) {
            return res.status(400).send({ success: false, error: "Acción no válida" });
        }

        // Llamamos al procedimiento almacenado con los parámetros
        const result = await pool.request()
            .input("accion", sql.Int, accion)  // 1 = Agregar, 2 = Editar, 3 = Eliminar
            .input("usuario_id", sql.Int, usuario_id)
            .input("categoria_id", sql.Int, categoria_id || null)  // Pasamos NULL si no hay categoria_id
            .input("nombre", sql.NVarChar, nombre || null)  // Pasamos NULL si no hay nombre
            .execute("gestionarCategorias");  // Llamamos al procedimiento almacenado

        // Verificamos si la operación afectó alguna fila
        if (result) {
            return res.status(200).send({ success: true, message: "Operación realizada con éxito." });
        } else {
            return res.status(400).send({ success: false, error: "No se pudo completar la operación, verifique los datos." });
        }

    } catch (error) {
        console.error("Error al ejecutar el procedimiento: ", error);
        return res.status(500).send({ success: false, error: error.message });
    }
};



module.exports = { getCategoria , gestionarCategorias};

