const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");

const DB_NAME = "gestion_contacts";
const DB_USER = "root"; // Replace with your MySQL username
const DB_PASSWORD = ""; // Replace with your MySQL password
const DB_HOST = "localhost";

// Function to create the database if it doesn't exist
const initDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(`Base de données '${DB_NAME}' vérifiée ou créée avec succès.`);
    await connection.end();
  } catch (error) {
    console.error("Erreur lors de la création de la base de données :", error.message);
    process.exit(1);
  }
};

// Initialize Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

module.exports = { sequelize, initDatabase };
