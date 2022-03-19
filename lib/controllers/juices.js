const { Router } = require('express');
const Juice = require('../models/Juice');

module.exports = Router()
  .post('/', async (req, res) => {
    const juice = await Juice.insert(req.body);
    res.send(juice);
  })

  .get('/', async (req, res) => {
    const juices = await Juice.findAll();
    res.send(juices);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const juice = await Juice.findById(req.params.id);
      res.send(juice);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const juice = await Juice.updateById(req.params.id, req.body);
      res.send(juice);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const juice = await Juice.deleteById(req.params.id);
      res.send(juice);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
