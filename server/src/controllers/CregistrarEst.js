import {connDB} from "../database.js";


export const getEstudiantes = async (req,res) =>{
    const conn =await connDB(); 
    const [rows] = await conn.execute('SELECT * FROM estudiantes');
    console.log(rows);
    res.json(rows);
};


export const registrarEstudiante = async (req,res) =>{
    //res.send("REGISTROOO");
    try{
        console.log(req);
         const conn =await connDB(); 
         const body = req.body;
         const [result,] = await conn.execute(
             "INSERT INTO estudiantes (est_nombre,est_apePat,est_apeMat,est_correo,est_contrasena)  VALUES(?,?,?,?,?)", 
             [body.nombre,body.apePaterno,body.apeMaterno,body.correo,body.contrasena]
      
         );
         //res.json(result, "thissss");
         const newEst = {
             est_id: result.insertId,
             ...req.body,
         };
         res.json(newEst,"thissss");
         console.log(result,'RegEstudiante');
        
    }catch(err){
        console.error(err);
    }
}; 

export const getText = (req,res) =>{
    res.send("msj");
};