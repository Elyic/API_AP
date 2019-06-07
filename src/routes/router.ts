
// export default router
import { Server} from "../server/server";
import * as pais from '../routes/PAIS/PAIS';
import { routerPERSONA} from '../routes/PERSONA/PERSONA';
import { routerDEPARTAMENTO} from '../routes/DEPARTAMENTO/DEPARTAMENTO';
import { routerMUNICIPIO }  from '../routes/MUNICIPIO/MUNICIPIO';
import { routerTRABAJO} from '../routes/TRABAJO/TRABAJO';

import router from './CATEGORIA/CATEGORIA';
const server = Server.instance
//const express = require('express');

server.app.use('/PAIS',pais.default);
server.app.use('/PERSONA',routerPERSONA);
//server.app.use('/',categoria.default);
server.app.use('/DEPARTAMENTO',routerDEPARTAMENTO);
server.app.use('/MUNICIPIO',routerMUNICIPIO);
server.app.use('/TRABAJO',routerTRABAJO);
// server.app.use('/',router);
