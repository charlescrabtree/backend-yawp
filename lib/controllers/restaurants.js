const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
// const authenticate = require.apply('../middleware/authenticate.js');
const Restaurant = require('../models/Restaurant.js');
const { Review } = require('../models/Review.js');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const restaurant = await Restaurant.getById(req.params.id);
      await restaurant.addReviews();
      res.json(restaurant);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getAll();
      res.json(restaurants);
    } catch (e) {
      next(e);
    }
  })
  .post('/:id/reviews', authenticate, async (req, res, next) => {
    try {
      const review = await Review.insert({
        user_id: req.user.id,
        restaurant_id: req.params.id,
        stars: req.body.stars,
        detail: req.body.detail,
        
      });
      res.json(review);
    } catch (e) {
      next(e);
    }
  });
