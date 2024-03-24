import mysql from "mysql2/promise";

let connection = null;

export const dbConnection = () => {
  if (connection) return connection;
  connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  return connection;
};
