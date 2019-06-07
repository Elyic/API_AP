"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var SQLSERVER_1 = __importDefault(require("../../SQLSERVER/SQLSERVER"));
var router = express_1.Router();
router.get('/CONSULTA', function (req, res) {
    var stQuery = "\n                        SELECT ID_CATEGORIA, NOMBRE_CATEGORIA FROM CATEGORIA\n                        ";
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
        });
    });
});
exports.default = router;
