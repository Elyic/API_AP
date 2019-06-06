
// export default router
import  express  from 'express';

import * as pais from './PAIS/PAIS';
import { routerPERSONA} from './PERSONA/PERSONA';
import { routerDEPARTAMENTO} from './DEPARTAMENTO/DEPARTAMENTO';
import { routerMUNICIPIO }  from './MUNICIPIO/MUNICIPIO';
import { routerTRABAJO} from './TRABAJO/TRABAJO';

import router from './CATEGORIA/CATEGORIA';
const app = express();
//const express = require('express');

app.use('/',pais.default);
app.use('/',routerPERSONA);
//app.use('/',categoria.default);
app.use('/',routerDEPARTAMENTO);
app.use('/',routerMUNICIPIO);
app.use('/',routerTRABAJO);
app.use('/',router);

export default  app;