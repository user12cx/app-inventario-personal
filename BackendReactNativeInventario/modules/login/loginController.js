const { sql, poolPromise } = require("../../config/conexion");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        // Validar entrada
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { input, password } = req.body;  // Ahora 'input' puede ser email o nombre
        console.log("Body recibido:", req.body);
        const pool = await poolPromise;


        // Ejecutar el procedimiento almacenado
        const result = await pool
            .request()
            .input("input", sql.NVarChar, input)
            .input("password", sql.NVarChar, password)
            .execute("loginUsuario");

        console.log("Resultado de la consulta:", result.recordset);

        // Si no encuentra el usuario
        if (result.recordset.length === 0) {
            return res.status(400).send({ success: false, message: "Usuario no encontrado" });
        }

        const user = result.recordset[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
        }



        // Comparar la contraseña encriptada con bcrypt

        // Generar Token JWT
        const token = jwt.sign({ idUser: user.idUser, email: user.email }, "secreto123", {
            expiresIn: "2h",
        });

        return res.json({
            success: true,
            token,
            user: {
                idUser: user.idUser,
                email: user.email,
                usuario: user.usuario,
                name: user.name,
                apellidos: user.apellidos,
                telefono: user.telefono,
                ocupacion: user.ocupacion,
                fecha_registro: user.fecha_registro
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// ValidUseraciones para el login
const validateLogin = [
    body("input").notEmpty().withMessage("Debe ingresar email o usuario"),
    body("password").isLength({ min: 6 }).withMessage("Mínimo 6 caracteres"),
];



module.exports = { login, validateLogin };
