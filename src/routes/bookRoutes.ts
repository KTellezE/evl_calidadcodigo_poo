import { Router } from "express";
import { BookController } from "../controllers/bookController";

const router = Router();
const bookController = new BookController();

router.get("/books", bookController.getAll);
router.post('/books', bookController.addBook);
router.get('/books/:id', bookController.getById);
router.delete('/books/:id', bookController.deleteBook);
// router.put('/books/:id', bookController.update);
export default router;
