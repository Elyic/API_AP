"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var SQLSERVER_1 = __importDefault(require("../../SQLSERVER/SQLSERVER"));
var sql = __importStar(require("mssql"));
var router = express_1.Router();
exports.routerTRABAJO = router;
router.get('/GUARDAR', function (req, res) {
    var ocupacion = req.query['ocupacion'];
    var descripcion = req.query['descripcion'];
    var id_muni = req.query['id_muni'];
    var id_categoria = req.query['id_categoria'];
    var id_usuario = req.query['id_usuario'];
    var salario = req.query['salario'];
    var stQuery = "\n    Insert into TRABAJO(OCUPACION, DESCRIPCION, ID_MUNI, ID_CATEGORIA, ID_USUARIO, SALARIO) \n    VALUES (@ocupacion, @descripcion, @id_muni, @id_categoria, @id_usuario, @salario)\n    ";
    SQLSERVER_1.default.ejecutarQuery()
        .input('ocupacion', sql.NVarChar, ocupacion)
        .input('descripcion', sql.NVarChar, descripcion)
        .input('id_muni', sql.Int, id_muni)
        .input('id_categoria', sql.Int, id_categoria)
        .input('id_usuario', sql.Int, id_usuario)
        .input('salario', sql.NVarChar, salario)
        .query(stQuery)
        .then(function (result) {
        var rowsAffected = result.rowsAffected[0];
        var recordset = result.recordset;
        return res.status(200).json({
            ok: true,
            rowsAffected: rowsAffected,
            recordset: recordset
        });
    })
        .catch(function (err) {
        return res.status(400).json({
            ok: true,
            err: err
        }); //json
    });
});
router.get('/MOSTRAR', function (req, res) {
    var stQuery = "\n    select ID_TRABAJO, OCUPACION,DESCRIPCION,NOMBRE_DEPTO,NOMBRE_CATEGORIA, SALARIO from TRABAJO \n    join MUNICIPIO on MUNICIPIO.ID_MUNI=TRABAJO.ID_MUNI\n    join CATEGORIA ON CATEGORIA.ID_CATEGORIA=TRABAJO.ID_CATEGORIA\n    JOIN DEPARTAMENTO ON DEPARTAMENTO.ID_DEPTO=MUNICIPIO.ID_DEPTO\n    ";
    SQLSERVER_1.default.ejecutarQuery()
        .query(stQuery)
        .then(function (result) {
        var rowsAffected = result.rowsAffected[0];
        var recordset = result.recordset;
        return res.status(200).json({
            ok: true,
            rowsAffected: rowsAffected,
            recordset: recordset
        });
    })
        .catch(function (err) {
        return res.status(400).json({
            ok: true,
            err: err
        }); //json
    });
});
router.get('/DETALLE', function (req, res) {
    var id_trabajo = req.query['id_trabajo'];
    var stQuery = "\n    Select OCUPACION,DESCRIPCION,NOMBRE_MUNI,NOMBRE_CATEGORIA, NOMBRE,APELLIDO,TELEFONO, NOMBRE_DEPTO, NOMBRE_PAIS, SALARIO\n    from TRABAJO \n    join MUNICIPIO on MUNICIPIO.ID_MUNI=TRABAJO.ID_MUNI\n    JOIN DEPARTAMENTO ON DEPARTAMENTO.ID_DEPTO=MUNICIPIO.ID_DEPTO\n    join CATEGORIA ON CATEGORIA.ID_CATEGORIA=TRABAJO.ID_CATEGORIA\n    JOIN PERSONA ON PERSONA.ID_USUARIO=TRABAJO.ID_USUARIO\n    JOIN PAIS ON PAIS.ID_PAIS=DEPARTAMENTO.ID_PAIS\n    WHERE ID_TRABAJO=@id_trabajo\n    ";
    SQLSERVER_1.default.ejecutarQuery()
        .input('id_trabajo', sql.Int, id_trabajo)
        .query(stQuery)
        .then(function (result) {
        var rowsAffected = result.rowsAffected[0];
        var recordset = result.recordset;
        return res.status(200).json({
            ok: true,
            rowsAffected: rowsAffected,
            recordset: recordset
        });
    })
        .catch(function (err) {
        return res.status(400).json({
            ok: true,
            err: err
        }); //json
    });
});
router.get('/CATEGORIA', function (req, res) {
    var id_categoria = req.query['id_categoria'];
    var stQuery = "\n    select ID_TRABAJO, OCUPACION,DESCRIPCION,NOMBRE_DEPTO,NOMBRE_CATEGORIA, SALARIO, CATEGORIA.ID_CATEGORIA from TRABAJO \n    join MUNICIPIO on MUNICIPIO.ID_MUNI=TRABAJO.ID_MUNI\n    join CATEGORIA ON CATEGORIA.ID_CATEGORIA=TRABAJO.ID_CATEGORIA\n    JOIN DEPARTAMENTO ON DEPARTAMENTO.ID_DEPTO=MUNICIPIO.ID_DEPTO\n\twhere CATEGORIA.ID_CATEGORIA=@id_categoria\n    ";
    SQLSERVER_1.default.ejecutarQuery()
        .input('id_categoria', sql.Int, id_categoria)
        .query(stQuery)
        .then(function (result) {
        var rowsAffected = result.rowsAffected[0];
        var recordset = result.recordset;
        return res.status(200).json({
            ok: true,
            rowsAffected: rowsAffected,
            recordset: recordset
        });
    })
        .catch(function (err) {
        return res.status(400).json({
            ok: true,
            err: err
        }); //json
    });
});
