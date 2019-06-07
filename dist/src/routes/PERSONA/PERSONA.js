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
exports.routerPERSONA = router;
router.post('/INSERTAR', function (req, res) {
    var transaction = SQLSERVER_1.default.ejecutarTransacInsert();
    transaction.begin(undefined, function (err) {
        var Mssqlrequest = new sql.Request(transaction);
        Mssqlrequest.input('CODIGO', sql.VarChar, '111');
        Mssqlrequest.input('NOMBRE', sql.NVarChar, 'Harold')
            .query("INSERT INTO EJEMPLO (CODIGO) VALUES (@CODIGO)\n                        Insert into PERSONA(NOMBRE,APELLIDO,ESTADO_CIVIL,GENERO,DIRECCION,TELEFONO,EMAIL,CONTRASE\u00D1A,FECHA_NAC) \n                        VALUES (@NOMBRE)\n                        ", function (err, recorset) {
            if (err) {
                transaction.rollback();
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }
            console.log(recorset);
            transaction.commit(function (errCommit) {
                if (errCommit) {
                    transaction.rollback();
                    return res.status(400).json({
                        ok: false,
                        err: errCommit
                    });
                }
                return res.status(200).json({
                    ok: true,
                    recorset: recorset
                });
            });
        });
    });
});
router.get('/REGISTRO', function (req, res) {
    var nombre = req.query['nombre'];
    var apellido = req.query['apellido'];
    var estado = req.query['estado'];
    var genero = req.query['genero'];
    var direccion = req.query['direccion'];
    var telefono = req.query['telefono'];
    var email = req.query['email'];
    var pass = req.query['pass'];
    var id_muni = req.query['id_muni'];
    var fecha = req.query['fecha'];
    var stQuery = "\n    Insert into PERSONA(NOMBRE,APELLIDO,ESTADO_CIVIL,GENERO,DIRECCION,TELEFONO,EMAIL,CONTRASE\u00D1A,ID_MUNI,FECHA_NAC) \n    VALUES (@nombre, @apellido, @estado, @genero, @direccion, @telefono, @email, @pass, @id_muni, @fecha)\n    ";
    SQLSERVER_1.default.ejecutarQuery()
        .input('nombre', sql.NVarChar, nombre)
        .input('apellido', sql.NVarChar, apellido)
        .input('estado', sql.NVarChar, estado)
        .input('genero', sql.NVarChar, genero)
        .input('direccion', sql.NVarChar, direccion)
        .input('telefono', sql.Int, telefono)
        .input('email', sql.NVarChar, email)
        .input('pass', sql.NVarChar, pass)
        .input('id_muni', sql.Int, id_muni)
        .input('fecha', sql.NVarChar, fecha)
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
router.get('/LOGIN', function (req, res) {
    var email = req.query['email'];
    var pass = req.query['pass'];
    var stQuery = "\n    select count(1) as \"Validacion\" from persona where EMAIL=@email and CONTRASE\u00D1A=@pass\n    ";
    SQLSERVER_1.default.ejecutarQuery()
        .input('email', sql.NVarChar, email)
        .input('pass', sql.NVarChar, pass)
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
router.get('/VALIDAR', function (req, res) {
    var email = req.query['email'];
    var stQuery = "\n    select  count(1) as \"Validacion\" from persona where EMAIL=@email\n    ";
    SQLSERVER_1.default.ejecutarQuery()
        .input('email', sql.NVarChar, email)
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
router.get('/ID', function (req, res) {
    var email = req.query['email'];
    var stQuery = "\n    select  ID_USUARIO from persona where EMAIL=@email\n    ";
    SQLSERVER_1.default.ejecutarQuery()
        .input('email', sql.NVarChar, email)
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
