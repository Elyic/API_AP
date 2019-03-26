import { Router, Request, Response  } from "express";
import SQLSERVER from '../../SQLSERVER/SQLSERVER';
import *  as  sql from 'mssql'

const router = Router();

router.get('/NOMINA_TIPO_SOLICITUD_VACACION',(req: Request, res:Response)=>{
    console.log('ejecutando NOMINA_TIPO_SOLICITUD_VACACION')    
    let usuario: string  = req.query['usuario']
    
   let stQuery:string = `
                        SELECT 
                        NT.CODIGO_TIPO
                        ,RTRIM(NT.DESCRIPCION) AS DESCRIPCION
                        ,count(VS.CODIGO_TIPO) AS CANTIDAD
                        FROM NOMINA_TIPO_USUARIOS NTU
                        INNER JOIN NOMINA_TIPO  NT
                        ON NT.CODIGO_TIPO = NTU.CODIGO_TIPO
                        LEFT JOIN VACACION_SOLICITUD VS
                        ON VS.CODIGO_TIPO = NT.CODIGO_TIPO
                        AND VS.ESTADO_SOLICITUD = 'P'
                        WHERE NTU.NOMBRE_CORTO_ID = @NOMBRE_CORTO_ID
                        GROUP BY NT.CODIGO_TIPO, NT.DESCRIPCION
                        `
    console.log(stQuery)
    SQLSERVER.ejecutarQuery()
                            .input('NOMBRE_CORTO_ID',sql.VarChar,usuario)
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
                            .catch(err=>{
                                return res.status(400).json({
                                    ok:true,
                                    err: err                                                    
                                })
                            })                            
} )



router.get('/NOMINA_TIPO_SOLICITUD_VACACION_CARD',(req: Request, res:Response)=>{
    console.log('ejecutando NOMINA_TIPO_SOLICITUD_VACACION_CARD')    
    let usuario: string  = req.query['usuario']
    let nominatipo: string  = req.query['nominatipo']
   let stQuery:string = `
   SELECT 
   VS.CODIGO_TIPO
   ,EM.EMPLEADO_ID
   ,EM.NOMBRE_USUAL
   ,VS.NUMERO_SOLICITUD
   ,VS.ESTADO_SOLICITUD
   ,VS.DIAS_GOZAR_SOL
   ,VS.FECHA_INICIO_SOL
   ,VS.FECHA_FIN_SOL
            FROM NOMINA_TIPO_USUARIOS NTU
            INNER JOIN NOMINA_TIPO  NT
            ON NT.CODIGO_TIPO = NTU.CODIGO_TIPO
            INNER JOIN VACACION_SOLICITUD VS
            ON VS.CODIGO_TIPO = NT.CODIGO_TIPO
            INNER JOIN EMPLEADO EM
            ON EM.EMPLEADO_ID = VS.EMPLEADO_ID
            AND VS.ESTADO_SOLICITUD = 'P'
            WHERE NTU.NOMBRE_CORTO_ID = @NOMBRE_CORTO_ID
            AND NT.CODIGO_TIPO = @NOMINA_TIPO
                        `
    console.log(stQuery)
    SQLSERVER.ejecutarQuery()
            .input('NOMBRE_CORTO_ID',sql.VarChar,usuario)
            .input('NOMINA_TIPO',sql.VarChar,nominatipo)
            .query(stQuery)
            .then((result)=>{                 
                let   [rowsAffected] = result.rowsAffected
                let recordset = result.recordset
                return res.status(200).json({
                    ok:false,
                    rowsAffected,
                    recordset                
                })                            
            })
            .catch(err=>{
                return res.status(400).json({
                    ok:false,
                    err: err                                                    
                })
            })                            
} )


router.get('/NOMINA_TIPO_SOLICITUD_HOEX',(req: Request, res:Response)=>{
    let usuario: string  = req.params['usuario']
    console.log(usuario)
    let stQuery:string = `
                        SELECT 
                        NT.CODIGO_TIPO
                        ,RTRIM(NT.DESCRIPCION) AS DESCRIPCION
                        ,count(HE.NUMERO_SOLICITUD)
                        FROM NOMINA_TIPO_USUARIOS NTU
                        INNER JOIN NOMINA_TIPO  NT
                        ON NT.CODIGO_TIPO = NTU.CODIGO_TIPO
                        JOIN EMPLEADO EM
                        ON EM.CODIGO_TIPO = NT.CODIGO_TIPO
                        LEFT JOIN NOM_SOLICITUD_HORA_E HE
                        ON HE.EMPLEADO_ID = EM.EMPLEADO_ID
                        AND HE.EST_SOLICITUD_HORA_E = 'R'
                        WHERE NTU.NOMBRE_CORTO_ID = @NOMBRE_CORTO_ID
                        GROUP BY NT.CODIGO_TIPO, NT.DESCRIPCION
                         `
     console.log(stQuery)
     SQLSERVER.ejecutarQuery()
                .input('NOMBRE_CORTO_ID',sql.VarChar,'sa')
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
                .catch(err=>{
                return res.status(400).json({
                    ok:true,
                    err: err                                                    
                })
                })
    
 } )


 router.get('/NOMINA_TIPO_SOLICITUD_HOEX_CARD',(req: Request, res:Response)=>{
    let usuario: string  = req.params['usuario']
    let nominatipo: string  = req.params['nominatipo']
    console.log(usuario)
    let stQuery:string = `
                        SELECT 
                        NT.CODIGO_TIPO
                        ,RTRIM(NT.DESCRIPCION) AS DESCRIPCION
                        ,count(HE.NUMERO_SOLICITUD)
                        FROM NOMINA_TIPO_USUARIOS NTU
                        INNER JOIN NOMINA_TIPO  NT
                        ON NT.CODIGO_TIPO = NTU.CODIGO_TIPO
                        JOIN EMPLEADO EM
                        ON EM.CODIGO_TIPO = NT.CODIGO_TIPO
                        LEFT JOIN NOM_SOLICITUD_HORA_E HE
                        ON HE.EMPLEADO_ID = EM.EMPLEADO_ID
                        AND HE.EST_SOLICITUD_HORA_E = 'R'
                        WHERE NTU.NOMBRE_CORTO_ID = @NOMBRE_CORTO_ID
                        GROUP BY NT.CODIGO_TIPO, NT.DESCRIPCION
                         `
     console.log(stQuery)
     SQLSERVER.ejecutarQuery()
                .input('NOMBRE_CORTO_ID',sql.VarChar,usuario)
                .input('NOMINA_TIPO',sql.VarChar,nominatipo)
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
                .catch(err=>{
                return res.status(400).json({
                    ok:true,
                    err: err                                                    
                })
                })
    
 } )



//  router.post('/EJEMPLO',(req: Request, res:Response)=>{
    
//      SQLSERVER.ejecutarTransInsert('',(reject:Error|undefined,resolve: undefined|sql.IResult<any>)=>{
//          if(reject){
//             return res.status(400).json({
//                 ok:false,
//                 err: reject
//              });
//          }

//          return res.status(200).json({
//             ok:true,
//             resp: resolve
//          });
//      })
//  } )



router.post('/EJEMPLO',(req: Request, res:Response)=>{
    
    let  transaction=  SQLSERVER.ejecutarTransacInsert()
    
     transaction.begin(undefined ,(err)=>{
            let Mssqlrequest =  new sql.Request(transaction);
            
            Mssqlrequest.input('CODIGO',sql.VarChar,'111')
                        .query(`INSERT INTO EJEMPLO (CODIGO) VALUES (@CODIGO)`,(err:Error|undefined, recorset: undefined|sql.IResult<any>)=>{
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



export default router