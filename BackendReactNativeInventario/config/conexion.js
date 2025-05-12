const sql = require("mssql");

// 📌 Configuración de conexión a SQL Server
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT,), // 🔍 Asegúrate de que sea un número
    database: process.env.DB_NAME,
    options: {
        encrypt: false, // Si usas Azure, cambia a true
        trustServerCertificate: false
    },
    connectionTimeout: 30000, // Aumentar tiempo de espera (en milisegundos)
    requestTimeout: 30000 // Aumentar tiempo de espera para las consultas (en milisegundos)
};

// 📌 Crear conexión con SQL Server
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log("✅ Conectado a SQL Server");
        return pool;
    })
    .catch(err => {
        console.error("❌ Error de conexión:", err);
        process.exit(1); // Detiene la aplicación si falla la conexión
    });

// 📌 Exportar conexión
module.exports = { sql, poolPromise };
