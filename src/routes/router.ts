
// export default router
import { Server} from "../server/server";
import * as pais from './PAIS/PAIS';
import { routerPERSONA} from './PERSONA/PERSONA';
import { routerDEPARTAMENTO} from './DEPARTAMENTO/DEPARTAMENTO';
import { routerMUNICIPIO }  from './MUNICIPIO/MUNICIPIO';
import { routerTRABAJO} from './TRABAJO/TRABAJO';

import router from './CATEGORIA/CATEGORIA';
const server = Server.instance
//const express = require('express');

server.app.use('/PAIS',pais.default);
server.app.use('/PERSONA',routerPERSONA);
//server.app.use('/',categoria.default);
server.app.use('/DEPARTAMENTO',routerDEPARTAMENTO);
server.app.use('/MUNICIPIO',routerMUNICIPIO);
server.app.use('/TRABAJO',routerTRABAJO);
server.app.use('/',router);
