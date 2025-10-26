import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({path: "./.env", quiet: true})

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
    }
)

const connectDatabase = async() => {
    try{
        await sequelize.authenticate();
        console.log("Database connected")
    } catch (error) {
        console.log(`Error connect to database: ${error.message}`)
        throw error
    }
}

export default {connectDatabase, sequelize}