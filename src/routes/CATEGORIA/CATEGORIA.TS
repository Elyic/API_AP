import { Router, Request, Response  } from "express";
import SQLSERVER from '../../SQLSERVER/SQLSERVER';
import *  as  sql from 'mssql'

const router = Router();


router.get('/CONSULTA',(req:Request, res:Response)=>{ 

    let stQuery:string = `
                        SELECT ID_CATEGORIA, NOMBRE_CATEGORIA FROM CATEGORIA
                        `
                        SQLSERVER.ejecutarQuery()
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
})

export default router