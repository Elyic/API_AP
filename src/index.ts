import Server from "./server/server";
import SQLSERVER from './SQLSERVER/SQLSERVER';
import router from './routes/router';
import { SERVER_PORT } from '../global/environment';
import cors  from "cors";
console.log('iniciando')
const server = Server.instance
 SQLSERVER.instance;
 server.app.use(cors({origin: true,credentials: true}))
 server.app.use('/',router);

server.start(()=>{
    console.log(`Servidor en el puerto ${SERVER_PORT}`)
})
