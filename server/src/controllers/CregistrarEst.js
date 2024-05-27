import {connDB} from "../database.js";


export const getEstudiantes = async (req,res) =>{
    console.log(req);
};


export const registrarEstudiante = async (req,res) =>{
    //res.send("REGISTROOO");
    try{
        const conn =await connDB(); 
        const body = req.body.newEst;
        const [result] = await conn.execute(
            "INSERT INTO estudiantes (est_nombre,est_apePat,est_apeMat,est_correo,est_contrasena)  VALUES(?,?,?,?,?)", 
            [body.nombre,body.apePaterno,body.apeMaterno,body.correo,body.contrasena]
            
        );
        //res.json(result, "thissss");
        const newEst = {
            est_id: result.insertId,
            ...req.body,
        };
        res.json({"success": true, "msg": newEst })
        console.log(newEst);
    }catch(err){
        console.error(err);
        res.json({"success" : false , "msg": err.sqlMessage })
    }
}; 

//export const existeEstudiante = async
export const getText = (req,res) =>{
    res.send("msj");
};

