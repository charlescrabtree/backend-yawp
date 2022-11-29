const { Router } = require('express');
// const authenticate = require.apply('../middleware/authenticate.js');
const Restaurant = require('../models/Restaurant.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getAll();
      res.json(restaurants);
    } catch (e) {
      next(e);
    }
  });
