import  express  from "express";
import path from "path";
import { SERVER_PORT } from "../../global/environment";

export default class Server{

        /*Definición de las variables */
        public app: express.Application;
        public port: number;
        private static _instance: Server

        /*Constructor del programa */
        private constructor(puerto:number){
            this.port = puerto;
            this.app  = express();
        }

        public static get instance(){
            return this._instance || (this._instance = new this(SERVER_PORT)) 
    }

        start(callback:Function){
            this.app.listen(this.port,callback);
            this.publicFolder();
        }

        private publicFolder(){
            const publicPath = path.resolve(__dirname,"../public");
            this.app.use(express.static(publicPath));
        }
}
