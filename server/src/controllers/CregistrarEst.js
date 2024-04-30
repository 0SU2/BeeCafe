import {connDB} from "../database.js";


export const getEstudiantes = async (req,res) =>{
    const conn =await connDB(); 
    const [rows] = await conn.execute('SELECT * FROM estudiantes');
    console.log(rows);
    res.json(rows);
};

export const registrarEstudiante = async (req,res) =>{
    try{
        const conn =await connDB(); 
        const body = req.body;
        const [result] = await conn.execute(
            "INSERT INTO estudiantes(est_nombre,est_apePat,est_apeMat,est_correo,est_contrasena)  VALUES(?,?,?,?,?)", 
            [body.est_nombre,body.est_apePat,body.est_apeMat,body.est_correo,body.est_contrasena]
            
        );

        //res.json(result);
        const newEst = {
            est_id: result.insertId,
            ...req.body,
        };
        res.json(newEst);
        console.log(result,'RegEstudiante');
    }catch(err){
        console.error(err);
    }
}; 

export const getText = (req,res) =>{
    res.send("msj");
};