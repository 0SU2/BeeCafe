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
    let tu = process.env.EXPO_PUBLIC_IPV4_OWN;
    let cn = IPV4_OWN;
    console.log(tu);
    console.log(cn);
    console.log("ENTRA POSTEST WITH AXIOS");
    console.log(process.env.EXPO_PUBLIC_IPV4_OWN)
                                  // ipv4 from wifi connected and current port from the server
    const res = await axios.post(`http://${process.env.EXPO_PUBLIC_IPV4_OWN}:${process.env.EXPO_PUBLIC_PORT_SERVER}/estudiante/registro`,{newEst});
    console.log("siguiente de res")
    if(!res.data.success) {
      console.log("entra if")
      let newMessage;
      // agregar nuevos errores de mysql que vayan existiendo para mandar un mensaje
      // mas claro al usuario
      switch (res.data.msg) {
        case "for key 'estudiantes.uni_correo'":
          newMessage = "Correo ya existente";
          break;
        case "for key 'estudiantes.uni_nombre_apePat_apeMat'":
          newMessage = "Nombre de estudiante ya existente";
          break;
      }
      res.data.msg = newMessage;
    }
    return {...res.data}
  }

  const mensage = "Correo Invalido"

  return {"success" : false, "msg": mensage}
  
}

export const sesionWithAxios = async(newEst) => {
  // primero checamos si el correo es valido de la ugto con regex
  const regex = new RegExp('[2a-z]+[.]+.+@ugto+\.[a-z]{2,3}');
  //const regex = new RegExp('^[a-z0-9._%+-]+@ugto\\.mx$');

  // si el correo no es valido regresamos
  if(regex.test(newEst.correo)) {

                                  // ipv4 from wifi connected and current port from the server
    const res = await axios.get(`http://${process.env.EXPO_PUBLIC_IPV4_OWN}:${process.env.EXPO_PUBLIC_PORT_SERVER}/inicioSession`, {params: newEst});
    console.log("siguiente de res")

    return {"msg": res.data.msg, "success": res.data.success}
  }
  
}