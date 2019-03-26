import { Router, Request, Response  } from "express";
import SQLSERVER from '../../SQLSERVER/SQLSERVER';
import *  as  sql from 'mssql'

const router = Router();

router.get('/VENDEDORES',(req:Request, res:Response)=>{

    let id_vendedor: number  = req.query['id_vendedor']
    
    
    let stQuery:string = `
    SELECT	nombre_vendedor, direccion FROM VENDEDOR
    where id_vendedor = @id_vendedor
    `
    SQLSERVER.ejecutarQuery()
             .input('id_vendedor',sql.Int,id_vendedor)
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