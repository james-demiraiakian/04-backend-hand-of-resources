const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const School = require('../lib/models/School');

describe('04-backend-hand-of-resources schools routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('create a new school entry', async () => {
    const expected = {
      name: 'College of the Desert',
      city: 'Palm Desert',
      level: 'Community College',
    };

    const res = await (
      await request(app).post('/api/v1/schools')
    ).send(expected);

    expect(res.body).toEqual({ id: expect.any(Number), ...expected });
  });

  test('Fetch all Schools', async () => {
    const expected = await School.findAll();
    const res = await request(app).get('/api/v1/schools');

    expect(res.body).toEqual(expected);
  });

  test('Fetch a school by id', async () => {
    const expected = await School.findById(1);
    const res = await request(app).get(`/api/v1/schools/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  test('Catch a scam school', async () => {
    const res = await request(app).get('/api/v1/schools/scam-school');

    expect(res.status).toEqual(404);
  });

  test('update a school by its id', async () => {
    const expected = {
      id: expect.any(Number),
      name: 'Palm Springs High School',
      city: 'Palm Springs',
      level: 'High School',
    };
    const res = await await request(app)
      .patch('/api/v1/schools/1')
      .send({ name: 'Palm Springs High School' });

    expect(res.body).toEqual(expected);
  });

  test('delete a school', async () => {
    const expected = await School.findById(1);
    const res = await request(app).delete(`/api/v1/schools/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
