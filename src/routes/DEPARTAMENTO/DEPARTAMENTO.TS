import { Router, Request, Response  } from "express";
import SQLSERVER from '../../SQLSERVER/SQLSERVER';
import *  as  sql from 'mssql'

const router = Router();
router.get('/DEPTO',(req:Request, res:Response)=>{
     let id_pais: number = req.query['id_pais']
    let stQuery:string = `
    select ID_DEPTO, NOMBRE_DEPTO from DEPARTAMENTO WHERE ID_PAIS=@id_pais
    `
    SQLSERVER.ejecutarQuery()
            .input('id_pais',sql.Int,id_pais)
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