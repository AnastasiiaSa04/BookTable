import { DataTypes } from "sequelize";
import db from "../sequelize.js"

const Book = db.sequelize.define("Book", {
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    author: {
        type:DataTypes.STRING(100),
        allowNull:false,
    },
    year: {
        type:DataTypes.INTEGER,
        allowNull:false
    },
},{
    tableName: "books",
    timestamps:false
}
)

export default Book;