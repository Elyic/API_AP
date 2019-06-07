"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server/server");
var SQLSERVER_1 = __importDefault(require("./SQLSERVER/SQLSERVER"));
var environment_1 = require("../global/environment");
var cors_1 = __importDefault(require("cors"));
console.log('iniciando');
var server = server_1.Server.instance;
SQLSERVER_1.default.instance;
server.app.use(cors_1.default({ origin: true, credentials: true }));
require('./routes/router');
server.start(function () {
    console.log("Servidor en el puerto " + environment_1.SERVER_PORT);
});
