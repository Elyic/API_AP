
// export default router
import  express  from 'express';
import router from './NOMINA_TIPO_USUARIOS/NOMINA_TIPO_SOLICITUD';
import * as pais from './PAIS/PAIS';
import * as persona from './PERSONA/PERSONA';
const app = express();
//const express = require('express');

app.use('/',router)
app.use('/',pais.default)
app.use('/',persona.default)


export default  app;