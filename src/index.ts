import {Server} from "./server/server";
import SQLSERVER from './SQLSERVER/SQLSERVER';
import { SERVER_PORT } from '../global/environment';
import cors  from "cors";
console.log('iniciando')
const server = Server.instance
 SQLSERVER.instance;
 server.app.use(cors({origin: true,credentials: true}))
 require('./routes/router');
server.start(()=>{
    console.log(`Servidor en el puerto ${SERVER_PORT}`)
})
