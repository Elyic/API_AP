import { Router, Request, Response  } from "express";
import SQLSERVER from '../../SQLSERVER/SQLSERVER';
import *  as  sql from 'mssql'

const router = Router();
router.get('/PAIS',(req:Request, res:Response)=>{
     
    let stQuery:string = `
    select ID_PAIS, NOMBRE_PAIS from pais
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
             .catch((err)=>{
                return res.status(400).json({
                    ok:true,
                    err: err                                                    
                })//json
             })
} )

export default router