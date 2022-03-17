const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Cat = require('../lib/models/Cat');

describe('04-backend-hand-of-resources cats routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('create a new cat', async () => {
    const expected = {
      name: 'Test Cat',
      age: 1234,
      coat: 'Cat Coat Colors',
    };
    const res = await request(app).post('/api/v1/cats').send(expected);

    expect(res.body).toEqual({
      id: expect.any(Number),
      ...expected,
    });
  });

  test('fetch all cats', async () => {
    const expected = await Cat.findAll();
    const res = await request(app).get('/api/v1/cats');

    expect(res.body).toEqual(expected);
  });

  test('fetch only one (1) cat by id', async () => {
    const expected = await Cat.findById(1);
    const res = await request(app).get(`/api/v1/cats/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  test('return a 404 if try to pass in a counterfeit cat', async () => {
    const res = await request(app).get('/api/v1/cats/counterfeit-cat');

    expect(res.status).toEqual(404);
  });

  test('update a cat by its id', async () => {
    const expected = {
      id: expect.any(Number),
      name: 'Eowyn',
      age: 8,
      coat: 'White/Calico',
    };
    const res = await request(app)
      .patch('/api/v1/cats/1')
      .send({ coat: 'White/Calico' });

    expect(res.body).toEqual(expected);
  });

  test('delete the test cat', async () => {
    const expected = await Cat.findById(1);
    const res = await request(app).delete(`/api/v1/cats/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
