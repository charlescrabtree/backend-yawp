const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const { Review } = require('../models/Review');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const review = await Review.getById(req.params.id);
      if (!review) next();
      res.json(review);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', authenticate, async (req, res, next) => {
    try {
      const reviews = await Review.delete(req.params.id);
      res.json(reviews);
    } catch (e) {
      next(e);
    }
  });
