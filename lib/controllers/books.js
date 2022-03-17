const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res) => {
    const book = await Book.insert(req.body);
    res.send(book);
  })

  .get('/', async (req, res) => {
    const books = await Book.findAll();
    res.send(books);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const book = await Book.findById(req.params.id);
      res.send(book);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const book = await Book.updateById(req.params.id, req.body);
      res.send(book);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const book = await Book.deleteById(req.params.id);
      res.send(book);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
