import *  as  sql from 'mssql'



export default class SQLSERVER{

    private static _instance:SQLSERVER;
    cnn: sql.ConnectionPool;    
    config: sql.config   
    conectado:boolean = false;    
    
    private constructor(){
        
        console.log('Clase SQLSERVER inicializada')
        this.config= {
            user: 'sa',
            password: '123',
            server: 'localhost',
            database: 'da2'
          
        }      
        this.cnn = new sql.ConnectionPool(this.config);
        this.conectardb();
        
    }

    public static get instance(){
        return this._instance || (this._instance = new this())
    }

    /*Iniciar la ejecucion de un query normal */
       public static ejecutarQuery(): sql.Request {        
            return this.instance.cnn.request()                                       
       }

        /*Iniciar la ejecución de unatransacción */


    public static ejecutarTransacInsert() : sql.Transaction {

        let  transaction = new sql.Transaction(this.instance.cnn)     
        
        return transaction;
        
       }

     /*Conectar a la base de datos */
    private conectardb(){
        this.cnn.connect((err:any):void =>{
            if(err) {
                console.log(err)
                return
            }
            console.log('Base de datos ONLINE');            
        });

    }

     
}

