import { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { Book } from "../models/book";

export class BookController {
  private bookService: BookService;
  constructor() {
    this.bookService = new BookService();
  }
  getAll = async (req: Request, res: Response) => {
    try {
      const books = await this.bookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: "Error fetching books" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const bookId = req.params.id
      const book = await this.bookService.getBook(Number(bookId));

      if(book){
      res.status(200).json(book);
      } else {
        res.status(404).json({message: 'Book not found'})
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching books" });
    }
  };

  addBook= async (req: Request, res: Response) => {
    try {
      const newBook =req.body
      const createdBook = await this.bookService.PostBook(newBook);      
      res.status(200).json(createdBook);       
    } catch (error) {
      res.status(500).json({ error: "Error fetching books" });
    }
  };

  deleteBook= async (req: Request, res: Response) => {
    try {
      const idbook = req.params.id
      const createdBook = await this.bookService.deleteBook(Number(idbook));      
      res.status(200).json(createdBook);       
    } catch (error) {
      res.status(500).json({ error: "Error fetching books" });
    }
  };

  

  
}
