import { Router } from "express";
import Book from "../db/models/book.js";

const bookRouter = Router();

bookRouter.get("/", async (req, res, next) => {
    try {
        const books = await Book.findAll()
        res.json(books)
    } catch (error) {
        next (error)
    }
})

bookRouter.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(book);
    } catch (error) {
        next(error);
    }
});

bookRouter.post("/", async (req, res, next) => {
    try {
        const {title, author, year} =req.body;
        if (!title || !author || !year) {
            error.statusCode(400);
            throw error
        }
        const newBook = await Book.create({title, author, year})
        res.status(201).json(newBook)
    } catch (error) {
        next (error)
    }
})

bookRouter.put("/:id", async (req, res, next) => {
    try {
    const {id} = req.params
    const {title, author, year} = req.body

    const book = await Book.findByPk(id);
    if (!book) {
        return res.status(404).json({message: "Book not found"})
    }
    if (title !== undefined) book.title = title
    if (author !== undefined) book.author = author
    if (year !== undefined) book.year = year

    await book.save()
        res.json(book)
} catch (error) {
    next (error)
}
})

bookRouter.delete("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;

        const book = await Book.findByPk(id);
        if(!book) {
            return res.status(404).json({message: "Book not found"})
        }

        await book.destroy()
            res.status(204).send();
    } catch (error) {
        next (error)
    }
})




export default bookRouter;