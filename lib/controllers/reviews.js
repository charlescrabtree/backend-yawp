const { Router } = require('express');
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
  });
