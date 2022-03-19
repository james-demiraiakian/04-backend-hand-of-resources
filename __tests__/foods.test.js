const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Food = require('../lib/models/Food');

describe('04-backend-hand-of0resources foods routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('create a new food', async () => {
    const expected = {
      name: 'Chow Mein',
      country: 'China',
      meal: 'Lunch',
    };
    const res = await request(app).post('/api/v1/foods').send(expected);

    expect(res.body).toEqual({ id: expect.any(Number), ...expected });
  });

  test('fetch all foods', async () => {
    const expected = await Food.findAll();
    const res = await request(app).get('/api/v1/foods');

    expect(res.body).toEqual(expected);
  });

  test('fetch a single food by id', async () => {
    const expected = await Food.findById(1);
    const res = await request(app).get(`/api/v1/foods/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  test('return 404 if try to pass in counterfeit-food', async () => {
    const res = await request(app).get('/api/v1/foods/counterfeit-food');

    expect(res.status).toEqual(404);
  });

  test('is updating a food by id by changing meal from breakfast to lunch', async () => {
    const expected = {
      id: expect.any(Number),
      name: 'Tacos',
      country: 'Mexico',
      meal: 'Lunch',
    };
    const res = await request(app)
      .patch('/api/v1/foods/1')
      .send({ meal: 'Lunch' });

    expect(res.body).toEqual(expected);
  });

  test('delete a food', async () => {
    const expected = await Food.findById(1);
    const res = await request(app).delete(`/api/v1/foods/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
