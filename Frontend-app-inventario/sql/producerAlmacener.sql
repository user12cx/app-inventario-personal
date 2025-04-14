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
        DATENAME(MONTH, t.fecha) + ' ' + CAST(YEAR(t.fecha) AS VARCHAR) AS mes, 
        SUM(t.monto) AS total_gasto
    FROM Transacciones t
    WHERE t.usuario_id = @usuario_id
      AND t.tipo = 'gasto'
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