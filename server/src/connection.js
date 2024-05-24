
import dotenv from 'dotenv'; //Usar variables de entorno
dotenv.config(); // inicializa

console.log(process.env.MYSQL_DATABASE);
export const conn = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    
};
