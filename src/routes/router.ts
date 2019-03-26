
// export default router
import  express  from 'express';
import router from './NOMINA_TIPO_USUARIOS/NOMINA_TIPO_SOLICITUD';
import * as vendedor from './VENDEDOR/VENDEDOR';

const app = express();
//const express = require('express');

app.use('/',router)
app.use('/',vendedor.default)



export default  app;