const { sql, poolPromise } = require("../../config/conexion");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
        // Validar entrada
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { usuario, email, password } = req.body;
        const pool = await poolPromise;

        // Verificar si el usuario ya existe
        const userExists = await pool
            .request()
            .input("email", sql.NVarChar, email)
            .query("SELECT email FROM Usuarios WHERE email = @email");

        if (userExists.recordset.length > 0) {
            return res.status(400).json({ success: false, message: "El correo ya está registrado" });
        }

        // Cifrar la contraseña de forma asíncrona
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Ejecutar el procedimiento almacenado para registrar al usuario
        await pool
            .request()
            .input("usuario", sql.NVarChar, usuario.trim())
            .input("email", sql.NVarChar, email.trim())
            .input("password", sql.NVarChar, hashedPassword)
            .query("EXEC registerUsuario @usuario, @email, @password");

        return res.status(201).json({ success: true, message: "Usuario registrado correctamente" });

    } catch (error) {
        console.error("Error en el registro:", error);
        return res.status(500).json({ success: false, error: "Error interno del servidor" });
    }
};

// Validaciones para el registro
const validateRegister = [
    body("usuario")
        .trim()
        .notEmpty().withMessage("El usuario Login es obligatorio")
        .isLength({ min: 5 }).withMessage("El usuario debe tener al menos 5 caracteres"),
    body("email")
        .trim()
        .isEmail().withMessage("Correo inválido"),
    body("password")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];

module.exports = { register, validateRegister };
