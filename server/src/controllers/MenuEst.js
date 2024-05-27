import { connDB } from "../database.js"

export const getAllMenuComida = async(req, res) => {
  const conn = await connDB();
  const [rows] = await conn.execute("SELECT * FROM menu WHERE men_tipo = 'Comida'");
  res.json(rows);
}

export const getAllMenuPlatillos = async(req, res) => {
  const con = await connDB();
  const [rows] = await con.execute("SELECT * FROM menu WHERE men_tipo = 'Preparado' ");
  res.json(rows)
}

export const getAllMenyBebidas = async(req, res) => {
  const con = await connDB();
  const [rows] = await con.execute("SELECT * FROM menu WHERE men_tipo = 'Bebida' ");
  res.json(rows)
}