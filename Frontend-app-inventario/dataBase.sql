CREATE DATABESE SystemaGestionPersonal

use SystemaGestionPersonal;


CREATE TABLE Usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- Hasheada por seguridad
    fecha_registro DATETIME DEFAULT GETDATE()
);


CREATE TABLE Categorias (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(10) CHECK (tipo IN ('Gasto', 'Ingreso')) NOT NULL  -- Define si es Gasto o Ingreso
);


CREATE TABLE Transacciones (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    categoria_id INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha DATETIME DEFAULT GETDATE(),
    descripcion TEXT NULL,
    tipo VARCHAR(10) CHECK (tipo IN ('Gasto', 'Ingreso')) NOT NULL, -- Para clasificar el tipo de transacción
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES Categorias(id) ON DELETE CASCADE
);


CREATE TABLE Cuentas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,  -- Ej: "Cuenta de Ahorros", "Tarjeta de Crédito"
    saldo DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE
);


CREATE TABLE ObjetivosAhorro (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    monto_objetivo DECIMAL(10,2) NOT NULL,
    monto_actual DECIMAL(10,2) DEFAULT 0.00,
    fecha_limite DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE
);







select * from Cuentas