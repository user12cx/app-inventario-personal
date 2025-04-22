const { sql, poolPromise } = require("../../config/conexion");

const gestionarUsuarios = async (req, res) => {
    try {
        const pool = await poolPromise;
        const {
            tipo,
            idUser,
            usuario,
            name,
            apellidos,
            email,
            password,
            telefono,
            ocupacion
        } = req.body;

        if (!tipo || !["agregar", "editar", "eliminar", "listar"].includes(tipo)) {
            return res.status(400).send("Tipo de operación no válido");
        }

        const request = pool.request()
            .input("tipo", sql.VarChar, tipo)
            .input("idUser", sql.Int, idUser || null)
            .input("usuario", sql.VarChar, usuario || null)
            .input("name", sql.VarChar, name || null)
            .input("apellidos", sql.VarChar, apellidos || null)
            .input("email", sql.VarChar, email || null)
            .input("password", sql.VarChar, password || null)
            .input("telefono", sql.Int, telefono || null)
            .input("ocupacion", sql.VarChar, ocupacion || null);

        const result = await request.execute("sp_usuarios_tipo");

        if (tipo === "listar") {
            return res.status(200).send({ success: true, data: result.recordset });
        }

        return res.status(200).send({ success: true, message: "Operación realizada con éxito." });

    } catch (error) {
        console.error("Error al ejecutar procedimiento de usuarios:", error);
        return res.status(500).send({ success: false, error: error.message });
    }
};
  

module.exports= { gestionarUsuarios };