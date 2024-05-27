import axios from 'axios';
import { IPV4_OWN, PORT_SERVER } from '@env';

const API = "http://10.0.2.2:3000/estudiantes";

console.log('ENTRA API');
console.log(IPV4_OWN);

export const getEst = async () => {
    console.log("entra getEst")    
    try{
        console.log('entra try')
        const res = await fetch(API,{
            method: "GET",
        });
        console.log(res,'Respuesta FETCH')
        return await res.json();
    }catch(err){
        console.log(err,'Error en getEst')
    }
}


//recibe el objeto con datos del registro 
export const postEst = async (newEst) =>{
  console.log('ENTRA POSTEST');
  try{
      console.log('ENTRA TRY');
      const res = await fetch(API,{
          method:"POST", 
          headers: { "Accept":"application/json", "Content-Type":"application/json" },
          body: JSON.stringify(newEst), //convierte el objeto a string 
      });
      console.log(res,'Respuesta fetch postEst');
      return await res.json();
  }catch(err){
      console.log(err,'Error posEst');
  }
} 

export const registroWithAxios = async(newEst) => {
  // primero checamos si el correo es valido de la ugto con regex
  const regex = new RegExp('[2a-z]+[.]+.+@ugto+\.[a-z]{2,3}');
  //const regex = new RegExp('^[a-z0-9._%+-]+@ugto\\.mx$');

  // si el correo no es valido regresamos
  if(regex.test(newEst.correo)) {
    let tu = IPV4_OWN;
    let ne = IPV4_OWN; // agrege esta variable a la url, si ocurre algun error, cambiala por la variable tu
    console.log("ENTRA POSTEST WITH AXIOS");
                                  // ipv4 from wifi connected and current port from the server
    const res = await axios.post(`http://${ne}:${PORT_SERVER}/registro`,{newEst});
    console.log("siguiente de res")
    if(!res.data.succes) {
      console.log("entra if")
      let newMessage;
      // agregar nuevos errores de mysql que vayan existiendo para mandar un mensaje
      // mas claro al usuario
      console.log(res.data.msg)
      const exp = res.data.msg.match(/for key '(.+?)'/); // crea una arreglo donde [0] es el forkey .... y [1] es el valor duplicado 
                                                          //  ["for key 'estudiantes.uni_nombre_apePat_apeMat'", "estudiantes.uni_nombre_apePat_apeMat"]
      console.log(exp);
      switch (exp[1]) {
        
        case "estudiantes.uni_correo":
          console.log("entra correo")
          newMessage = "Correo ya existente";
          break;
        case "estudiantes.uni_nombre_apePat_apeMat":
          newMessage = "Nombre de estudiante ya existente";
          console.log("entra nombre")
          break;
      }
      console.log(newMessage,"messageaaa")
      res.data.msg = newMessage;

    }
    console.log(res.data.msg)
    return res.data
  }

  const mensage = "Correo Invalido"

  return {"success" : false, "msg": mensage}
  
}