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
exports.routerMUNICIPIO = router;
router.get('/MUNI', function (req, res) {
    var id_depto = req.query['id_depto'];
    var stQuery = "\n    select ID_MUNI, NOMBRE_MUNI from MUNICIPIO WHERE ID_DEPTO=@id_depto\n    ";
    SQLSERVER_1.default.ejecutarQuery()
        .input('id_depto', sql.Int, id_depto)
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
