const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Juice = require('../lib/models/Juice');

describe('04-backend-hand-of-resources Juices routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('create a new Juice', async () => {
    const expected = {
      type: 'Grape',
      blend: true,
    };
    const res = await request(app).post('/api/v1/juices').send(expected);

    expect(res.body).toEqual({
      id: expect.any(Number),
      ...expected,
    });
  });

  test('fetch all Juices', async () => {
    const expected = await Juice.findAll();
    const res = await request(app).get('/api/v1/juices');

    expect(res.body).toEqual(expected);
  });

  test('fetch only one (1) Juice by id', async () => {
    const expected = await Juice.findById(1);
    const res = await request(app).get(`/api/v1/juices/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  test('return a 404 if try to pass in a counterfeit juice', async () => {
    const res = await request(app).get('/api/v1/juices/counterfeit-juice');

    expect(res.status).toEqual(404);
  });

  test('update a juice by its id', async () => {
    const expected = {
      id: expect.any(Number),
      type: 'Cranberry',
      blend: false,
    };
    const res = await request(app)
      .patch('/api/v1/juices/2')
      .send({ blend: false });

    expect(res.body).toEqual(expected);
  });

  test('delete the test juice', async () => {
    const expected = await Juice.findById(1);
    const res = await request(app).delete(`/api/v1/juices/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
