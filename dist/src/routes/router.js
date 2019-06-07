"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// export default router
var server_1 = require("../server/server");
var pais = __importStar(require("../routes/PAIS/PAIS"));
var PERSONA_1 = require("../routes/PERSONA/PERSONA");
var DEPARTAMENTO_1 = require("../routes/DEPARTAMENTO/DEPARTAMENTO");
var MUNICIPIO_1 = require("../routes/MUNICIPIO/MUNICIPIO");
var TRABAJO_1 = require("../routes/TRABAJO/TRABAJO");
var server = server_1.Server.instance;
//const express = require('express');
server.app.use('/PAIS', pais.default);
server.app.use('/PERSONA', PERSONA_1.routerPERSONA);
//server.app.use('/',categoria.default);
server.app.use('/DEPARTAMENTO', DEPARTAMENTO_1.routerDEPARTAMENTO);
server.app.use('/MUNICIPIO', MUNICIPIO_1.routerMUNICIPIO);
server.app.use('/TRABAJO', TRABAJO_1.routerTRABAJO);
// server.app.use('/',router);
