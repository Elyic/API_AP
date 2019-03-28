
// export default router
import  express  from 'express';
import router from './NOMINA_TIPO_USUARIOS/NOMINA_TIPO_SOLICITUD';
import * as pais from './PAIS/PAIS';

const app = express();
//const express = require('express');

app.use('/',router)
app.use('/',pais.default)



export default  app;