CREATE PROCEDURE [dbo].[registerUsuario]
    @usuario NVARCHAR(255),
    @email NVARCHAR(255),
    @password NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar si el email ya está registrado
    IF EXISTS (SELECT 1 FROM Usuarios WHERE email = @email)
    BEGIN
        RAISERROR('El email ya está registrado', 16, 1);
        RETURN;
    END

    -- Insertar el nuevo usuario con la contraseña cifrada
    INSERT INTO Usuarios (usuario, email, password)
    VALUES (@usuario, @email, @password);
END;
go

---------------------------------

CREATE PROCEDURE [dbo].[loginUsuario]
    @input NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT idUser, email, usuario, password
    FROM Usuarios
    WHERE email = @input OR usuario = @input;
END;
go

-------------------------------------

CREATE PROCEDURE [dbo].[getTransaccionesPaginadas]
    @usuario_id INT  
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        t.idTransaccion, 
        t.usuario_id, 
        t.descripcion, 
        c.nombre AS categoria, 
        t.monto, 
        t.tipo, 
        cu.nombre AS cuenta, 
        t.fecha
    FROM Transacciones t
    INNER JOIN Categorias c ON t.categoria_id = c.idCategoria 
    INNER JOIN Cuentas cu ON t.cuenta_id = cu.idCuenta 
    WHERE t.usuario_id = @usuario_id  
    ORDER BY t.idTransaccion DESC;  
END;
go

-------------------------------------------

CREATE PROCEDURE [dbo].[getTransacciones]
    @usuario_id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 3 
        t.idTransaccion, 
        t.usuario_id, 
        t.descripcion, 
        c.nombre AS categoria,  
        t.monto, 
        t.tipo, 
        cu.nombre AS cuenta,  
        t.fecha
    FROM Transacciones t
    JOIN Categorias c ON t.categoria_id = c.idCategoria
    JOIN Cuentas cu ON t.cuenta_id = cu.idCuenta
    WHERE t.usuario_id = @usuario_id
    ORDER BY t.fecha DESC;
END;
go
-----------------------------------------

CREATE PROCEDURE [dbo].[getObjetivosFuturos]
AS
BEGIN
    SELECT * FROM ObjetivosAhorro;
END;
go

--------------------------------------------

CREATE PROCEDURE [dbo].[getGastosPorMes]
    @usuario_id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        LEFT(DATENAME(MONTH, t.fecha), 3) + ' ' + CAST(YEAR(t.fecha) AS VARCHAR) AS mes, 
        SUM(t.monto) AS total_gasto
    FROM Transacciones t
    INNER JOIN TipoTransaccion tt ON t.tipo_id = tt.id_tipo
    WHERE t.usuario_id = @usuario_id
      AND tt.nombre = 'gasto'  -- ← ahora se filtra por nombre del tipo
    GROUP BY YEAR(t.fecha), MONTH(t.fecha), DATENAME(MONTH, t.fecha)
    ORDER BY YEAR(t.fecha), MONTH(t.fecha);
END;
go
---------------------------------------

CREATE PROCEDURE [dbo].[getCuentas]
    @usuario_id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * 
    FROM Cuentas WHERE usuario_id = @usuario_id;
END;
go
--------------------------------------------

CREATE PROCEDURE [dbo].[getCategorias]
    @usuario_id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * 
    FROM Categorias
    WHERE usuario_id = @usuario_id;
END;
go
-------------------------------------------

CREATE PROCEDURE [dbo].[gestionarCategorias]
    @accion INT, 
    @usuario_id INT,
    @categoria_id INT = NULL, 
    @nombre NVARCHAR(100) = NULL,
    @tipo NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    PRINT 'Acción: ' + CAST(@accion AS NVARCHAR)
    PRINT 'Usuario_id: ' + CAST(@usuario_id AS NVARCHAR)
    PRINT 'Categoria_id: ' + CAST(@categoria_id AS NVARCHAR)
    PRINT 'Nombre: ' + ISNULL(@nombre, 'NULL')
    PRINT 'Tipo de Acción: ' + ISNULL(@tipo, 'NULL')

    IF @accion = 1
    BEGIN
        INSERT INTO Categorias (usuario_id, nombre, tipo) 
        VALUES (@usuario_id, @nombre, @tipo);
    END
    ELSE IF @accion = 2
    BEGIN
        UPDATE Categorias
        SET nombre = @nombre, tipo = @tipo
        WHERE idCategoria = @categoria_id AND usuario_id = @usuario_id;
    END
    ELSE IF @accion = 3
    BEGIN
        DELETE FROM Categorias
        WHERE idCategoria = @categoria_id AND usuario_id = @usuario_id;
    END
    ELSE
    BEGIN
        PRINT 'Acción no válida.'
    END
END;
go

-----------------------------------------------

CREATE PROCEDURE [dbo].[deleteCategoria]
    @id INT
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM categorias WHERE idCategoria = @id)
    BEGIN
        DELETE FROM Categorias WHERE idCategoria = @id;
        PRINT 'La categoría ha sido eliminada correctamente.';
    END
    ELSE
    BEGIN
        RAISERROR('❌ La categoría no existe.', 16, 1);
    END
END;
go

-----------------------------------------

CREATE PROCEDURE [dbo].[addCategoria]
    @usuario_id INT,
    @nombre VARCHAR(100),
    @tipo VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Categorias (usuario_id, nombre, tipo)
    VALUES (@usuario_id, @nombre, @tipo);
END;
go

ALTER PROCEDURE [dbo].[getTransaccionesPaginadas]
    @usuario_id INT  
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        t.idTransaccion, 
        t.usuario_id, 
        t.descripcion, 
        c.nombre AS categoria, 
        t.monto, 
        t.tipo, 
        cu.nombre AS cuenta, 
        t.fecha
    FROM Transacciones t
    INNER JOIN Categorias c ON t.categoria_id = c.idCategoria 
    INNER JOIN Cuentas cu ON t.cuenta_id = cu.idCuenta 
    WHERE t.usuario_id = @usuario_id  
    ORDER BY t.idTransaccion DESC;  
END
GO 

CREATE PROCEDURE [dbo].[getTransacciones]
    @usuario_id INT  -- Se elimina el valor por defecto NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 3 
        t.idTransaccion, 
        t.usuario_id, 
        t.descripcion, 
        c.nombre AS categoria,  
        t.monto, 
        t.tipo, 
        cu.nombre AS cuenta,  
        t.fecha
    FROM Transacciones t
    JOIN Categorias c ON t.categoria_id = c.idCategoria
    JOIN Cuentas cu ON t.cuenta_id = cu.idCuenta
    WHERE t.usuario_id = @usuario_id  -- Se mantiene la condición del usuario
    ORDER BY t.fecha DESC;  -- Se ordena por fecha de más reciente a más antigua
END;
GO

CREATE PROCEDURE [dbo].[addTransaccion]
    @descripcion VARCHAR(255),
    @categoria_id INT,
    @monto DECIMAL(10,2),
    @tipo_id INT,
    @cuenta_id INT,
    @fecha DATETIME,
    @usuario_id INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Insertar la transacción
    INSERT INTO Transacciones (descripcion, categoria_id, monto, tipo_id, cuenta_id, fecha, usuario_id)
    VALUES (@descripcion, @categoria_id, @monto, @tipo_id, @cuenta_id, @fecha, @usuario_id);

    -- Obtener si el tipo es 'gasto' o 'ingreso'
    DECLARE @nombreTipo VARCHAR(50);
    SELECT @nombreTipo = nombre FROM TipoTransaccion WHERE id_tipo = @tipo_id;

    -- Actualizar el saldo de la cuenta según el tipo
    IF @nombreTipo = 'gasto'
    BEGIN
        UPDATE Cuentas
        SET saldo = saldo - @monto
        WHERE idCuenta = @cuenta_id;
    END
    ELSE IF @nombreTipo = 'ingreso'
    BEGIN
        UPDATE Cuentas
        SET saldo = saldo + @monto
        WHERE idCuenta = @cuenta_id;
    END
END;
go

-- aqui actualiza edita y elimina  metas a futuro

CREATE PROCEDURE sp_objetivos_ahorro_tipo
    @tipo            VARCHAR(10),      -- 'agregar', 'editar', 'eliminar'
    @idObjetivo      INT = NULL,       -- solo necesario para editar o eliminar
    @nombre          VARCHAR(100) = NULL,
    @monto_objetivo  DECIMAL(10, 2) = NULL,
    @monto_actual    DECIMAL(10, 2) = NULL,
    @fecha_limite    DATE = NULL,
    @usuario_id      INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF @tipo = 'agregar'
    BEGIN
        INSERT INTO ObjetivosAhorro (nombre, monto_objetivo, monto_actual, fecha_limite, usuario_id)
        VALUES (@nombre, ISNULL(@monto_objetivo, 0), ISNULL(@monto_actual, 0), @fecha_limite, @usuario_id);

        SELECT SCOPE_IDENTITY() AS idNuevoObjetivo; -- devuelve el id insertado
    END
    ELSE IF @tipo = 'editar'
    BEGIN
        UPDATE ObjetivosAhorro
        SET nombre = @nombre,
            monto_objetivo = @monto_objetivo,
            monto_actual = @monto_actual,
            fecha_limite = @fecha_limite,
            usuario_id = @usuario_id
        WHERE idObjetivo = @idObjetivo;

        SELECT 'Objetivo actualizado correctamente' AS mensaje;
    END
    ELSE IF @tipo = 'eliminar'
    BEGIN
        DELETE FROM ObjetivosAhorro
        WHERE idObjetivo = @idObjetivo;

        SELECT 'Objetivo eliminado correctamente' AS mensaje;
    END
    ELSE
    BEGIN
        SELECT 'Tipo de operación no válido. Usa: agregar, editar o eliminar.' AS error;
    END
END
go

-- este es para las cuentas 

CREATE PROCEDURE sp_cuentas_tipo
    @tipo         VARCHAR(10),       -- 'agregar', 'editar', 'eliminar'
    @idCuenta     INT = NULL,        -- necesario para editar o eliminar
    @nombre       VARCHAR(100) = NULL,
    @saldo        MONEY = NULL,
    @estado       VARCHAR(10) = NULL,
    @usuario_id   INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF @tipo = 'agregar'
    BEGIN
        INSERT INTO Cuentas (nombre, saldo, estado, usuario_id)
        VALUES (@nombre, ISNULL(@saldo, 0), @estado, @usuario_id);

        SELECT SCOPE_IDENTITY() AS idNuevaCuenta; -- devuelve ID insertado
    END
    ELSE IF @tipo = 'editar'
    BEGIN
        UPDATE Cuentas
        SET nombre = @nombre,
            saldo = @saldo,
            estado = @estado,
            usuario_id = @usuario_id
        WHERE idCuenta = @idCuenta;

        SELECT 'Cuenta actualizada correctamente' AS mensaje;
    END
    ELSE IF @tipo = 'eliminar'
    BEGIN
        DELETE FROM Cuentas
        WHERE idCuenta = @idCuenta;

        SELECT 'Cuenta eliminada correctamente' AS mensaje;
    END
    ELSE
    BEGIN
        SELECT 'Tipo de operación no válido. Usa: agregar, editar o eliminar.' AS error;
    END
END
go


--prodecimiento para edidar usuarios


CREATE PROCEDURE sp_usuarios_tipo
    @tipo            VARCHAR(10),       -- 'agregar', 'editar', 'eliminar', 'listar'
    @idUser          INT = NULL,        -- para editar, eliminar o listar por ID
    @usuario         VARCHAR(20) = NULL,
    @name            VARCHAR(70) = NULL,
    @apellidos       VARCHAR(100) = NULL,
    @email           VARCHAR(100) = NULL,
    @password        VARCHAR(255) = NULL,
    @telefono        INT = NULL,
    @ocupacion       VARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF @tipo = 'agregar'
    BEGIN
        INSERT INTO Usuarios (usuario, name, apellidos, email, password, telefono, ocupacion)
        VALUES (@usuario, @name, @apellidos, @email, @password, @telefono, @ocupacion);

        SELECT SCOPE_IDENTITY() AS idNuevoUsuario;
    END
    ELSE IF @tipo = 'editar'
    BEGIN
        UPDATE Usuarios
        SET usuario = @usuario,
            name = @name,
            apellidos = @apellidos,
            email = @email,
            password = @password,
            telefono = @telefono,
            ocupacion = @ocupacion
        WHERE idUser = @idUser;

        SELECT 'Usuario actualizado correctamente' AS mensaje;
    END
    ELSE IF @tipo = 'eliminar'
    BEGIN
        DELETE FROM Usuarios
        WHERE idUser = @idUser;

        SELECT 'Usuario eliminado correctamente' AS mensaje;
    END
    ELSE IF @tipo = 'listar'
    BEGIN
        IF @idUser IS NULL
            SELECT * FROM Usuarios;
        ELSE
            SELECT * FROM Usuarios WHERE idUser = @idUser;
    END
    ELSE
    BEGIN
        SELECT 'Tipo de operación no válido. Usa: agregar, editar, eliminar o listar.' AS error;
    END
END
go

-- las acciones de objetivos y cuentas son agregar, editar y eliminar actualizada]

USE [SystemaGestionPersonal]
GO
/****** Object:  StoredProcedure [dbo].[sp_objetivos_tipo]    Script Date: 04/05/2025 16:38:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_objetivos_tipo]
    @tipo VARCHAR(10),
    @idObjetivo INT = NULL,
    @nombre VARCHAR(100) = NULL,
    @monto_objetivo DECIMAL(10,2) = NULL,
    @monto_actual DECIMAL(10,2) = NULL,
    @fecha_limite DATE = NULL,
    @usuario_id INT = NULL,
    @cuenta_id INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF @tipo = 'agregar'
    BEGIN
        -- Restar monto de la cuenta
        UPDATE Cuentas
        SET saldo = saldo - ISNULL(@monto_actual, 0)
        WHERE idCuenta = @cuenta_id;

        -- Crear objetivo
        INSERT INTO ObjetivosAhorro (nombre, monto_objetivo, monto_actual, fecha_limite, usuario_id, cuenta_id)
        VALUES (@nombre, @monto_objetivo, @monto_actual, @fecha_limite, @usuario_id, @cuenta_id);
    END
    ELSE IF @tipo = 'editar'
    BEGIN
        DECLARE @monto_anterior DECIMAL(10,2);
        SELECT @monto_anterior = monto_actual FROM ObjetivosAhorro WHERE idObjetivo = @idObjetivo;

        -- Calcular diferencia
        DECLARE @diferencia DECIMAL(10,2) = ISNULL(@monto_actual, 0) - ISNULL(@monto_anterior, 0);

        -- Restar o sumar a la cuenta
        UPDATE Cuentas
        SET saldo = saldo - @diferencia
        WHERE idCuenta = @cuenta_id;

        -- Actualizar objetivo
        UPDATE ObjetivosAhorro
        SET nombre = @nombre,
            monto_objetivo = @monto_objetivo,
            monto_actual = @monto_actual,
            fecha_limite = @fecha_limite
        WHERE idObjetivo = @idObjetivo;
    END
    ELSE IF @tipo = 'eliminar'
    BEGIN
        DECLARE @monto_actual_eliminar DECIMAL(10,2);
        SELECT @monto_actual_eliminar = monto_actual FROM ObjetivosAhorro WHERE idObjetivo = @idObjetivo;

        -- Devolver fondos
        UPDATE Cuentas
        SET saldo = saldo + @monto_actual_eliminar
        WHERE idCuenta = (SELECT cuenta_id FROM ObjetivosAhorro WHERE idObjetivo = @idObjetivo);

        -- Eliminar objetivo
        DELETE FROM ObjetivosAhorro WHERE idObjetivo = @idObjetivo;
    END
    ELSE IF @tipo = 'listar'
    BEGIN
        SELECT * FROM ObjetivosAhorro WHERE usuario_id = @usuario_id;
    END
END

BEGIN
    SET NOCOUNT ON;

    IF @tipo = 'agregar'
    BEGIN
        -- Restar monto de la cuenta
        UPDATE Cuentas
        SET saldo = saldo - ISNULL(@monto_actual, 0)
        WHERE idCuenta = @cuenta_id;

        -- Crear objetivo
        INSERT INTO ObjetivosAhorro (nombre, monto_objetivo, monto_actual, fecha_limite, usuario_id, cuenta_id)
        VALUES (@nombre, @monto_objetivo, @monto_actual, @fecha_limite, @usuario_id, @cuenta_id);
    END
    ELSE IF @tipo = 'editar'
    BEGIN
        DECLARE @monto_anterior DECIMAL(10,2);
        SELECT @monto_anterior = monto_actual FROM ObjetivosAhorro WHERE idObjetivo = @idObjetivo;

        -- Calcular diferencia
        DECLARE @diferencia DECIMAL(10,2) = ISNULL(@monto_actual, 0) - ISNULL(@monto_anterior, 0);

        -- Restar o sumar a la cuenta
        UPDATE Cuentas
        SET saldo = saldo - @diferencia
        WHERE idCuenta = @cuenta_id;

        -- Actualizar objetivo
        UPDATE ObjetivosAhorro
        SET nombre = @nombre,
            monto_objetivo = @monto_objetivo,
            monto_actual = @monto_actual,
            fecha_limite = @fecha_limite
        WHERE idObjetivo = @idObjetivo;
    END
    ELSE IF @tipo = 'eliminar'
    BEGIN
        DECLARE @monto_actual_eliminar DECIMAL(10,2);
        SELECT @monto_actual_eliminar = monto_actual FROM ObjetivosAhorro WHERE idObjetivo = @idObjetivo;

        -- Devolver fondos
        UPDATE Cuentas
        SET saldo = saldo + @monto_actual_eliminar
        WHERE idCuenta = (SELECT cuenta_id FROM ObjetivosAhorro WHERE idObjetivo = @idObjetivo);

        -- Eliminar objetivo
        DELETE FROM ObjetivosAhorro WHERE idObjetivo = @idObjetivo;
    END
    ELSE IF @tipo = 'listar'
    BEGIN
        SELECT * FROM ObjetivosAhorro WHERE usuario_id = @usuario_id;
    END
END
go