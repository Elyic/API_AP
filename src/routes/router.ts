
// export default router
import  express  from 'express';
import router from './NOMINA_TIPO_USUARIOS/NOMINA_TIPO_SOLICITUD';
import * as pais from './PAIS/PAIS';
import * as persona from './PERSONA/PERSONA';
import * as categoria from './CATEGORIA/CATEGORIA';
import * as departamento from './DEPARTAMENTO/DEPARTAMENTO';
import * as municipio from './MUNICIPIO/MUNICIPIO';
import * as trabajo from './TRABAJO/TRABAJO';
const app = express();
//const express = require('express');

app.use('/',pais.default);
app.use('/',persona.default);
app.use('/',categoria.default);
app.use('/',departamento.default);
app.use('/',municipio.default);
app.use('/',trabajo.default);
app.use('/',router);

export default  app;