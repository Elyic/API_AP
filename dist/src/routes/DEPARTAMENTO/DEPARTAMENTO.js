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
exports.routerDEPARTAMENTO = router;
router.get('/DEPTO', function (req, res) {
    var id_pais = req.query['id_pais'];
    var stQuery = "\n    select ID_DEPTO, NOMBRE_DEPTO from DEPARTAMENTO WHERE ID_PAIS=@id_pais\n    ";
    SQLSERVER_1.default.ejecutarQuery()
        .input('id_pais', sql.Int, id_pais)
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
