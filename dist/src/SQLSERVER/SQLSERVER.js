"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var sql = __importStar(require("mssql"));
var SQLSERVER = /** @class */ (function () {
    function SQLSERVER() {
        this.conectado = false;
        console.log('Clase SQLSERVER inicializada');
        this.config = {
            // user: 'sa',
            //password: '123',
            //server: 'localhost',
            user: 'elyic',
            password: 'merilfstrike',
            server: 'aplicacion.cocqfacvxj99.us-east-2.rds.amazonaws.com',
            database: 'Aplicacion',
        };
        this.cnn = new sql.ConnectionPool(this.config);
        this.conectardb();
    }
    Object.defineProperty(SQLSERVER, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    /*Iniciar la ejecucion de un query normal */
    SQLSERVER.ejecutarQuery = function () {
        return this.instance.cnn.request();
    };
    /*Iniciar la ejecución de unatransacción */
    SQLSERVER.ejecutarTransacInsert = function () {
        var transaction = new sql.Transaction(this.instance.cnn);
        return transaction;
    };
    /*Conectar a la base de datos */
    SQLSERVER.prototype.conectardb = function () {
        this.cnn.connect(function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Base de datos ONLINE');
        });
    };
    return SQLSERVER;
}());
exports.default = SQLSERVER;
