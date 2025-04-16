CREATE DATABASE SystemaGestionPersonal;

USE SystemaGestionPersonal;

CREATE TABLE Usuarios (
	idUser INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	usuario VARCHAR(20),
	name VARCHAR(70) NOT NULL,
	apellidos VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(255) NOT NULL,
	telefono INT,
	ocupacion VARCHAR(50),
	fotoPerfil VARBINARY(MAX),
	fecha_registro DATETIME DEFAULT GETDATE()
);

CREATE TABLE Categorias (
	idCategoria INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	nombre VARCHAR(100) NOT NULL,
	tipo VARCHAR(50) NOT NULL,
	usuario_id INT,
	FOREIGN KEY (usuario_id) REFERENCES Usuarios(idUser)
);

CREATE TABLE Cuentas (
	idCuenta INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	nombre VARCHAR(100),
	saldo MONEY DEFAULT 0,
	estado VARCHAR(10) NOT NULL,
	usuario_id INT,
	FOREIGN KEY (usuario_id) REFERENCES Usuarios(idUser)
);

CREATE TABLE ObjetivoAhorro (
	idObjetivo INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	nombre VARCHAR(100) NOT NULL,
	monto_objetivo DECIMAL(10,2) NOT NULL DEFAULT 0,
	monto_actual DECIMAL(10,2) NOT NULL DEFAULT 0,
	fecha_limite DATE,
	usuario_id INT,
	FOREIGN KEY (usuario_id) REFERENCES Usuarios(idUser)
);

CREATE TABLE Transacciones (
	idTransaccion INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	descripcion VARCHAR(255) NOT NULL,
	categoria_id INT,
	monto DECIMAL(10,2) NOT NULL,
	tipo_id INT NOT NULL,
	cuenta_id INT,
	fecha DATETIME NOT NULL,
	usuario_id INT,
	FOREIGN KEY (categoria_id) REFERENCES Categorias(idCategoria),
	FOREIGN KEY (cuenta_id) REFERENCES Cuentas(idCuenta),
	FOREIGN KEY (usuario_id) REFERENCES Usuarios(idUser),
	FOREIGN KEY (tipo_id) REFERENCES TipoTransaccion(id_tipo)
);

CREATE TABLE TipoTransaccion (
    id_tipo INT IDENTITY (1,1) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);