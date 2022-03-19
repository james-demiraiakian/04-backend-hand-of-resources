const { Router } = require('express');
const School = require('../models/School');

module.exports = Router()
  .post('/', async (req, res) => {
    const school = await School.insert(req.body);
    res.send(school);
  })

  .get('/', async (req, res) => {
    const schools = await School.findAll();
    res.send(schools);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const school = await School.findById(req.params.id);
      res.send(school);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const school = await School.updateById(req.params.id, req.body);
      res.send(school);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const school = await School.deleteById(req.params.id);
      res.send(school);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
