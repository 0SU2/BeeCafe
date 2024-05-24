import axios from 'axios';
import { IPV4_OWN, PORT_SERVER } from '@env';

const API = "http://10.0.2.2:3000/estudiantes";

console.log('ENTRA API');

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
  
  // si el correo no es valido regresamos
  if(regex.test(newEst.correo)) {
    console.log("ENTRA POSTEST WITH AXIOS");
                                  // ipv4 from wifi connected and current port from the server
    const res = await axios.post(`http://${IPV4_OWN}:${PORT_SERVER}/registro`,{newEst});
    
    if(!res.data.succes) {
      let newMessage;
      // agregar nuevos errores de mysql que vayan existiendo para mandar un mensaje
      // mas claro al usuario
      switch (res.data.msg) {
        case "Duplicate entry 'or@ugto.mx' for key 'estudiantes.uni_correo'":
          newMessage = "Correo ya existente";
          break;
        case "Duplicate entry 'Oscar-Rosas-Zavala ' for key 'estudiantes.uni_nombre_apePat_apeMat'":
          newMessage = "Nombre de estudiante ya existente";
          break;
      }
      res.data.msg = newMessage;
    }

    return res.data
  }

  const mensage = "Correo Invalido"

  return {"success" : false, "msg": mensage}
  
}