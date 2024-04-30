import mysql from 'mysql2/promise';
import {conn} from './connection.js';

export const connDB = async () =>{
    return await mysql.createConnection(conn);
};
