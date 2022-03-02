"use strict";

const { isValidObjectId }   = require("mongoose");
const { request, response } = require("express");

const Book = require("../models/book");


const getBook = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) throw "no book exists";

    const book = await Book.findById(id);
    
    if (!book) {
      throw "no book exists";
    } else {
      res.json(book);
    }

  } catch (error) {

    return res.json(error);
  }
}

const getBooks = async (req = request, res = response) => {
  try {
    const books = await Book.find({});
    if (!books) throw "no books found";

    return res.json(books);
  } catch (error) {
    return res.json(error);
  }
};

const postNewBook = async (req = request, res = response) => {
  try {
    const { title } = req.body;
    
    if (!title) throw "missing required field title";

    const book = new Book({title});

    await book.save();

    return res.json({ _id: book._id.toString(), title });

  } catch (error) {
    return res.json(error);
  }  
};

const postComment = async (req = request, res = response) => {
  try {
    const { id }      = req.params;
    const { comment } = req.body;

    if (!comment) throw "missing required field comment";
    if (!isValidObjectId(id)) throw "no book exists";

    const book = await Book.findById(id);

    if (!book) {
      throw "no book exists";
    } else {
      book.comments.push(comment);
      book.commentcount = book.comments.length;
      await book.save();

      return res.json(book);
    }

  } catch (error) {
    res.json(error);
  }

};

const deleteBook = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) throw "no book exists";

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      throw "no book exists";
    } else {
      return res.json("delete successful");
    }
    
  } catch (error) {
  
    return res.json(error);
  }

};

const deleteBooks = async (req = request, res = response) => {
  try {
    await Book.deleteMany({});
    return res.json("complete delete successful");
  } catch (error) {
    return res.json(error);
  }
};

module.exports = {
  getBook,
  getBooks,
  postNewBook,
  postComment,
  deleteBook,
  deleteBooks
};