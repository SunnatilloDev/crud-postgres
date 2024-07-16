import { configDotenv } from "dotenv";
import { Pool } from "pg";
configDotenv();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

pool.connect().then(() => {
    console.log("Connected to db successfully");
});
export default pool;