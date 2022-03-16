const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('04-backend-hand-of-resources routes', () => {
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
});
