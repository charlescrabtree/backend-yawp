const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const totallyRealUser = {
  firstName: 'Lily',
  lastName: 'Dogwalker',
  email: 'aaaa@aaaa.com',
  password: 'hashishi9871',
};

describe('/api/v1/restaurants routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /api/v1/restaurants should return a list of restaurants', async () => {
    const resp = await request(app).get('/api/v1/restaurants');
    expect(resp.status).toEqual(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "cost": 1,
          "cuisine": "American",
          "id": "1",
          "image": "https://media-cdn.tripadvisor.com/media/photo-o/05/dd/53/67/an-assortment-of-donuts.jpg",
          "name": "Pip's Original",
          "website": "http://www.PipsOriginal.com",
        },
        Object {
          "cost": 3,
          "cuisine": "Italian",
          "id": "2",
          "image": "https://media-cdn.tripadvisor.com/media/photo-m/1280/13/af/df/89/duck.jpg",
          "name": "Mucca Osteria",
          "website": "http://www.muccaosteria.com",
        },
        Object {
          "cost": 2,
          "cuisine": "Mediterranean",
          "id": "3",
          "image": "https://media-cdn.tripadvisor.com/media/photo-m/1280/1c/f2/e5/0c/dinner.jpg",
          "name": "Mediterranean Exploration Company",
          "website": "http://www.mediterraneanexplorationcompany.com/",
        },
        Object {
          "cost": 2,
          "cuisine": "American",
          "id": "4",
          "image": "https://media-cdn.tripadvisor.com/media/photo-o/0d/d6/a1/06/chocolate-gooey-brownie.jpg",
          "name": "Salt & Straw",
          "website": "https://saltandstraw.com/pages/nw-23",
        },
      ]
    `);
  });
  it('#GET api/v1/restaurants/:restId should return a restaurant with id and nested reviews', async () => {
    const resp = await request(app).get('/api/v1/restaurants/2');
    // expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "cost": 3,
        "cuisine": "Italian",
        "id": "2",
        "image": "https://media-cdn.tripadvisor.com/media/photo-m/1280/13/af/df/89/duck.jpg",
        "name": "Mucca Osteria",
        "reviews": Array [
          Object {
            "detail": "Il ristorante migliore di Portland!",
            "id": "4",
            "stars": 5,
            "user_id": "1",
          },
          Object {
            "detail": "Not-a bad, could-a used more mushrooms..",
            "id": "5",
            "stars": 4,
            "user_id": "2",
          },
          Object {
            "detail": "Das ist Schiesse",
            "id": "6",
            "stars": 2,
            "user_id": "3",
          },
        ],
        "website": "http://www.muccaosteria.com",
      }
    `);
  });
  
  const registerAndLogin = async (userProps = {}) => {
    const password = userProps.password ?? totallyRealUser.password;
    const agent = request.agent(app);
    const user = await UserService.create({ ...totallyRealUser, ...userProps });

    const { email } = user;
    await (await agent.post('/api/v1/users/sessions')).setEncoding({ email, password });
    return [agent, user];
  };
  afterAll(() => {
    pool.end();
  });
});
