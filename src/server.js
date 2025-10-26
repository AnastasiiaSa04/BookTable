import express from "express"
import db from "./db/sequelize.js"
import errorHandler from "./middlewares/errorHandler.js"
import bookRouter from "./roures/book.router.js"

const startServer = async () => {
    const app = express()
    app.use(express.json())
    await db.connectDatabase()

    app.use("/books", bookRouter)

    app.use(errorHandler)

await db.sequelize.sync({alter: true})
console.log("The tables are synchronized with the database")

const port = Number (process.env.PORT) ||3000;
app.listen(port, () => console.log(`Server running on ${port} port`))
}

export default startServer;