import { Router, Request, Response  } from "express";
import SQLSERVER from '../../SQLSERVER/SQLSERVER';
import *  as  sql from 'mssql'

const router = Router();



router.post('/INSERTAR',(req: Request, res:Response)=>{
    
    let  transaction=  SQLSERVER.ejecutarTransacInsert()
    
     transaction.begin(undefined ,(err)=>{
            let Mssqlrequest =  new sql.Request(transaction);
            
            Mssqlrequest.input('CODIGO',sql.VarChar,'111')
            Mssqlrequest.input('NOMBRE',sql.NVarChar,'Harold')
                        .query(`INSERT INTO EJEMPLO (CODIGO) VALUES (@CODIGO)
                        Insert into PERSONA(NOMBRE,APELLIDO,ESTADO_CIVIL,GENERO,DIRECCION,TELEFONO,EMAIL,CONTRASEÑA,FECHA_NAC) 
                        VALUES (@NOMBRE)
                        `,(err:Error|undefined, recorset: undefined|sql.IResult<any>)=>{
                    if(err){                       
                        transaction.rollback();   
                        return res.status(400).json({
                            ok:false,
                            err: err                                                    
                        })                     

                    }
                console.log(recorset)
                transaction.commit((errCommit:Error|undefined)=>{
                    if(errCommit){
                        transaction.rollback();
                         return res.status(400).json({
                            ok:false,
                            err: errCommit                                                    
                        })
                    }                   
                  
                  return res.status(200).json({
                    ok:true,
                    recorset                
                }) 
                } );
            })

        })
} )

router.get('/REGISTRO',(req:Request, res:Response)=>{

    let nombre: String  = req.query['nombre']
    let apellido: String = req.query['apellido']
    let estado: String = req.query['estado']
    let genero: String = req.query['genero']
    let direccion: String = req.query['direccion']
    let telefono: number = req.query['telefono']
    let email: String = req.query['email']
    let pass: String = req.query['pass']
    let fecha: String = req.query['fecha']
    
    
    let stQuery:string = `
    Insert into PERSONA(NOMBRE,APELLIDO,ESTADO_CIVIL,GENERO,DIRECCION,TELEFONO,EMAIL,CONTRASEÑA,FECHA_NAC) 
    VALUES (@nombre, @apellido, @estado, @genero, @direccion, @telefono, @email, @pass, @fecha)
    `
    SQLSERVER.ejecutarQuery()
             .input('nombre',sql.NVarChar,nombre)
             .input('apellido', sql.NVarChar,apellido)
             .input('estado', sql.NVarChar,estado)
             .input('genero', sql.NVarChar,genero)
             .input('direccion', sql.NVarChar,direccion)
             .input('telefono', sql.Int,telefono)
             .input('email', sql.NVarChar,email)
             .input('pass', sql.NVarChar,pass)
             .input('fecha', sql.NVarChar,fecha)
             .query(stQuery)
             .then((result)=>{
                let   [rowsAffected] = result.rowsAffected
                let recordset = result.recordset

                return res.status(200).json({
                    ok:true,
                    rowsAffected,
                    recordset                
                })
            
             })
             .catch((err)=>{
                return res.status(400).json({
                    ok:true,
                    err: err                                                    
                })//json
             })



} )
router.get('/LOGIN',(req:Request, res:Response)=>{

    let email: String = req.query['email']
    let pass: String = req.query['pass']
    
    
    let stQuery:string = `
    select count(1) as "Validacion" from persona where EMAIL=@email and CONTRASEÑA=@pass
    `
    SQLSERVER.ejecutarQuery()
             .input('email', sql.NVarChar,email)
             .input('pass', sql.NVarChar,pass)
             .query(stQuery)
             .then((result)=>{
                let   [rowsAffected] = result.rowsAffected
                let recordset = result.recordset

                return res.status(200).json({
                    ok:true,
                    rowsAffected,
                    recordset                
                })
            
             })
             .catch((err)=>{
                return res.status(400).json({
                    ok:true,
                    err: err                                                    
                })//json
             })



} )
router.get('/VALIDAR',(req:Request, res:Response)=>{

    let email: String = req.query['email']
    
    
    let stQuery:string = `
    select  count(1) as "Validacion" from persona where EMAIL=@email
    `
    SQLSERVER.ejecutarQuery()
             .input('email', sql.NVarChar,email)
             .query(stQuery)
             .then((result)=>{
                let   [rowsAffected] = result.rowsAffected
                let recordset = result.recordset

                return res.status(200).json({
                    ok:true,
                    rowsAffected,
                    recordset                
                })
            
             })
             .catch((err)=>{
                return res.status(400).json({
                    ok:true,
                    err: err                                                    
                })//json
             })



} )
router.get('/ID',(req:Request, res:Response)=>{

    let email: String = req.query['email']
    
    
    let stQuery:string = `
    select  ID_USUARIO from persona where EMAIL=@email
    `
    SQLSERVER.ejecutarQuery()
             .input('email', sql.NVarChar,email)
             .query(stQuery)
             .then((result)=>{
                let   [rowsAffected] = result.rowsAffected
                let recordset = result.recordset

                return res.status(200).json({
                    ok:true,
                    rowsAffected,
                    recordset                
                })
            
             })
             .catch((err)=>{
                return res.status(400).json({
                    ok:true,
                    err: err                                                    
                })//json
             })



} )

export default router