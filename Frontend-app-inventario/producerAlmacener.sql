-- listar

CREATE PROCEDURE getCategorias
AS
BEGIN
    SELECT * FROM Categorias;
END;
go

--------------------------
CREATE PROCEDURE getCuentas
AS
BEGIN
    SELECT * FROM Cuentas;
END;

------------------------

CREATE PROCEDURE getObjetivosFututo
AS
BEGIN
    SELECT * FROM ObjetivosAhorro;
END;

----------------------------

CREATE PROCEDURE sp_CrearUsuario
    @nombre VARCHAR(100),
    @email VARCHAR(100),
    @password VARCHAR(255)
AS
BEGIN
    INSERT INTO Usuarios (nombre, email, password)
    VALUES (@nombre, @email, HASHBYTES('SHA2_256', @password));
END;
Leer Usuarios
sql
Copiar
Editar
CREATE PROCEDURE sp_ObtenerUsuarios
AS
BEGIN
    SELECT * FROM Usuarios;
END;
Actualizar Usuario
sql
Copiar
Editar
CREATE PROCEDURE sp_ActualizarUsuario
    @id INT,
    @nombre VARCHAR(100),
    @email VARCHAR(100)
AS
BEGIN
    UPDATE Usuarios
    SET nombre = @nombre, email = @email
    WHERE id = @id;
END;
Eliminar Usuario
sql
Copiar
Editar
CREATE PROCEDURE sp_EliminarUsuario
    @id INT
AS
BEGIN
    DELETE FROM Usuarios WHERE id = @id;
END;
Procedimientos para la tabla Categorias
Crear Categoría
sql
Copiar
Editar
CREATE PROCEDURE sp_CrearCategoria
    @nombre VARCHAR(100),
    @tipo VARCHAR(10)
AS
BEGIN
    INSERT INTO Categorias (nombre, tipo)
    VALUES (@nombre, @tipo);
END;
Leer Categorías
sql
Copiar
Editar
CREATE PROCEDURE sp_ObtenerCategorias
AS
BEGIN
    SELECT * FROM Categorias;
END;
Actualizar Categoría
sql
Copiar
Editar
CREATE PROCEDURE sp_ActualizarCategoria
    @id INT,
    @nombre VARCHAR(100),
    @tipo VARCHAR(10)
AS
BEGIN
    UPDATE Categorias
    SET nombre = @nombre, tipo = @tipo
    WHERE id = @id;
END;
Eliminar Categoría
sql
Copiar
Editar
CREATE PROCEDURE sp_EliminarCategoria
    @id INT
AS
BEGIN
    DELETE FROM Categorias WHERE id = @id;
END;
Procedimientos para la tabla Transacciones
Crear Transacción
sql
Copiar
Editar
CREATE PROCEDURE sp_CrearTransaccion
    @usuario_id INT,
    @categoria_id INT,
    @monto DECIMAL(10,2),
    @descripcion TEXT,
    @tipo VARCHAR(10)
AS
BEGIN
    INSERT INTO Transacciones (usuario_id, categoria_id, monto, descripcion, tipo)
    VALUES (@usuario_id, @categoria_id, @monto, @descripcion, @tipo);
END;
Leer Transacciones
sql
Copiar
Editar
CREATE PROCEDURE sp_ObtenerTransacciones
AS
BEGIN
    SELECT * FROM Transacciones;
END;
Actualizar Transacción
sql
Copiar
Editar
CREATE PROCEDURE sp_ActualizarTransaccion
    @id INT,
    @monto DECIMAL(10,2),
    @descripcion TEXT
AS
BEGIN
    UPDATE Transacciones
    SET monto = @monto, descripcion = @descripcion
    WHERE id = @id;
END;
Eliminar Transacción
sql
Copiar
Editar
CREATE PROCEDURE sp_EliminarTransaccion
    @id INT
AS
BEGIN
    DELETE FROM Transacciones WHERE id = @id;
END;
Procedimientos para la tabla Cuentas
Crear Cuenta
sql
Copiar
Editar
CREATE PROCEDURE sp_CrearCuenta
    @usuario_id INT,
    @nombre VARCHAR(100),
    @saldo DECIMAL(10,2)
AS
BEGIN
    INSERT INTO Cuentas (usuario_id, nombre, saldo)
    VALUES (@usuario_id, @nombre, @saldo);
END;
Leer Cuentas
sql
Copiar
Editar
CREATE PROCEDURE sp_ObtenerCuentas
AS
BEGIN
    SELECT * FROM Cuentas;
END;
Actualizar Cuenta
sql
Copiar
Editar
CREATE PROCEDURE sp_ActualizarCuenta
    @id INT,
    @saldo DECIMAL(10,2)
AS
BEGIN
    UPDATE Cuentas
    SET saldo = @saldo
    WHERE id = @id;
END;
Eliminar Cuenta
sql
Copiar
Editar
CREATE PROCEDURE sp_EliminarCuenta
    @id INT
AS
BEGIN
    DELETE FROM Cuentas WHERE id = @id;
END;
Procedimientos para la tabla ObjetivosAhorro
Crear Objetivo de Ahorro
sql
Copiar
Editar
CREATE PROCEDURE sp_CrearObjetivoAhorro
    @usuario_id INT,
    @nombre VARCHAR(100),
    @monto_objetivo DECIMAL(10,2),
    @fecha_limite DATE
AS
BEGIN
    INSERT INTO ObjetivosAhorro (usuario_id, nombre, monto_objetivo, fecha_limite)
    VALUES (@usuario_id, @nombre, @monto_objetivo, @fecha_limite);
END;
Leer Objetivos de Ahorro
sql
Copiar
Editar
CREATE PROCEDURE sp_ObtenerObjetivosAhorro
AS
BEGIN
    SELECT * FROM ObjetivosAhorro;
END;
Actualizar Objetivo de Ahorro
sql
Copiar
Editar
CREATE PROCEDURE sp_ActualizarObjetivoAhorro
    @id INT,
    @monto_actual DECIMAL(10,2)
AS
BEGIN
    UPDATE ObjetivosAhorro
    SET monto_actual = @monto_actual
    WHERE id = @id;
END;
Eliminar Objetivo de Ahorro
sql
Copiar
Editar
CREATE PROCEDURE sp_EliminarObjetivoAhorro
    @id INT
AS
BEGIN
    DELETE FROM ObjetivosAhorro WHERE id = @id;
END;
Ejemplo de cómo llamar los procedimientos almacenados
sql
Copiar
Editar
EXEC sp_CrearUsuario 'Juan Pérez', 'juan@example.com', '123456';

EXEC sp_ObtenerUsuarios;

EXEC sp_ActualizarUsuario 1, 'Juan P.', 'juanperez@example.com';

EXEC sp_EliminarUsuario 1;