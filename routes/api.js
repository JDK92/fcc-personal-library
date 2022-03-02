/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const { postNewBook, getBooks, getBook, postComment, deleteBook, deleteBooks } = require("../controllers/controllers");

module.exports = function (app) {

  app.route('/api/books')
    //response will be array of book objects
    //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    .get(getBooks)
    
    .post(postNewBook)
    
    //if successful response will be 'complete delete successful'
    .delete(deleteBooks);



  app.route('/api/books/:id')
    //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    .get(getBook)
    
    //json res format same as .get
    .post(postComment)
    
    //if successful response will be 'delete successful'
    .delete(deleteBook);
  
};
