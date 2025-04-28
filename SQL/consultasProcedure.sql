use SystemaGestionPersonal;

select  * from Cuentas;
select * from ObjetivosAhorro;

EXEC sp_objetivos_ahorro_tipo
    @tipo = 'agregar',
    @nombre = 'Nuevo objetivo de prueba',
    @monto_objetivo = 5000,
    @monto_actual = 200,
    @fecha_limite = '2025-12-31',
    @usuario_id = 1,
    @cuenta_id = 2; -- ID de la cuenta (tarjeta) de donde sacarás los 200
go

EXEC sp_objetivos_ahorro_tipo
    @tipo = 'editar',
    @idObjetivo = 33,
    @nombre = 'Objetivo actualizado',
    @monto_objetivo = 5000,
    @monto_actual = 300,
    @fecha_limite = '2025-12-31',
    @usuario_id = 1,
    @cuenta_id = 3; -- Nueva cuenta
go

EXEC sp_objetivos_ahorro_tipo
    @tipo = 'eliminar',
    @idObjetivo = 33;
go

