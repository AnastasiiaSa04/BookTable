import { Router } from "express";
import Book from "../db/models/book.js";
import HttpError from "../utils/HttpError.js";

const bookRouter = Router();

bookRouter.get("/", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

bookRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByPk(id);
  if (!book) {
    throw new HttpError(404, "Book not found");
  }

  res.json(book);
});

bookRouter.post("/", async (req, res) => {
  const { title, author, year } = req.body;

  if (!title || !author || !year) {
    throw new HttpError(400, "Missing required fields");
  }

  const newBook = await Book.create({ title, author, year });

  res.status(201).json(newBook);
});

bookRouter.put("/:id", async (req, res) => {
  const { id } = req.params;

  const book = await Book.findByPk(id);

  if (!book) {
    throw new HttpError(404, "Book not found");
  }

  const allowedFields = ["title", "author", "year"];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      book[field] = req.body[field];
    }
  });

  await book.save();

  res.json(book);
});

bookRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const book = await Book.findByPk(id);

  if (!book) {
    throw new HttpError(404, "Book not found");
  }

  await book.destroy();

  res.status(204).send();
});

export default bookRouter;
