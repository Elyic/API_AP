import { Router, Request, Response  } from "express";
import SQLSERVER from '../../SQLSERVER/SQLSERVER';
import *  as  sql from 'mssql'

const router = Router();
router.get('/GUARDAR',(req:Request, res:Response)=>{

    let ocupacion: String  = req.query['ocupacion']
    let descripcion: String = req.query['descripcion']
    let id_muni: number = req.query['id_muni']
    let id_categoria: number = req.query['id_categoria']
    let id_usuario: number = req.query['id_usuario']
    let salario: String = req.query['salario']

    let stQuery:string = `
    Insert into TRABAJO(OCUPACION, DESCRIPCION, ID_MUNI, ID_CATEGORIA, ID_USUARIO, SALARIO) 
    VALUES (@ocupacion, @descripcion, @id_muni, @id_categoria, @id_usuario, @salario)
    `
    SQLSERVER.ejecutarQuery()
             .input('ocupacion',sql.NVarChar,ocupacion)
             .input('descripcion', sql.NVarChar,descripcion)
             .input('id_muni', sql.Int,id_muni)
             .input('id_categoria', sql.Int,id_categoria)
             .input('id_usuario', sql.Int,id_usuario)
             .input('salario', sql.NVarChar,salario)
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

router.get('/MOSTRAR',(req:Request, res:Response)=>{
    
    let stQuery:string = `
    select ID_TRABAJO, OCUPACION,DESCRIPCION,NOMBRE_DEPTO,NOMBRE_CATEGORIA, SALARIO from TRABAJO 
    join MUNICIPIO on MUNICIPIO.ID_MUNI=TRABAJO.ID_MUNI
    join CATEGORIA ON CATEGORIA.ID_CATEGORIA=TRABAJO.ID_CATEGORIA
    JOIN DEPARTAMENTO ON DEPARTAMENTO.ID_DEPTO=MUNICIPIO.ID_DEPTO
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
router.get('/DETALLE',(req:Request, res:Response)=>{
    let id_trabajo: number = req.query['id_trabajo']
    let stQuery:string = `
    Select OCUPACION,DESCRIPCION,NOMBRE_MUNI,NOMBRE_CATEGORIA, NOMBRE,APELLIDO,TELEFONO, NOMBRE_DEPTO, NOMBRE_PAIS, SALARIO
    from TRABAJO 
    join MUNICIPIO on MUNICIPIO.ID_MUNI=TRABAJO.ID_MUNI
    JOIN DEPARTAMENTO ON DEPARTAMENTO.ID_DEPTO=MUNICIPIO.ID_DEPTO
    join CATEGORIA ON CATEGORIA.ID_CATEGORIA=TRABAJO.ID_CATEGORIA
    JOIN PERSONA ON PERSONA.ID_USUARIO=TRABAJO.ID_USUARIO
    JOIN PAIS ON PAIS.ID_PAIS=DEPARTAMENTO.ID_PAIS
    WHERE ID_TRABAJO=@id_trabajo
    `
    SQLSERVER.ejecutarQuery()
             .input('id_trabajo', sql.Int, id_trabajo)
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
router.get('/CATEGORIA',(req:Request, res:Response)=>{
    let id_categoria: number = req.query['id_categoria']
    let stQuery:string = `
    select ID_TRABAJO, OCUPACION,DESCRIPCION,NOMBRE_DEPTO,NOMBRE_CATEGORIA, SALARIO, CATEGORIA.ID_CATEGORIA from TRABAJO 
    join MUNICIPIO on MUNICIPIO.ID_MUNI=TRABAJO.ID_MUNI
    join CATEGORIA ON CATEGORIA.ID_CATEGORIA=TRABAJO.ID_CATEGORIA
    JOIN DEPARTAMENTO ON DEPARTAMENTO.ID_DEPTO=MUNICIPIO.ID_DEPTO
	where CATEGORIA.ID_CATEGORIA=@id_categoria
    `
    SQLSERVER.ejecutarQuery()
             .input('id_categoria', sql.Int, id_categoria)
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