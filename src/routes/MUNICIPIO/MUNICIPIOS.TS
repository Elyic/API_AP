import { Router, Request, Response  } from "express";
import SQLSERVER from '../../SQLSERVER/SQLSERVER';
import *  as  sql from 'mssql'
import express from 'express';

const router = Router();
//const router = express.Router();
router.get('/MUNI',(req:Request, res:Response)=>{
     let id_depto: number = req.query['id_depto']
    let stQuery:string = `
    select ID_MUNI, NOMBRE_MUNI from MUNICIPIO WHERE ID_DEPTO=@id_depto
    `
    SQLSERVER.ejecutarQuery()
            .input('id_depto',sql.Int,id_depto)
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