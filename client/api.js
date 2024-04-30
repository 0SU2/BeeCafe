const API = "http://10.0.2.2:8080/registro"

console.log('ENTRA API');
export const getEst = async () => {
    
    try{
        console.log('entra getEst')
        const res = await fetch(API,{
            method: "GET",
            //credentials: true
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
            headers: {"Accept":"application/json","Content-Type":"application/json"},
            body: JSON.stringify(newEst) //convierte el objeto a string 
        });
        
        console.log(res,'Respuesta fetch postEst');
        return await res.json();
    }catch(err){
        console.log(err,'Error posEst');
    }
} 





