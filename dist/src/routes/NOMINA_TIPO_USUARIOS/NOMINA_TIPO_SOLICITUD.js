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
router.get('/NOMINA_TIPO_SOLICITUD_VACACION', function (req, res) {
    console.log('ejecutando NOMINA_TIPO_SOLICITUD_VACACION');
    var usuario = req.query['usuario'];
    var stQuery = "\n                        SELECT \n                        NT.CODIGO_TIPO\n                        ,RTRIM(NT.DESCRIPCION) AS DESCRIPCION\n                        ,count(VS.CODIGO_TIPO) AS CANTIDAD\n                        FROM NOMINA_TIPO_USUARIOS NTU\n                        INNER JOIN NOMINA_TIPO  NT\n                        ON NT.CODIGO_TIPO = NTU.CODIGO_TIPO\n                        LEFT JOIN VACACION_SOLICITUD VS\n                        ON VS.CODIGO_TIPO = NT.CODIGO_TIPO\n                        AND VS.ESTADO_SOLICITUD = 'P'\n                        WHERE NTU.NOMBRE_CORTO_ID = @NOMBRE_CORTO_ID\n                        GROUP BY NT.CODIGO_TIPO, NT.DESCRIPCION\n                        ";
    console.log(stQuery);
    SQLSERVER_1.default.ejecutarQuery()
        .input('NOMBRE_CORTO_ID', sql.VarChar, usuario)
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
        });
    });
});
router.get('/NOMINA_TIPO_SOLICITUD_VACACION_CARD', function (req, res) {
    console.log('ejecutando NOMINA_TIPO_SOLICITUD_VACACION_CARD');
    var usuario = req.query['usuario'];
    var nominatipo = req.query['nominatipo'];
    var stQuery = "\n   SELECT \n   VS.CODIGO_TIPO\n   ,EM.EMPLEADO_ID\n   ,EM.NOMBRE_USUAL\n   ,VS.NUMERO_SOLICITUD\n   ,VS.ESTADO_SOLICITUD\n   ,VS.DIAS_GOZAR_SOL\n   ,VS.FECHA_INICIO_SOL\n   ,VS.FECHA_FIN_SOL\n            FROM NOMINA_TIPO_USUARIOS NTU\n            INNER JOIN NOMINA_TIPO  NT\n            ON NT.CODIGO_TIPO = NTU.CODIGO_TIPO\n            INNER JOIN VACACION_SOLICITUD VS\n            ON VS.CODIGO_TIPO = NT.CODIGO_TIPO\n            INNER JOIN EMPLEADO EM\n            ON EM.EMPLEADO_ID = VS.EMPLEADO_ID\n            AND VS.ESTADO_SOLICITUD = 'P'\n            WHERE NTU.NOMBRE_CORTO_ID = @NOMBRE_CORTO_ID\n            AND NT.CODIGO_TIPO = @NOMINA_TIPO\n                        ";
    console.log(stQuery);
    SQLSERVER_1.default.ejecutarQuery()
        .input('NOMBRE_CORTO_ID', sql.VarChar, usuario)
        .input('NOMINA_TIPO', sql.VarChar, nominatipo)
        .query(stQuery)
        .then(function (result) {
        var rowsAffected = result.rowsAffected[0];
        var recordset = result.recordset;
        return res.status(200).json({
            ok: false,
            rowsAffected: rowsAffected,
            recordset: recordset
        });
    })
        .catch(function (err) {
        return res.status(400).json({
            ok: false,
            err: err
        });
    });
});
router.get('/NOMINA_TIPO_SOLICITUD_HOEX', function (req, res) {
    var usuario = req.params['usuario'];
    console.log(usuario);
    var stQuery = "\n                        SELECT \n                        NT.CODIGO_TIPO\n                        ,RTRIM(NT.DESCRIPCION) AS DESCRIPCION\n                        ,count(HE.NUMERO_SOLICITUD)\n                        FROM NOMINA_TIPO_USUARIOS NTU\n                        INNER JOIN NOMINA_TIPO  NT\n                        ON NT.CODIGO_TIPO = NTU.CODIGO_TIPO\n                        JOIN EMPLEADO EM\n                        ON EM.CODIGO_TIPO = NT.CODIGO_TIPO\n                        LEFT JOIN NOM_SOLICITUD_HORA_E HE\n                        ON HE.EMPLEADO_ID = EM.EMPLEADO_ID\n                        AND HE.EST_SOLICITUD_HORA_E = 'R'\n                        WHERE NTU.NOMBRE_CORTO_ID = @NOMBRE_CORTO_ID\n                        GROUP BY NT.CODIGO_TIPO, NT.DESCRIPCION\n                         ";
    console.log(stQuery);
    SQLSERVER_1.default.ejecutarQuery()
        .input('NOMBRE_CORTO_ID', sql.VarChar, 'sa')
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
        });
    });
});
router.get('/NOMINA_TIPO_SOLICITUD_HOEX_CARD', function (req, res) {
    var usuario = req.params['usuario'];
    var nominatipo = req.params['nominatipo'];
    console.log(usuario);
    var stQuery = "\n                        SELECT \n                        NT.CODIGO_TIPO\n                        ,RTRIM(NT.DESCRIPCION) AS DESCRIPCION\n                        ,count(HE.NUMERO_SOLICITUD)\n                        FROM NOMINA_TIPO_USUARIOS NTU\n                        INNER JOIN NOMINA_TIPO  NT\n                        ON NT.CODIGO_TIPO = NTU.CODIGO_TIPO\n                        JOIN EMPLEADO EM\n                        ON EM.CODIGO_TIPO = NT.CODIGO_TIPO\n                        LEFT JOIN NOM_SOLICITUD_HORA_E HE\n                        ON HE.EMPLEADO_ID = EM.EMPLEADO_ID\n                        AND HE.EST_SOLICITUD_HORA_E = 'R'\n                        WHERE NTU.NOMBRE_CORTO_ID = @NOMBRE_CORTO_ID\n                        GROUP BY NT.CODIGO_TIPO, NT.DESCRIPCION\n                         ";
    console.log(stQuery);
    SQLSERVER_1.default.ejecutarQuery()
        .input('NOMBRE_CORTO_ID', sql.VarChar, usuario)
        .input('NOMINA_TIPO', sql.VarChar, nominatipo)
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
        });
    });
});
//  router.post('/EJEMPLO',(req: Request, res:Response)=>{
//      SQLSERVER.ejecutarTransInsert('',(reject:Error|undefined,resolve: undefined|sql.IResult<any>)=>{
//          if(reject){
//             return res.status(400).json({
//                 ok:false,
//                 err: reject
//              });
//          }
//          return res.status(200).json({
//             ok:true,
//             resp: resolve
//          });
//      })
//  } )
router.post('/EJEMPLO', function (req, res) {
    var transaction = SQLSERVER_1.default.ejecutarTransacInsert();
    transaction.begin(undefined, function (err) {
        var Mssqlrequest = new sql.Request(transaction);
        Mssqlrequest.input('CODIGO', sql.VarChar, '111')
            .query("INSERT INTO EJEMPLO (CODIGO) VALUES (@CODIGO)", function (err, recorset) {
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
exports.default = router;
