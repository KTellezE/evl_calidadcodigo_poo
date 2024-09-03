import { Book } from "../models/book";

export class BookService {
  async getAllBooks(): Promise<Book[]> {
    return [
      
    ];
  }

  async getBook(id: Number): Promise<Book | undefined >{
    const books = await this.getAllBooks();
    const book = books.find(b => b.id === id);
    return book;
  }

  
  

}
