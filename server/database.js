import mysql from 'mysql2';
import dotenv from 'dotenv'; //Usar variables de entorno
dotenv.config(); // inicializa

const pool = mysql

.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})
.promise();

export async function getEstudianteById(est_id){
    const [row] = await pool.query(
        `SELECT * FROM estudiantes WHERE est_id = ?`,
        [est_id]
    )
    //console.log(row);
    return row[0];
}

getEstudianteById(1);