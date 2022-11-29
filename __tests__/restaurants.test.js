const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('/api/v1/restaurants routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /api/v1/restaurants should return a list of restaurants', async () => {
    const resp = await request(app).get('/api/v1/restaurants');
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toBe(4);
    expect(resp.body).toMatchInlineSnapshot(`
    Array [
      Object {
        "name": "Pip's Original",
        "cuisine": "American",
        "id": "1",
        "cost": "1",
        "image": "https://media-cdn.tripadvisor.com/media/photo-o/05/dd/53/67/an-assortment-of-donuts.jpg",
        "website": "http://www.PipsOriginal.com",
      },
      Object {
        "name": "Mucca Osteria",
        "cuisine": "Italian",
        "id": "2",
        "cost": "3",
        "image": "https://media-cdn.tripadvisor.com/media/photo-m/1280/13/af/df/89/duck.jpg",
        "website": "http://www.muccaosteria.com",
      },
      Object {
        "name": "Mediterranean Exploration Company",
        "cuisine": "Mediterranean",
        "id": "3",
        "cost": "2",
        "image": "https://media-cdn.tripadvisor.com/media/photo-m/1280/1c/f2/e5/0c/dinner.jpg",
        "website": "http://www.mediterraneanexplorationcompany.com/",
      },Object {
        "name": "Salt & Straw",
        "cuisine": "American",
        "id": "4",
        "cost": "2",
        "image": "https://media-cdn.tripadvisor.com/media/photo-o/0d/d6/a1/06/chocolate-gooey-brownie.jpg",
        "website": "https://saltandstraw.com/pages/nw-23",
      }
    ]`);
    
  });
  afterAll(() => {
    pool.end();
  });
});
