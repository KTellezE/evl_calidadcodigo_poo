import { Book } from "../models/book";

export class BookService {
  async getAllBooks(): Promise<Book[]> {
    return [
      
    ];
  }

  async getBookById(): Promise<Book>{

    return new Book(1,"demo","demo","demo","demo");
  }

  

}
