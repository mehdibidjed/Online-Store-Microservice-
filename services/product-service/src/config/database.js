import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;

console.log("cwd:", process.cwd());

console.log({
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
});


const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD), // IMPORTANT
  database: process.env.DB_NAME,
});

export default pool;
