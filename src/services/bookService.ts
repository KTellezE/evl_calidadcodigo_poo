import { Book } from "../models/book";
import pool from "../database/database";


export class BookService {
  async getAllBooks(): Promise<Book[]> {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT * FROM books');
      return res.rows.map(row => new Book(row.id, row.title, row.author, row.year, row.editorial));
    } catch (err) {
      console.error('Error querying the database:', err);
      throw new Error('Failed to retrieve books');
    } finally {
      client.release();
    }
  }

  async getBook(id: Number): Promise<Book>{
    const books = await this.getAllBooks();
    const book = books.find(b => b.id === id);
    if(book){
      return book;
    }else{
      throw new Error();
    }
  }

  async postBook(book: Partial<Book>): Promise<Book> {
    const client = await pool.connect();
    const books = await this.getAllBooks();
    const Id = books[books.length-1].id + 1;
    let newBook = new Book(
      Id,
      book.title,
      book.author,
      book.year,
      book.editorial
    );
    const insertQuery = `
      INSERT INTO books (id, title, author, year, editorial)
      VALUES (${Id}, ${newBook.title}, ${newBook.author}, ${newBook.year}, ${newBook.editorial});`;
    const res = await client.query(insertQuery);
    client.release();
    return newBook;
  }

  async deleteBook(id: Number) {
    const client = await pool.connect();
    try {
      const book = await this.getBook(id);
      const deleteQuery = `DELETE FROM books WHERE id = ${id}`;
      const res = await client.query(deleteQuery);

    } catch (err) {
      throw new Error('Failed to delete the book');
    } finally {
      client.release();
    }
  }

  async updateBook(id: number, book:Partial<Book>): Promise<Book> {
    const client = await pool.connect();
    try {
      const book = await this.getBook(id);
      const updateQuery = `
      UPDATE books
      SET title = ${book.title}, author = ${book.author}, year = ${book.year}, editorial = ${book.editorial}
      WHERE id = ${id};`;
      const updateResult = await client.query(updateQuery);
      return new Book(
        id,
        book.title,
        book.author,
        book.year,
        book.editorial
      );
    } catch (err) {
      throw new Error('Failed to update the book');
    } finally {
      client.release();
    }
  }
  
}
