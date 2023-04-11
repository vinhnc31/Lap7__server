const middleware = require("../config/middleware");
const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const parser = bodyParser.urlencoded({ extended: true });
router.use(parser);
router.use(cookieParser());

router.get("/", middleware, async function (req, res) {
  let arrBooks = await Book.find().lean();
  arrBooks = arrBooks.map((product, index) => {
    product.index = index + 1;
    return product;
  });
  res.render("book", { title: "Sách", arrBooks });
});

router.post("/", middleware, async function (req, res) {
  console.log(req.body);
  const newBook = new Book({
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
  });
  try {
    await newBook.save();
    res.redirect("/book");
  } catch (err) {
    res.status(500).send("Đã có lỗi xảy ra!");
  }
});

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.redirect("/book");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
