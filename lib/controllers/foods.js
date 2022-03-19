const { Router } = require('express');
const Food = require('../models/Food');

module.exports = Router()
  .post('/', async (req, res) => {
    const food = await Food.insert(req.body);
    res.send(food);
  })

  .get('/', async (req, res) => {
    const foods = await Food.findAll();
    res.send(foods);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const food = await Food.findById(req.params.id);
      res.send(food);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const food = await Food.updateById(req.params.id, req.body);
      res.send(food);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const food = await Food.deleteById(req.params.id);
      res.send(food);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
